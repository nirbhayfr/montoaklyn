import Footer from "../components/index/Footer";
import { Header } from "../components/index/Header";
import Hero from "../components/index/Hero";
// import SiderBar from "../components/index/SiderBar";

export default function index() {
  return (
    <div>
      {/* <Loader /> */}
      {/* <SiderBar /> */}
      <Header />
      {/* logo alignmenr margin */}
      <div className="-mt-[60px]">
        <Hero />
        <Footer />
      </div>
    </div>
  );
}

// function Loader() {
//   return (
//     <div>
//       <div class="preloader" id="preloader">
//         <div class="loader"></div>
//       </div>
//     </div>
//   );
// }
