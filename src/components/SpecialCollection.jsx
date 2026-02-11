export default function SpecialCollection () {
    return (
        <div className="w-full flex flex-col lg:flex-row items-stretch px-4 py-4 min-h-[600px] gap-6">
            <div className="flex flex-col py-6 lg:flex-[0_0_32%] md:flex-[0_0_32%]">
                <div className="mt-auto text-5xl font-bold leading-tight">
                    NEW COLLECTION
                </div>
                <div className="mt-8 mb-8 text-2xl text-gray-600">
                    Summer <br /> 2024
                </div>
                <div className="mt-auto mb-auto flex items-center justify-between gap-6">
                    <button className="flex items-center gap-6 bg-gray-200 px-6 py-3">
                        <span>Go To Shop</span>
                        <span>--›</span>
                    </button>
                    <div className="flex gap-3">
                        <button className="border border-gray-300 w-10 h-10 flex items-center justify-center">
                            ‹
                        </button>

                        <button className="border border-gray-300 w-10 h-10 flex items-center justify-center">
                            ›
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 items-center gap-6">
                <div className="flex-1 min-w-0 aspect-[3/4]">
                    <img src="src/assets/oversized-tshirt.jpg" className="w-full h-full object-cover border border-gray-300"/>
                </div>
                <div className="hidden md:block flex-1 min-w-0 aspect-[3/4]">
                    <img src="src/assets/jeans.jpg" className="w-full h-full object-cover border border-gray-300"/>
                </div>
                <div className="hidden lg:block flex-1 min-w-0 aspect-[3/4]">
                    <img src="src/assets/backside.jpg" className="w-full h-full object-cover border border-gray-300"/>
                </div>
            </div>
        </div>
    )
}