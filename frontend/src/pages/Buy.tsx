import {Input, Checkbox, Button, Card, CardBody, CardHeader, CardFooter, Tabs, Tab, Skeleton} from '@nextui-org/react'
import { CardIcon, PaypalIcon, LockIcon, BackIcon, ShoppingCart, UserIcon, MonthIcon } from '../assets/icons';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState} from 'react';


export default function Buy(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }, [])

    const makeNewPurchase = () => {
        const date: Date = new Date();
        const formatedDate: string = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const userId = localStorage.getItem('userId');
        const total = localStorage.getItem('total');
        fetch('http://localhost:8080/sales/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // @ts-ignore
            body: JSON.stringify({'userId': parseInt(userId), 'total': parseFloat(total), date: formatedDate})
        }).then(response => response.json())
    }

    const deleteAllElementsCart = () => {
        fetch('http://localhost:8080/shopping-cart/products/' + localStorage.getItem('userId'))
            .then(response => response.json())
            .then(data => {
                const deletePromises = data.map((element: any) => {
                    return fetch('http://localhost:8080/shopping-cart/delete/' + element.cartId, {
                        method: 'DELETE'
                    });
                });
                return Promise.all(deletePromises);
            });
    };
    

    const handleBuy = () => {
        setIsButtonLoading(true);
        setTimeout(() => {
            makeNewPurchase();
            deleteAllElementsCart();
            setIsButtonLoading(false);
            navigate('/success');
        }, 3000)
    }

    const total: string | null = localStorage.getItem('total');

    return (
        <section className='flex justify-center items-center w-full h-full p-2'>
            <div className='bg-gradient-to-tr from-sky-400 via-blue-700 to-purple-700 p-0.5 rounded-2xl w-full lg:w-1/3 h-full lg:h-[95%]'>
                <Card className='w-full h-full'>
                    <CardHeader className='flex justify-center items-center'>
                        <Button className='hover:bg-blue-400 bg-transparent absolute top-6 left-2 sm:top-8 sm:left-8' onPress={() => navigate('/cart')}>
                            <BackIcon/>
                            <p className='text-white'>Regresar</p>
                        </Button>
                        <h1 className='text-[2.5em] sm:text-[3em] font-sans font-extrabold text-white '>Compra</h1>
                    </CardHeader>
                    <CardBody className="h-full w-full items-center justify-start">
                        <Tabs >
                            <Tab key="Card" title={
                                <div className='flex justify-center space-x-2'>
                                    <CardIcon/>
                                    <p className='font-sans text-white'>Tarjeta de credito</p>
                                </div>
                            }>
                                <section className="flex flex-col items-center justify-center gap-5 mt-32">
                                    <h1 className='font-sans text-white text-2xl font-bold'>Pago con tarjeta</h1>
                                    <Skeleton isLoaded={!isLoading} className='rounded-xl w-full'>
                                    <Input label='Nombre del titular' startContent={<UserIcon/>} placeholder='Nombre completo' type='text' isRequired />
                                    </Skeleton>
                                    <Skeleton isLoaded={!isLoading} className='rounded-xl w-full'>
                                    <Input startContent={<CardIcon/>} label='Numero de tarjeta' placeholder='4567 8901 2345 6789' type='text' isRequired maxLength={16}/>
                                    </Skeleton>
                                    <div className='flex flex-row gap-2 w-full'>
                                        <Skeleton isLoaded={!isLoading} className='rounded-xl w-full'>
                                        <Input label='Fecha de expiracion' startContent={<MonthIcon/>} placeholder='MM/AA' type='text' isRequired maxLength={5}/>
                                        </Skeleton>
                                        <Skeleton isLoaded={!isLoading} className='rounded-xl w-full'>
                                        <Input label='CVV' startContent={<LockIcon/>} placeholder='XXX' type='text' isRequired maxLength={3}/>
                                        </Skeleton>

                                    </div>
                                    <Skeleton isLoaded={!isLoading} className='rounded-xl w-full'>
                                    <Checkbox className='text-white mb-2' color='success'>Guardar informacion de pago</Checkbox>
                                    <Button color="primary" className='w-full' isLoading={isButtonLoading} onPress={handleBuy}>
                                        <ShoppingCart/>
                                        <p className='text-white font-bold'>Pagar ${total}</p>
                                    </Button>
                                    </Skeleton>
                                </section>
                            </Tab>
                            <Tab key="Paypal" title={
                                <div className='flex justify-center space-x-2'>
                                    <PaypalIcon width='20px' height='20px'/>
                                    <p className='font-sans text-white'>Paypal</p>
                                </div>
                            }>
                                <section className="flex flex-col items-start justify-start gap-8">
                                        <h1 className='font-sans font-bold text-2xl'>Pago con <span className='text-sky-400'>PayPal</span></h1>
                                    <div className='mt-40 flex flex-col gap-5'>
                                        <Button className='bg-gradient-to-r via-blue-400 from-blue-600 to-yellow-400 w-full' onPress={handleBuy} isLoading={isButtonLoading}>
                                            <PaypalIcon width='30px' height='30px'/>
                                            <p className='text-white font-bold'>Pagar ${localStorage.getItem('total')}</p>
                                        </Button>
                                        <Checkbox aria-label='Guardar informacion de pago' className='text-white' color='primary'>Guardar informacion de pago</Checkbox>
                                    </div>
                                </section>
                            </Tab>
                        </Tabs>
                    </CardBody>
                    <CardFooter className='flex items-center justify-center '>
                        <div className='flex flex-row justify-center gap-2 items-center'>
                            <LockIcon/>
                            <p className='text-gray-400'>Todos tus pagos estan seguros y protegidos.</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}