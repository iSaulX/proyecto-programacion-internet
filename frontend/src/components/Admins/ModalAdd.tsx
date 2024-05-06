import {Modal, ModalFooter, ModalHeader, ModalBody, ModalContent, Image, Input, useDisclosure, Select, SelectItem, Button, Selection} from '@nextui-org/react';
import {useState, useEffect} from 'react';
import {WorldIcon, ScaryIcon, ShotsIcon, ActionIcon, StarsIcon, OthersIcon} from '../../assets/icons';

export default function ModalAdd(){
    const {isOpen, onOpen, onClose} = useDisclosure();
    const categories: string[] = ['Mundo abierto', 'Terror', 'Disparos', 'Accion', 'Aventura', 'Otros']
    const plataforms: string[] = ['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X', 'Nintendo Switch']
    const [selectedCategory, setSelectedCategory] = useState<Selection>(new Set([]));
    const [selectedPlataform, setSelectedPlataform] = useState<Selection>(new Set([]));
    const [showPreview, setShowPreview] = useState<boolean>(true);
    const [errorName, setErrorName] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [data, setData] = useState({'name': '', price: 0, imageUrl: '', plataforms: '', category: ''});    
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

    const handleAdd = (onClose: any) => {
        setErrorName(false);
        setIsLoading(true);
        fetch('http://localhost:8080/games/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(response => {
            if(response.ok){
                setIsLoading(false);
                onClose();
            } else {
                setIsLoading(false);
                setErrorName(true);
            }
        })
        .catch(error => {
            setIsLoading(false);
            console.error('Error:', error);
        });
    }
    useEffect(() => {
        //@ts-ignore
        setData({...data, category: categories[parseInt(Array.from(selectedCategory)[0])]});
    }, [selectedCategory])

    useEffect(() => {
        //@ts-ignore
        setData({...data, plataforms: Array.from(selectedPlataform).map(item => plataforms[parseInt(item)]).join(', ')});
    }, [selectedPlataform])
    const handleOpen = () =>{
        setData({...data, imageUrl: ''});
        onOpen();
        setShowPreview(true);
    }
    return (
        <>
            <Button color='primary' onPress={handleOpen}>Agregar</Button>
            <Modal backdrop='blur' size='xl' isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Agregar juego</ModalHeader>
                            <ModalBody>
                                <Input label='Nombre' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} isInvalid={errorName} errorMessage="Este juego ya existe"/>
                                <Input label='Precio' onChange={(e) => setData({...data, price: parseInt(e.target.value)})}/>
                                <Input label='Imagen' value={data.imageUrl} onChange={(e) => setData({...data, imageUrl: e.target.value})}/>
                                {showPreview && <div className='w-full flex flex-row items-center justify-start'>
                                    <Image src={data.imageUrl} alt='preview' width={100} height={100}/>
                                    <div className='w-full flex-col'>
                                        <Button color='secondary'>Ocultar</Button>
                                    </div>
                                </div>}
                                <Select label='Plataforma' selectionMode='multiple' selectedKeys={selectedPlataform} onSelectionChange={setSelectedPlataform}>
                                    {plataforms.map((plataform, index) => (
                                        <SelectItem key={index} value={plataform}>{plataform}</SelectItem>
                                    ))}
                                </Select>
                                <Select label='Categoria' isRequired selectedKeys={selectedCategory} onSelectionChange={setSelectedCategory}>
                                    {categories.map((item, index) => (
                                        <SelectItem key={index} value={item} startContent={handleShowIcon(item)}>{item}</SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onPress={onClose}>Cancelar</Button>
                                <Button color='success' onPress={() => handleAdd(onClose)} isLoading={isLoading}>Agregar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}