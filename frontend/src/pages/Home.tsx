import {Card, CardBody, Select, SelectItem, Selection,Spinner} from '@nextui-org/react'
import { StarsIcon, WorldIcon, ScaryIcon, OthersIcon, ShotsIcon, ActionIcon, DollarIcon } from '../assets/icons'
import { useState, useEffect, useMemo } from 'react'
import GameCard from '../components/HomePage/GameCard'
import GameTable from '../components/HomePage/GameTable'
import NavbarComponent from '../components/NavbarComponent'

type Game = {
    name: string,
    price: number,
    category: string,
    imageUrl: string,
    plataforms: string,
    id: number
}

export default function Home(){

    const categories: string[] = ['Mundo abierto', 'Terror', 'Disparos', 'Accion', 'Aventura', 'Otros']
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<Selection>(new Set([]))
    const [priceOrder, setPriceOrder] = useState<Selection>(new Set([]));
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/games/all')
        .then(response => response.json())
        .then(response => setData(response))
        setIsLoading(false);
    }, []);


    const filteredData = useMemo(() => {
        let result = data;
        const filters = Array.from(selectedCategories);
        const order = Array.from(priceOrder)[0];
        if (title){
            result = result.filter((game: Game) => game.name.toLowerCase().includes(title.toLowerCase()))
        }
        if (filters.length > 0){
            result = result.filter((game: Game) => filters.includes(game.category));
        }

        result.sort((a: Game, b: Game) => {
            if (order === 'mayor'){
                return b.price - a.price;
            } else {
                return a.price - b.price;
            }
        });
        return result;

    }, [title, data, selectedCategories, priceOrder]) 

    const LoadingSection = () =>{
        return (
            <section className='w-full h-full flex items-center justify-center flex-col'>
                <Spinner size='lg' color='secondary'/>
                <h1 className='font-sans font-bold text-2xl'>Cargando...</h1>
            </section>
        )
    }

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
    return (
        <>
        <NavbarComponent setTitle={setTitle} showInput={true}/>
        <section className=" h-auto w-full flex justify-center items-center overflow-y-auto">
            <section className='w-full md:w-4/5 h-full flex flex-col'>
                    <section>
                    <Card className='w-full inline-block my-3 ' isBlurred>
                        <CardBody>
                            <h1 className='font-sans text-[3em] font-extrabold'><span className='bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 text-transparent bg-clip-text'>Descubre</span> tu proxima historia</h1>
                        </CardBody>
                    </Card>
                    </section>
                    <section className='flex flex-row gap-2'>
                        <Select label="Genero" className='dark w-72' selectionMode="multiple" selectedKeys={selectedCategories} onSelectionChange={setSelectedCategories}>
                            {categories.map(category => (
                                <SelectItem startContent={handleShowIcon(category)} key={category}>{category}</SelectItem>
                            ))}
                        </Select>
                        <Select label="Ordenar precio" className='dark w-72' selectedKeys={priceOrder} onSelectionChange={setPriceOrder}>
                            <SelectItem startContent={<DollarIcon/>} key="mayor">Descendente</SelectItem>
                            <SelectItem startContent={<StarsIcon/>} key="menor">Ascendente</SelectItem>
                        </Select>
                    </section>
                    <GameTable>
                        {isLoading ? <LoadingSection/> : filteredData.map((game: {name: string, price: number, category: string, imageUrl: string, plataforms: string, id: number}) => (
                            <GameCard title={game.name} price={game.price} image={game.imageUrl} gameId={game.id} key={game.id}/>
                        ))}
                    </GameTable>
            </section>
        </section>
        </>
    )
}