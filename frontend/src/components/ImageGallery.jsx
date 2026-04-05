import img1 from "../assets/gal-1.jpg";
import img2 from "../assets/gal-2.jpg";
import img3 from "../assets/gal-3.jpg"
import img4 from "../assets/gal-4.jpg"

export default function ImageGallery() {
  return (
    <div className="w-full flex justify-between items-start gap-10 px-4 py-20">
      {/* Image 1 */}
      <div className="flex-1">
        <div className="aspect-[3/4] overflow-hidden">
          <img src={img1} className="w-full object-cover" />
        </div>
      </div>

      {/* Image 2 (shift down) */}
      <div className="flex-1 mt-20">
        <div className="aspect-[3/4] overflow-hidden">
          <img src={img2} className="w-full object-cover" />
        </div>
      </div>
      {/* Image 3 */}
      <div className="flex-1">
        <div className="aspect-[3/4] overflow-hidden">
          <img src={img3} className="w-full object-cover" />
        </div>
      </div>

      {/* Image 4 (shift down) */}
      <div className="flex-1 mt-20">
        <div className="aspect-[3/4] overflow-hidden">
          <img src={img4} className="w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
