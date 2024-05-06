import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Chip} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ModalEdit from "../components/Admins/ModalEdit";
import ModalAdd from "../components/Admins/ModalAdd";
import ModalDelete from "../components/Admins/ModalDelete";

export default function Admins(){

    const [data, setData] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:8080/sales/all')
        .then(response => response.json())
        .then(response => setData(response))
    }, [])

    

    return (
        <section className='w-full h-full flex items-center justify-center'>
            <section className='flex flex-col  items-center w-full sm:w-1/2 h-full gap-5 p-5'>
                <h1 className="text-white text-4xl font-sans">Administracion</h1>
                <Table aria-label="Tabla que muestra las ventas">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Usuario</TableColumn>
                        <TableColumn>Total</TableColumn>
                        <TableColumn>Fecha</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No hay ventas que mostrar"}>
                    
                    {data.map((sale: any, index: number) => (
                        <TableRow key={index}>
                                <TableCell>{sale.saleId}</TableCell>
                                <TableCell>{sale.userId}</TableCell>
                                <TableCell>
                                    <Chip color='success'>${sale.total}</Chip>
                                </TableCell>
                                <TableCell>
                                    {sale.date}
                                </TableCell>
                        </TableRow >
                    ))}

                    </TableBody>
                </Table>
                <div className='gap-3 flex flex-row items-center justify-center'>
                    <ModalAdd/>
                    <ModalEdit/>
                    <ModalDelete/>
                </div>
            </section>
        </section>
    )
}