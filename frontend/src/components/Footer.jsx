export default function Footer() {
  return (
    <div className="section-shell pb-8">
      <div className="surface-card rounded-[2rem] px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="section-kicker">Info</span>
            <div className="mt-5 flex flex-col gap-3 text-sm text-stone-600">
              <a href="/" className="transition hover:text-stone-950">Home</a>
              <a href="/about" className="transition hover:text-stone-950">About</a>
              <a href="#" className="transition hover:text-stone-950">Careers</a>
              <a href="#" className="transition hover:text-stone-950">Contact us</a>
            </div>
          </div>
          <div>
            <span className="section-kicker">Address</span>
            <p className="mt-5 max-w-sm text-sm leading-7 text-stone-600">
              DLF Cybercity
              <br />
              DLF Phase 2
              <br />
              Sector 24, Gurugram
              <br />
              Haryana, India, 122002
            </p>
          </div>
          <div>
            <span className="section-kicker">Socials</span>
            <div className="mt-5 flex flex-col gap-3 text-sm text-stone-600">
              <a href="#" className="transition hover:text-stone-950">LinkedIn</a>
              <a href="#" className="transition hover:text-stone-950">Instagram</a>
              <a href="#" className="transition hover:text-stone-950">Facebook</a>
              <a href="#" className="transition hover:text-stone-950">X / Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
