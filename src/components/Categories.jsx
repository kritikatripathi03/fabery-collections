import search from "../assets/search.png";

export default function Categories() {
    return (
        <div className="w-full bg-transparent mt-6 px-4 py-4">
            <div className="max-w-4xl mx-auto lg:ml-2 px-4 sm:px-2 lg:px-6">
                <div className="flex flex-col gap-1 text-sm tracking-widest mb-4">
                    <span>MEN</span>
                    <span>WOMEN</span>
                    <span>KIDS</span>
                </div>

                <div className="relative">
                    <input 
                    type="text"
                    placeholder="Search"
                    className="lg:w-50 bg-gray-200 py-3 pl-10 pr-4 outline-none"
                    />
                    {/* Search icon */}
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                        <img src={search} className="h-7 w-8"/>
                    </span>
                </div>
            </div>
        </div>
    )
}