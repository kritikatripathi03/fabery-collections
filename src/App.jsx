import Categories from "./components/Categories";
import Collections from "./components/Collections";
import Footer from "./components/Footer";
import ImageGallery from "./components/ImageGallery";
import MiddleText from "./components/MiddleText";
import Navbar from "./components/Navbar";
import SpecialCollection from "./components/SpecialCollection";
import ThisWeek from "./components/ThisWeek";

export default function App() {
  return (
    <div className="px-4 py-2">
      <Navbar></Navbar>
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

