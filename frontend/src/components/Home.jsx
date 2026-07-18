import Categories from "./Categories";
import Collections from "./Collections";
import ImageGallery from "./ImageGallery";
import MiddleText from "./MiddleText";
import SpecialCollection from "./SpecialCollection";
import ThisWeek from "./ThisWeek";

export default function Home() {
    return (
        <div className="space-y-2 lg:space-y-4">
            <SpecialCollection></SpecialCollection>
            <Categories></Categories>
            <ThisWeek></ThisWeek>
            <Collections></Collections>
            <MiddleText></MiddleText>
            <ImageGallery></ImageGallery>
        </div>
    );
}