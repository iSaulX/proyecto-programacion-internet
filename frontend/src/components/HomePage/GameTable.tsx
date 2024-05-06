export default function GameTable({children}: {children: React.ReactNode}){
    return (
        <section className="flex flex-row flex-wrap gap-1 sm:gap-3 p-1 mt-2">
            {children}
        </section>
    )
}