export default function Footer() {
  return (
    <div className="bg-gray-300/50">
      <div className="flex flex-row items-center justify-between px-60 py-40">
        <div className="flex flex-col">
          <span className="font-medium text-gray-600">INFO</span>
          <br />
          <span>
            <a href="#" className="hover:underline font-medium">
              HOME
            </a>
          </span>
          <span>
            <a href="#" className="hover:underline font-medium">
              ABOUT
            </a>
          </span>
          <span>
            <a href="#" className="hover:underline font-medium">
              CAREERS
            </a>
          </span>
          <span>
            <a href="#" className="hover:underline font-medium">
              CONTACT US
            </a>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-600">ADDRESS</span>
          <br />
          <span className="hover:underline">
            <a href="#" className="font-medium">
              DLF Cybercity <br />
              DLF Phase 2 <br />
              Sector 24, Gurugram <br />
              Haryana, India, 122002
            </a>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-600">SOCIALS</span>
          <br />
          <span>
            <a href="#" className="hover:underline font-medium">
              LinkedIn
            </a>
          </span>
          <span>
            <a href="#" className="hover:underline font-medium">
              Instagram
            </a>
          </span>
          <span>
            <a href="#" className="hover:underline font-medium">
              Facebook
            </a>
          </span>
          <span>
            <a href="#" className="hover:underline font-medium">
              X (previously Twitter)
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
