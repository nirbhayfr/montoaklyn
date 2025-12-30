import { Link } from "react-router-dom";

export default function NewProductCard({ product }) {
	return (
		<Link
			to={`/details/${product._id}`}
			className="bg-white overflow-hidden"
		>
			<div className="relative h-[230px]">
				<img
					src={product.images[0]}
					alt={product.title}
					className="w-full h-[100%] object-cover object-top"
				/>

				<span
					className="absolute top-0 left-0 px-2 py-1 text-xs text-white"
					style={{
						background:
							"linear-gradient(90deg, var(--ul-primary) 0%, var(--ul-secondary) 100%)",
					}}
				>
					NEW
				</span>
			</div>

			<div className="py-2">
				<h4 className="text-xs  mb-1 text-left font-semibold">
					{product.title}
				</h4>

				<div className="flex items-center gap-2">
					<span className="text-sm font-semibold">
						₹{product.price}
					</span>
					<span className="text-xs text-gray-400 line-through">
						₹{product.oldPrice}
					</span>
				</div>
			</div>
		</Link>
	);
}
