import { Modal,  ModalBody, ModalContent, ModalHeader, Button, Input, useDisclosure, ModalFooter} from "@nextui-org/react";
import { useState } from "react";



export default function ModalDelete(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [errorName, setErrorName] = useState<boolean>(false);
    const [gameName, setGameName] = useState<string>('');

    const handleDelete = (onClose: any) =>{
        setIsLoading(true);
        let id: number | null;
        fetch(`http://localhost:8080/games/find/name/${gameName}/id`)
        .then(response => response.json())
        .then(data => {
            if (data.ok){
                id = parseInt(data.message);
                fetch(`http://localhost:8080/games/delete/${id}`, {
                    method: 'DELETE'
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
    
    
    return (
        <>
            <Button color='warning' onPress={onOpen}>Eliminar</Button>
            <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader>Eliminar Juego</ModalHeader>
                        <ModalBody>
                            <Input placeholder="Nombre del juego" label="Nombre" isInvalid={errorName} errorMessage="Este nombre no funcionó" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGameName(event.target.value)}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='warning' onPress={onClose}>Cancelar</Button>
                            <Button color='success' onPress={() => handleDelete(onClose)} isLoading={isLoading}>Eliminar</Button>
                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}