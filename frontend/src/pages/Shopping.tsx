import GameShoppingCart from "../components/ShoppingCart/Game";
import ItemSummary from "../components/ShoppingCart/ItemSummary";
import {Card, CardHeader, CardBody, CardFooter, Divider, Button, Spinner, Skeleton} from '@nextui-org/react'
import { ShoppingCart, LockIcon, PaypalIcon, MasterCardIcon, VisaIcon, HomeIcon } from "../assets/icons";
import { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { useNavigate } from "react-router-dom";


export default function Shopping(){
    const [data, setData] = useState<any>([]);
    const [shoppingItems, setShoppingItems] = useState<{cartId: number, gameId: number, userId: number, quantity: number}[]>([]);
    const [productInformation, setProductInformation] = useState<any>([]);
    //@ts-ignore
    const [title, setTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate();

    const buy = () =>{
        localStorage.setItem('total', total.toString());
        navigate('/buy');
    }

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/shopping-cart/products/' + localStorage.getItem('userId'))
        .then(response => response.json())
        .then(data => {
            setShoppingItems(data);
            setProductInformation(data);
        })
    }, [])

    useEffect(() => {
        // Reset data at the beginning of the effect to avoid mixing data from different sets of shoppingItems

            setData([]);
            setIsLoading(true);
            // Use Promise.all to fetch all game details concurrently and wait for all to complete
            Promise.all(shoppingItems.map((item: any) => 
                fetch('http://localhost:8080/games/find/' + item.gameId)
                .then(response => response.json())
            )).then((gamesDetails) => {
                setData(gamesDetails);
                setIsLoading(false);
                
            });
        
    }, [shoppingItems]);

    useEffect(() => {
        getTotal();
    }, [productInformation, data])


    const deleteItem = (index: number) =>{
        //@ts-ignore
        const newItems = data.filter((item: any, i: number) => i !== index);
        setData([...newItems]);
        fetch('http://localhost:8080/shopping-cart/delete/' + shoppingItems[index].cartId, {
            method: 'DELETE'
        })
    }

    const increaseQuantity = (index: number) => {
        const newItems = productInformation.map((product: {id: number, gameId: number, userId: number, quantity: number}, i: number) => {
            if(index === i){
                return {...product, quantity: product.quantity + 1}
            } else {
                return product;
            }
        })
        setProductInformation([...newItems]);
        updateQuantity(newItems[index]);
    }

    const decreaseQuantity = (index: number) =>{
        const newItems = productInformation.map((product: {id: number, gameId: number, userId: number, quantity: number}, i: number) => {
            if (index === i){
                return {...product, quantity: product.quantity - 1}
            } else {
                return product;
            }
        })

        setProductInformation([...newItems]);
        updateQuantity(newItems[index]);
    }

    const updateQuantity = (item: {cartId: number, gameId: number, userId: number, quantity: number}) => {
            fetch('http://localhost:8080/shopping-cart/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
        
    }
    const getTotal = () =>{
        let total = 0;
        data.forEach((game: any, index: number) => {
            total += game.price * productInformation[index].quantity;
        })
        setTotal(Math.round(total * 100) / 100);
    }
    return (
        <>
        <NavbarComponent setTitle={setTitle} showInput={false}/>
        <section className='flex items-center justify-center w-full h-full '>
            <section className='w-full xl:w-2/3 h-full p-5 flex flex-row flex-wrap'>
                <div className='w-full xl:w-2/3 flex flex-col'>
                <h1 className='font-sans text-white text-[3em] font-bold'>Tu carrito</h1>
                <Card className='w-full h-auto'>
                    <CardBody className='gap-2'>
                    {isLoading ? ( 
                        <div className='w-full h- flex-col flex items-center justify-center'>
                        <Spinner color='primary'/>
                        <p className="font-sans font-semibold text-white">Cargando...</p>
                    </div>
                    ) : 
                    data.length === 0 ? (
                        <div className='w-full h- flex-col flex items-center justify-center'>
                            <p className="font-sans font-semibold text-white">No hay productos en tu carrito</p>
                        </div>
                    ) : (
                        data.map((game: any, index: number) => (
                            <>
                            <GameShoppingCart key={index} name={game.name} price={game.price} imageUrl={game.imageUrl} quantity={productInformation[index].quantity} onDelete={deleteItem} index={index} onDecreaseQuantity={decreaseQuantity} onIncreaseQuantity={increaseQuantity}/>
                            <Divider/>
                            </>
                        ))
                    )
                    }

                    </CardBody>
                </Card>
                </div>
                <div className='w-full xl:w-1/3 flex flex-col py-3 sm:p-5'>
                    <Skeleton isLoaded={!isLoading} className='rounded-lg'>
                    <Card className='w-full md:h-auto'>
                        <CardHeader className='flex gap-3 flex-col'>
                            <div className='flex flex-start'>
                                <h1 className='text-white font-sans text-2xl font-bold text-start'>Resumen</h1>
                            </div>
                            <Divider/>
                        </CardHeader>
                        <CardBody className='gap-2'>
                            { data.length === 0 ?
                                (
                                    <div className='gap-3 flex flex-col items-center align-items'>
                                        <p className="text-white font-sans text-lg">No hay productos, regresa al inicio y agreaga algunos</p>
                                        <Button className='font-semibold text-md' color='primary' startContent={<HomeIcon/>} onPress={() => navigate('/')}>Inicio</Button>
                                    </div>
                                ) : (
                                    data.map((game: any, index: number) => (
                                        <ItemSummary key={index} item={game.name + " • " + productInformation[index].quantity} price={game.price * productInformation[index].quantity}/>
                                    ))
                                )
                            }
                            <Divider/>
                        </CardBody>
                        <CardFooter className='flex flex-col gap-5'>
                            <ItemSummary item="Total:" price={total}/>
                            <Button className='w-full font-semibold text-md' color='secondary' startContent={<ShoppingCart/>} onPress={buy} isDisabled={total === 0}>Comprar</Button>
                        </CardFooter>
                    </Card>
                    </Skeleton>
                    <Card className='mt-2'>
                        <CardBody>
                            <section className='flex flex-col'>
                                <div className="flex flex-row w-full justify-around">
                                    <PaypalIcon width="50px" height="50px"/>
                                    <MasterCardIcon width="50px" height="50px"/>
                                    <VisaIcon width="50px" height="50px"/>
                                </div>
                                <div className='flex flex-row items-center w-full justify-center gap-1'>
                                    <LockIcon/>
                                    <p className='text-gray-400 text-lg'>Tus datos estan protegidos</p>
                                </div>
                            </section>
                        </CardBody>
                    </Card>
                    
                </div>
            </section>
        </section>
        </>
    )
}