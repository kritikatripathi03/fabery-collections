export default function ImageGallery() {
  return (
    <div className="w-full flex justify-between items-start gap-10 py-20">
      {/* Image 1 */}
      <div className="flex-1">
        <div className="aspect-[3/4] overflow-hidden">
          <img src="src/assets/gal-1.jpg" className="w-full object-cover" />
        </div>
      </div>

      {/* Image 2 (shift down) */}
      <div className="flex-1 mt-20">
        <div className="aspect-[3/4] overflow-hidden">
          <img src="src/assets/gal-2.jpg" className="w-full object-cover" />
        </div>
      </div>
      {/* Image 3 */}
      <div className="flex-1">
        <div className="aspect-[3/4] overflow-hidden">
          <img src="src/assets/gal-3.jpg" className="w-full object-cover" />
        </div>
      </div>

      {/* Image 4 (shift down) */}
      <div className="flex-1 mt-20">
        <div className="aspect-[3/4] overflow-hidden">
          <img src="src/assets/gal-4.jpg" className="w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
