import {Button} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { BackIcon, UserIcon} from '../assets/icons';
import EditAccount from '../components/Account/EditAccount';

export default function Account(){

    const navigate = useNavigate();

    return(
        <section className='w-full h-[95%] flex flex-items-center justify-center'>
            <section className=' w-4/5 h-full flex flex-col'>
                <h1 className='text-[3em] font-extrabold font-sasns'>Cuenta</h1>
                <section className="w-full h-full flex flex-row">
                    <section className=' bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 w-1/4 h-full flex flex-col items-stretch rounded-2xl'>
                        <div className='h-1/6 w-full flex items-center justify-center'>
                            <Button startContent={<BackIcon/>} onClick={() => navigate('/')}>Volver</Button>
                        </div>
                        <div className="flex-col flex h-1/2 w-full items-center justify-center gap-2">
                            <div className="flex items-center justify-center w-full flex-row gap-3 ">
                                <Button className="text-lg text-white w-full bg-transparent text-bold" startContent={<UserIcon/>} >Perfil</Button>
                            </div>
                        </div>
                    </section>
                    <section className="backdrop-blur-xl w-full rounded-lg">
                        <EditAccount/>
                    </section>
                </section>
            </section>
        </section>
    )
}