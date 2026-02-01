export default function Navbar() {
    return (
        <nav className="w-full border-b border-black/10">
            <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6">

                <div className="flex items-center gap-8">
                    <div className="flex flex-col gap-[3px] cursor-pointer">
                        <span className="h-[2px] w-5 bg-black"></span>
                        <span className="h-[2px] w-5 bg-black"></span>
                        <span className="h-[2px] w-5 bg-black"></span>
                    </div>

                    <ul className="flex items-center gap-8 text-sm font-medium">
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">Collections</li>
                        <li className="cursor-pointer">New</li>
                    </ul>
                </div>

                <div className="flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black cursor-pointer">
            <div className="ml-[2px] h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-black" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white cursor-pointer">
            ♡
          </div>

          {/* Cart */}
          <button className="rounded-full bg-black px-6 py-2 text-sm text-white">
            Cart
          </button>

          {/* Profile */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black cursor-pointer">
            👤
          </div>
        </div>

            </div>
        </nav>
    )
}

