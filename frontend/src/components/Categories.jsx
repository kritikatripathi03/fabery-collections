export default function Categories() {
    return (
        <div className="section-shell pt-0">
            <div className="surface-card rounded-[2rem] px-5 py-6 sm:px-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-stone-500">
                        <a href="#" className="chip px-4 py-2">Men</a>
                        <a href="#" className="chip px-4 py-2">Women</a>
                        <a href="#" className="chip px-4 py-2">Kids</a>
                    </div>

                    <div className="relative w-full lg:max-w-md">
                        <input
                            type="text"
                            placeholder="Search the collection"
                            className="input-modern py-3 px-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}