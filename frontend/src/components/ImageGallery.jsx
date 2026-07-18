import img1 from "../assets/gal-1.jpg";
import img2 from "../assets/gal-2.jpg";
import img3 from "../assets/gal-3.jpg"
import img4 from "../assets/gal-4.jpg"

export default function ImageGallery() {
  return (
    <div className="section-shell pb-8 lg:pb-10">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="overflow-hidden rounded-[2rem] aspect-[3/4]">
          <img src={img1} className="h-full w-full object-cover" alt="Gallery look 1" />
        </div>
        <div className="overflow-hidden rounded-[2rem] aspect-[3/4] sm:mt-6">
          <img src={img2} className="h-full w-full object-cover" alt="Gallery look 2" />
        </div>
        <div className="overflow-hidden rounded-[2rem] aspect-[3/4]">
          <img src={img3} className="h-full w-full object-cover" alt="Gallery look 3" />
        </div>
        <div className="overflow-hidden rounded-[2rem] aspect-[3/4] sm:mt-6">
          <img src={img4} className="h-full w-full object-cover" alt="Gallery look 4" />
        </div>
      </div>
    </div>
  );
}
