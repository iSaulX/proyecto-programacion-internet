import {Button, Modal, ModalHeader, ModalBody, ModalContent, Image, Input,useDisclosure, Select, SelectItem, ModalFooter, Selection} from '@nextui-org/react';
import React, {useState, useEffect} from 'react';
import { WorldIcon, ScaryIcon, ShotsIcon, ActionIcon, StarsIcon, OthersIcon } from '../../assets/icons';



export default function ModalEdit(){
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [data, setData] = useState({'id': 0,'name': '', price: 0, imageUrl: '', plataforms: '', category: ''});
    const [previewImage, setPreviewImage] = useState<boolean>(true);
    const categories: string[] = ['Mundo abierto', 'Terror', 'Disparos', 'Accion', 'Aventura', 'Otros']
    const plataforms: string[] = ['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X', 'Nintendo Switch']
    const [selectedCategory, setSelectedCategory] = useState<Selection>(new Set([]));
    const [selectedPlataform, setSelectedPlataform] = useState<Selection>(new Set([]));
    const [errorName, setErrorName] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleShowIcon = (category: string) => {
        switch (category) {
            case 'Mundo abierto':
                return <WorldIcon/>
            case 'Terror':
                return <ScaryIcon/>
            case 'Disparos':
                return <ShotsIcon/>
            case 'Accion':
                return <ActionIcon/>
            case 'Aventura':
                return <StarsIcon/>
            case 'Otros':
                return <OthersIcon/>
            default:
                return <WorldIcon/>
        }
    }
    
    const editGame = (onClose: any) =>{
        setIsLoading(true);
        let id: number | null;
        fetch(`http://localhost:8080/games/find/name/${data.name}/id`)
        .then(response =>  response.json())
        .then(response => {
            if (response.ok){
                id = parseInt(response.message);
                fetch('http://localhost:8080/games/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...data, id})
                }).then(response => response.json())
                .then(response => {
                    if (response.ok){
                        setIsLoading(false);
                        onClose();
                    } else {
                        setIsLoading(false);
                        setErrorName(true);
                    }
                })
            } else {
                setIsLoading(false);
                setErrorName(true);
            }
        }) 
    }

    useEffect(() =>{
        setData({...data, plataforms: Array.from(selectedPlataform).join(',')})
    }, [selectedPlataform])

    useEffect(() =>{
        //@ts-ignore
        setData({...data, category: Array.from(selectedCategory)[0]})
    }, [selectedCategory])
    const openModal = () =>{
        setData({...data, imageUrl: ''})
        onOpen();
        setPreviewImage(true);
    }
    return (
        <>
            <Button onPress={openModal} color='secondary'>Editar</Button>
            <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} className='dark' size='xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Editar videojuego</ModalHeader>
                            <ModalBody>
                                <Input label='Nombre' errorMessage="No hemos encontrado este juego para editar"  isRequired isInvalid={errorName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, name: e.target.value})}/>
                                <Input label='Precio'  isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, price: parseFloat(e.target.value)})}/>
                                <Input label='Imagen' isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, imageUrl: e.target.value})}/>
                                {previewImage && 
                                <div className='flex w-full justify-start aling-center flex-row gap-3' ><Image src={data.imageUrl} alt='preview' width={100} height={100}/>
                                <div className='h-full flex flex-col items-center justify-center'>
                                <p>Vista previa</p>
                                <Button onPress={() => setPreviewImage(false)} color='primary'>Ocultar</Button>
                                </div>
                                </div>}
                                <Select label="Plataforms" selectionMode='multiple' isRequired selectedKeys={selectedPlataform} onSelectionChange={setSelectedPlataform}>
                                    {plataforms.map((plataform, index) => (
                                        <SelectItem key={index} value={plataform}>{plataform}</SelectItem>
                                    ))}
                                </Select>
                                <Select label="Categoria" isRequired selectedKeys={selectedCategory} onSelectionChange={setSelectedCategory}>
                                    {categories.map((category, index) => (
                                        <SelectItem key={index} value={category} startContent={handleShowIcon(category)}>{category}</SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>Cancelar</Button>
                                <Button onPress={() => editGame(onClose)} isLoading={isLoading}>Guardar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}