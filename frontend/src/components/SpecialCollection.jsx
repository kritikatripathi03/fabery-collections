import { Link } from "react-router-dom";
import img1 from "../assets/oversized-tshirt.jpg";
import img2 from "../assets/jeans.jpg";
import img3 from "../assets/backside.jpg";
import arrow from "../assets/arrow.png";

export default function SpecialCollection () {
    return (
        <div className="section-shell">
            <div className="surface-card rounded-[2.5rem] p-4 sm:p-6 lg:p-8">
                <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="section-kicker">Special Drop</div>
                            <div className="mt-2 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                                New <br /> Collection
                            </div>
                        </div>
                        <div className="text-base text-stone-500 sm:text-xl">
                            Summer <br /> 2024
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link to="/products" className="btn-primary px-5 py-3 text-sm">
                                <span>Go To Shop</span>
                                <span><img src={arrow} className="h-5 w-5" alt=""/></span>
                            </Link>
                            <div className="flex gap-3">
                                <button className="btn-secondary h-11 w-11 p-0">
                                    ‹
                                </button>

                                <button className="btn-secondary h-11 w-11 p-0">
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="overflow-hidden rounded-[2rem] aspect-[3/4]">
                            <img src={img1} className="h-full w-full object-cover" alt="New collection piece"/>
                        </div>
                        <div className="hidden overflow-hidden rounded-[2rem] aspect-[3/4] sm:block">
                            <img src={img2} className="h-full w-full object-cover" alt="New collection piece"/>
                        </div>
                        <div className="hidden overflow-hidden rounded-[2rem] aspect-[3/4] lg:block">
                            <img src={img3} className="h-full w-full object-cover" alt="New collection piece"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}