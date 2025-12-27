import Exclusive from "../components/home/Exclusive";
import ImageSlider from "../components/home/ImageSlider";
import TexturedImageGrid from "../components/home/Newcollection";
import NewsLetterAndBlogs from "../components/home/NewsLetterAndBlogs";
import CustomerReviews from "../components/home/Reviews";
import Timer from "../components/home/Timer";
import TrendingNow from "../components/home/TrendingNow";
import Footer from "../components/index/Footer";
import { Header } from "../components/index/Header";

function Home() {
	return (
		<>
			<Header />
			<ImageSlider />
			<TexturedImageGrid />
			<Exclusive />
			<TrendingNow />
			<Timer />
			<CustomerReviews />
			<NewsLetterAndBlogs />
			<Footer />
		</>
	);
}

export default Home;
