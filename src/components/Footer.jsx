export default function Footer() {
    return (
        <div className="bg-gray-300/50">
            <div className="flex flex-row items-center justify-between px-60 py-40">
                <div className="flex flex-col">
                    <span className="font-bold">INFO</span>
                    <br />
                    <span><a href="#" className="hover:underline">HOME</a></span>
                    <span><a href="#" className="hover:underline">ABOUT</a></span>
                    <span><a href="#" className="hover:underline">CAREERS</a></span>
                    <span><a href="#" className="hover:underline">CONTACT US</a></span>
                </div>    
                <div className="flex flex-col">
                    <span className="font-bold">ADDRESS</span>
                    <br />
                    <span><a href="#" className="hover:underline">DLF Cybercity</a></span>
                    <span><a href="#" className="hover:underline">DLF Phase 2</a></span>
                    <span><a href="#" className="hover:underline">Sector 24, Gurugram</a></span>
                    <span><a href="#" className="hover:underline">Haryana, India, 122002</a></span>
                </div>    
                <div className="flex flex-col">
                    <span className="font-bold">SOCIALS</span>
                    <br />
                    <span><a href="#" className="hover:underline">LinkedIn</a></span>
                    <span><a href="#" className="hover:underline">Instagram</a></span>
                    <span><a href="#" className="hover:underline">Facebook</a></span>
                    <span><a href="#" className="hover:underline">X (previously Twitter)</a></span>
                </div>            
            </div>
        </div>
    )
}