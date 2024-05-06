type ItemSummaryProps = {
    item: string;
    price: number;
}

export default function ItemSummary({item, price}: ItemSummaryProps){
    return (
        <div className='w-full h-auto h-max-[50px] flex justify-between *:text-white *:font-sans *:text-lg '>
            <p>{item}</p>
            <p className='!text-gray-400'>${price}</p>
        </div>
    )
}