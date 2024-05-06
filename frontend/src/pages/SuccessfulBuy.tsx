import {Card,CardBody, Button} from '@nextui-org/react'
import { OkIcon, HomeIcon } from '../assets/icons'
import {useNavigate} from 'react-router-dom'

export default function SuccessfulBuy(){
    const generateRandomGUID = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    const navigate = useNavigate();
    return (
        <section className='w-full h-full flex items-center justify-center'>
            <section className='flex flex-row justify-center items-center w-full sm:w-1/2 h-1/2'>
                <div className='bg-gradient-to-br from-sky-500 via-green-400 to-purple-600 p-0.5 rounded-xl'>
                    <Card>
                        <CardBody className='p-5 flex flex-col justify-center items-center gap-5'>
                            <OkIcon width='300px' height='300px'/>
                            <h1 className='text-white font-sans font-bold text-3xl'>Compra exitosa</h1>
                            <p>Gracias por tu compra, hemos enviado el siguiente boucher a tu correo</p>
                            <div className='w-full bg-gradient-to-tr from-red-600 via-blue-900 to-purple-800 p-0.5 rounded-md'>
                                <h1 className='bg-black text-white font-sans font-bold text-[2em] rounded-md text-center'>{generateRandomGUID()}</h1>
                            </div>
                            <Button color="primary" className='ml-auto' onPress={() => navigate('/')}>
                                <HomeIcon/>
                                <p>Regresar al inicio</p>
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </section>
        </section>
    )
}