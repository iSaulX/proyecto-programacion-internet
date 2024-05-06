import { Navbar, NavbarItem, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Avatar, NavbarBrand, Tooltip, NavbarContent, Input, useDisclosure, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Checkbox } from "@nextui-org/react";
import { Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect} from "react";
import { UserIcon, GameIcon, ShoppingCart, SearchIcon, AtIcon, LogOutIcon, LockIcon, HomeIcon} from "../assets/icons";

export default function NavbarComponent({setTitle, showInput}: {setTitle: any, showInput: boolean}){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isRegistering, setIsRegistering] = useState(false);
    const [dataLogin, setDataLogin] = useState({'email': '', 'password': ''});
    const [dataRegister, setDataRegister] = useState({'name': '', 'email': '', 'password': ''});
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')){
            setIsLoggedIn(true)
        } 
    }, [])


    const cleanUpErrors = () => {
        setErrorEmail(false);
        setErrorPassword(false);
    }
    

    const register = () =>{
        cleanUpErrors();
        setIsRegistering(true);
        onOpen();
    }

    const saveUserId = () => {
        fetch('http://localhost:8080/user/id/' + decodeToken())
        .then(response => response.json())
        .then(data =>  {
            localStorage.setItem('userId', data.message)
        })
    }

    const decodeToken: any = () =>{ // @ts-ignore
        if (localStorage.getItem('token')){
            const token: any = localStorage.getItem('token'); //@ts-ignore
            const email = atob(token).split(':')[0];
            return email;
        } else {
            return null;
        }
    }

    const handleRegister = (onClose: any) => {
        cleanUpErrors();
        setIsLoading(true);
        fetch('http://localhost:8080/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataRegister)
        }).then(response => response.json())
        .then((data: {ok: boolean, message: string}) => {
            if (data.ok){
                setIsLoading(false);
                setIsRegistering(false);
                localStorage.setItem('token', data.message);
                saveUserId();
                setIsLoggedIn(true);
                onClose();
            } else if (data.message === "Email already exists"){
                setIsLoading(false);
                setErrorEmail(true);
            } else {
                throw new Error(data.message);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    
    const handleLogin = (onClose:  any) => {
        cleanUpErrors();
        setIsLoading(true);
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataLogin)
        }).then(response => response.json())
        .then((data: {ok: boolean, message: string}) => {
            if (data.ok){
                localStorage.setItem('token', data.message)
                saveUserId();
                setIsLoading(false);
                setIsRegistering(false);
                setIsLoggedIn(true);
                onClose();
            } else {
                if (data.message === "Incorrect password"){
                    setIsLoading(false);
                    setErrorPassword(true);
                } else if (data.message === "User not found"){
                    setIsLoading(false);
                    setErrorEmail(true);
                } else {
                    throw new Error(data.message);
                }
            }
        }).catch((error) => {
            console.log(error);
        });
        
    }

    const handleLogOut = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
    }

    const login = () =>{
        cleanUpErrors();
        setIsRegistering(false);
        onOpen();
    }
    const DropDownMenu = () => {
        if (isLoggedIn){
            return (
                <DropdownMenu>
                    <DropdownItem startContent={<AtIcon/>} isReadOnly>{'Sesion inicada con ' + decodeToken()}</DropdownItem>
                    <DropdownItem startContent={<ShoppingCart/>} onPress={() => navigate('/admin')}>Adminsitracion</DropdownItem>
                    <DropdownItem startContent={<UserIcon/>} onPress={() => navigate('/account')}>Perfil</DropdownItem>
                    <DropdownItem startContent={<LogOutIcon/>} color='danger' onPress={handleLogOut}>Cerrar sesion</DropdownItem>
                </DropdownMenu>
            )
        } else {
            return (
                <DropdownMenu>
                    <DropdownItem startContent={<UserIcon/>} onPress={login} > Iniciar sesión</DropdownItem>
                    <DropdownItem startContent={<GameIcon/>} onPress={register}>Registrarse</DropdownItem>
                </DropdownMenu>
            )
        }
    }


    return (
        <>
        <Navbar className='dark' position="static">
            <NavbarContent className='hidden sm:flex'>
                    <NavbarBrand>
                        <GameIcon/>
                        <p className='font-sans text-white font-bold'>ZAFIRO</p>
                    </NavbarBrand>
            </NavbarContent>
            <NavbarContent  justify="center">
                <NavbarItem>
                    {showInput && <Input variant="bordered" placeholder="Search for games" endContent={<SearchIcon/>} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)} />}
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <NavbarItem >
                    <Tooltip content="Favoritos" className='dark text-white'>
                        <Button isIconOnly className='flex sm:hidden' onPress={() => navigate("/")}>
                            <HomeIcon/>
                        </Button>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Tooltip content={isLoggedIn ? "Carrito" : "Iniciar sesion primero"}  className='dark text-white'>
                            <Button isIconOnly aria-label="Carrito de comrpras" onPress={() => isLoggedIn ? navigate('/cart') : 0} >
                                <ShoppingCart/>
                            </Button>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Dropdown className='dark text-white' placement="bottom-end" >
                        <DropdownTrigger>
                            <Avatar showFallback isBordered color="secondary" aria-label="Avatar menu dropdown"/>
                        </DropdownTrigger>
                        <DropDownMenu/>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} className="dark text-white">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='text-2xl'>{isRegistering ? "Registrate" : "Iniciar sesión"}</ModalHeader>
                        <ModalBody>
                            {isRegistering && <Input autoFocus label="Nombre" variant="bordered" placeholder="Ingresa tu nombre" endContent={<UserIcon/>} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDataRegister({...dataRegister, name: event.target.value})} />}
                            <Input autoFocus label="Email" variant="bordered" placeholder="Ingresa tu correo electronico" endContent={<AtIcon/>} type="email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => isRegistering ? setDataRegister({...dataRegister, email: event.target.value}) : setDataLogin({...dataLogin, email: event.target.value})} errorMessage={isRegistering ? "Correo en uso": errorEmail && "Correo no encontrado"} isInvalid={errorEmail}/>
                            <Input label="Contraseña" variant="bordered" placeholder="Ingresa tu contraseña" endContent={<LockIcon/>} type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => isRegistering ? setDataRegister({...dataRegister, password: event.target.value}) : setDataLogin({...dataLogin, password: event.target.value})} errorMessage={"Contraseña incorrecta"} isInvalid={errorPassword}/>
                            <div className="flex justify-between">
                                <Checkbox>Recuerdáme</Checkbox>
                                {!isRegistering && <Link to="/">
                                    ¿Olvidaste tu contraseña?
                                </Link>}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>Cancelar</Button>
                            <Button onPress={() => isRegistering ? handleRegister(onClose) : handleLogin(onClose)}  isLoading={isLoading} color="primary">{isRegistering ? "Registrate" : "Inciar sesión"}</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}