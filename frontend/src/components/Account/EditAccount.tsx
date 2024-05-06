import {Input, Button} from '@nextui-org/react'
import {AtIcon, LockIcon, PencilIcon, UserIcon} from '../../assets/icons'
import React, {  useState } from 'react'

export default function EditAccount(){
    //@ts-ignore
    const email: any = atob(localStorage.getItem('token')).split(':')[0];
    const userId = localStorage.getItem('userId');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({'id': userId, 'name': '', email, 'password': ''})
    const [isUpdated, setIsUpdated] = useState(false);

    const handleSubmission = () =>{
        setIsLoading(true);
        setIsUpdated(false);
        fetch('http://localhost:8080/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response =>{
            if (response.ok){
                setIsUpdated(true);
                setIsLoading(false);
            }
        })

    }
 
    return (
        <section className='w-full h-full flex items-center justify-center flex-col bg-gradient-to-r from-sky-300 via-blue-600 to-purple-500 p-1 rounded-md'>
            <h1 className='text-white font-sans font-bold text-4xl text-start'>Editar Perfil</h1>

            <form className='w-1/2 h-2/4 flex flex-col items-center justify-center gap-4  p-5 backdrop-blur-3xl bg-white/5 rounded-xl border-white/5'>
                
                <Input label="Nombre" startContent={<UserIcon/>} placeholder='Nombre' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, name: event.target.value})} defaultValue="Jorge"/>
                <Input label="Email" startContent={<AtIcon/>} placeholder='Correo Electrónico' value={email} type='email'  isReadOnly/>
                <Input label="Contraseña" startContent={<LockIcon/>} placeholder='Contraseña' type='password'  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, password: event.target.value})}/>
                <div className='w-full flex items-end justify-end'>
                    <Button startContent={<PencilIcon/>} color='secondary' className='text-lg font-bold' onPress={handleSubmission} isLoading={isLoading}>Guardar</Button>
                </div>
            </form>
            {isUpdated && <p className='font-sans font-extrabold text-white text-xl'>Se actualizaron correctamente los valores</p>}
        </section>
    )
}