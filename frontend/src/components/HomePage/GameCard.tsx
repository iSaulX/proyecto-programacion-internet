import {Image, Card, Button, CardFooter, Chip, Popover, PopoverContent, PopoverTrigger} from '@nextui-org/react'
import {useEffect, useState} from 'react';
import { ShoppingCart, OkIcon, BadIcon } from '../../assets/icons';

type GameCardProps = {
    title: string; 
    price: number;
    image: string;
    gameId: number;
}

export default function GameCard({title, price, image, gameId}: GameCardProps){
    const [isFavorite, setIsFavorite] = useState(false);
    const [data, setData] = useState({})
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() =>{
        if (localStorage.getItem('token')){
            const user: any = localStorage.getItem('userId');
            const userId = parseInt(user);
            setData({gameId, userId, price, quantity: 1 })
        }
    },[])

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(false);
        }, 1000)
    }, [isOpen])
     
    const checkLogin = () =>{
        if (localStorage.getItem('token')){
            return true;
        } else {
            return false;
        }

    }
    

    const handleAddToShoppingCart = (open: any) => {
        setIsOpen(open);
        if (checkLogin()){
        fetch('http://localhost:8080/shopping-cart/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data)
        })
    } 
    }
    return (
        <Card className='max-w-[190px] h-auto' isFooterBlurred onPress={() => setIsFavorite(!isFavorite)}>
            <Image src={image} alt={title + ' image'} width={190} height={290}/>
            <CardFooter className='absolute flex flex-col bg-black/40 bottom-0 z-10  '>
                <section className='flex flex-row gap-1 justify-between w-full'>
                    <h1 className='text-white font-sans font-semibold text-ellipsis text-nowrap overflow-hidden'>{title}</h1>
                    <Chip>${price}</Chip>
                </section>
                <section className='flex flex-row gap-2'>
                    <Popover isOpen={isOpen} onOpenChange={(open) => handleAddToShoppingCart(open)} placement='bottom'>
                        <PopoverTrigger>
                            <Button className='bg-transparent' startContent={<ShoppingCart/>}>Agregar al carrito</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='flex flex-row justify-center items-center gap-2 p-1'>
                                {checkLogin() ? 
                                <>
                                    <OkIcon height='20px' width='20px'/>
                                    <p className='text-white font-sans font-semibold'>Agregado al carrito</p>
                                </> : 
                                <>
                                    <BadIcon/>
                                    <p className='tex-white font-sans font-semibold'>Inicia sesion/regitrate primero</p>
                                </>
                                }
                            </div>
                        </PopoverContent>
                    </Popover>
                </section>
            </CardFooter>
        </Card>
    )
}