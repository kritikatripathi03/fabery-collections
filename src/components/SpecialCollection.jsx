export default function SpecialCollection () {
    return (
        <div className="flex items-center justify-between px-4 py-4">
            <div className="flex flex-col gap-1 text-sm tracking-widest mb-4">
                <div>
                    NEW COLLECTION
                </div>
                <div>
                    Summer 2024
                </div>
                <div>
                    Go To Shop
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="w-[260px] sm:w-[300px] lg:w-[340px] aspect-[3/4] px-4 py-4">
                    <img src="src/assets/oversized-tshirt.jpg" className="w-full h-full object-cover"/>
                </div>
                <div className="w-[260px] sm:w-[300px] lg:w-[340px] aspect-[3/4] px-4 py-4">
                    <img src="src/assets/jeans.jpg" className="w-full h-full object-cover"/>
                </div>
                <div className="w-[260px] sm:w-[300px] lg:w-[340px] aspect-[3/4] px-4 py-4">
                    <img src="src/assets/backside.jpg" className="w-full h-full object-cover"/>
                </div>
            </div>
        </div>
    )
}