export default function ThisWeek() {
  return (
    <div>
      <div className="flex items-end justify-between px-4 py-4 min-h-[150px]">
        <div className="text-5xl font-bold leading-tight">
          NEW <br /> THIS WEEK
        </div>
        <div className="flex flex-col">
          <a href="#" className="mt-auto text-gray-600 hover:underline">
            See All
          </a>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-10">
        <div className="flex-1 min-w-0 aspect-[1/1]">
          <img src="src\assets\t-shirt-1.jpg" className="w-full h-full object-cover border border-gray-300"/>
        </div>
        <div className="flex-1 min-w-0 aspect-[1/1]">
          <img src="src\assets\t-shirt-2.jpg" className="w-full h-full object-cover border border-gray-300"/>
        </div>
        <div className="flex-1 min-w-0 aspect-[1/1]">
          <img src="src\assets\t-shirt-3.jpg" className="w-full h-full object-cover border border-gray-300"/>
        </div>
        <div className="flex-1 min-w-0 aspect-[1/1]">
          <img src="src\assets\t-shirt-4.jpg" className="w-full h-full object-cover border border-gray-300"/>
        </div>
      </div>
    </div>
  );
}
