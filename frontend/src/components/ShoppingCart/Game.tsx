import { Image,Button, Chip, Tooltip } from '@nextui-org/react';
import { TrashIcon, WindowsIcon, SteamIcon, MinusIcon, PlusIcon } from '../../assets/icons';



type GameShoppingCartProps = {
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    index: number;
    onDelete: (index: number) => void;
    onIncreaseQuantity: (index: number) => void;
    onDecreaseQuantity: (index: number) => void;
}
export default function GameShoppingCart({name, price, imageUrl, quantity, index, onDelete, onIncreaseQuantity, onDecreaseQuantity}: GameShoppingCartProps){
    return (
        <section className='w-max-[200px] h-max-[200px] '>
            <div className='flex flex-rown gap-5'>
                <Image src={imageUrl} alt={name + "image"} width={200} height={300}/>
                <div className="flex flex-col w-full h-auto gap-3">
                    <h1 className='font-semibold font-sans text-2xl'>{name}</h1>
                    <p className='text-gray-200'>Plataformas: </p>
                    <div className='flex flex-row gap-2'>
                        <Chip startContent={<WindowsIcon/>} className='rounded-md'>Windows</Chip>
                        <Chip startContent={<SteamIcon/>} className='rounded-md'>Steam</Chip>
                    </div>
                    <Chip color="primary">$ {price}</Chip>
                </div>
                <div className='ml-auto flex justify-end items-end flex-col'>
                    <Tooltip content="Elminar del carrito" className='dark text-white'>
                        <Button isIconOnly className='bg-transparent' onPress={() => onDelete(index)}>
                            <TrashIcon/>
                        </Button>
                    </Tooltip>
                    <div className='flex flex-row gap-1 items-center mt-auto w-full'>
                            <Tooltip content="Disminuir cantidad" className='dark text-white'>
                                <Button isIconOnly className='bg-transparent ml-auto' onClick={()=> onDecreaseQuantity(index)} isDisabled={quantity === 1}>
                                    <MinusIcon/>
                                </Button>
                            </Tooltip>
                        <span className='text-white'>{quantity}</span>
                        <Tooltip content="Aumentar cantidad" className='dark text-white'>
                            <Button isIconOnly className='bg-transparent' onClick={()=> onIncreaseQuantity(index)}>
                                <PlusIcon/>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>

        </section>
    )

}