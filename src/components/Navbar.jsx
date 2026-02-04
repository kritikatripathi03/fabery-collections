export default function Navbar() {
  return (
    <nav>
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex gap-6">
          <span className="px-2 font-bold">Home</span>
          <span className="px-2 font-bold">Collections</span>
          <span className="px-2 font-bold">New</span>
        </div>

        <div className="flex gap-6">
          <img
            className="h-16 w-16"
            src="src\assets\logo-small.png"
            alt="FABERY"
          />
          <img
            className="py-2 h-20 w-26"
            src="src\assets\logo-new.png"
            alt="FABERY"
          />
        </div>

        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12"
            src="src\assets\wishlist-icon.png"
            alt="WISHLIST"
          />
          <div className="relative flex items-center ml-10 mr-10">
            <button className="bg-black text-white px-6 py-3 rounded-full pr-8">
                Cart
            </button>
            <div className="absolute right-0 translate-x-1/2 bg-white border-4 border-black rounded-full h-10 w-10 flex items-center justify-center">
                <img className="h-5 w-5" src="src\assets\cart.png" alt="WISHLIST" />
            </div>
          </div>
          
          <img
            className="h-12 w-12"
            src="src\assets\profile.png"
            alt="WISHLIST"
          />
        </div>
      </div>
    </nav>
  );
}
