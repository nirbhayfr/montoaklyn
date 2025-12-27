import Footer from "../components/index/Footer";
import { Header } from "../components/index/Header";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import ShopBanner from "../components/shop/ShopBanner";
import ShopProducts from "../components/shop/ShopProducts";
import { products } from "../data/newData";

function NewShopPage() {
	return (
		<>
			<div className="">
				<Header />
				<ShopBanner />
				<ShopProducts products={products} />
				<Footer />
			</div>

			{/* Sticky Bar */}
			<div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200">
				<div className="flex divide-x divide-gray-200">
					<button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium">
						<ArrowUpDown size={16} />
						Sort
					</button>

					<button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium">
						<SlidersHorizontal size={16} />
						Filter
					</button>
				</div>
			</div>
		</>
	);
}

export default NewShopPage;
