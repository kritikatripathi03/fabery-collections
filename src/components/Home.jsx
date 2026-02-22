import Categories from "./Categories";
import Collections from "./Collections";
import Footer from "./Footer";
import ImageGallery from "./ImageGallery";
import MiddleText from "./MiddleText";
import SpecialCollection from "./SpecialCollection";
import ThisWeek from "./ThisWeek";

export default function Home() {
    return (
        <div>
            <Categories></Categories>
            <SpecialCollection></SpecialCollection>
            <ThisWeek></ThisWeek>
            <Collections></Collections>
            <MiddleText></MiddleText>
            <ImageGallery></ImageGallery>
            <Footer></Footer>
        </div>
    );
}