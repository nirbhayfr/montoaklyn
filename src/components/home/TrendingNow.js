import { Link } from "react-router-dom";

import NewProductCard from "../ui/ProductCard";
import { products } from "../../data/newData";

export default function TrendingNow() {
	return (
		<section className="py-4 px-6">
			<div className="max-w-6xl mx-auto">
				{/* Heading */}
				<div className="flex flex-col gap-2 items-center justify-center mb-3 ">
					<h3 className="font-medium text-2xl font-bodoni">
						Trending Now
					</h3>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
					{products.slice(0, 6).map((item, index) => (
						<NewProductCard key={index} product={item} />
					))}
				</div>

				{/* View All */}
				<div className="flex justify-center mt-8">
					<Link
						to="/shop"
						className="px-8 py-1 bg-transparent border-2 border-solid border-pink-900 text-pink-900 rounded-md"
					>
						View All
					</Link>
				</div>
			</div>
		</section>
	);
}
