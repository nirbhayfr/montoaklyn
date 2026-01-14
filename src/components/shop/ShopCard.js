import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function ShopCard({ product }) {
	const dispatch = useDispatch();
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

				{/* NEW tag */}
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
			{/* Details */}
			<div className="py-2">
				<h4 className="text-xs font-medium mb-1 text-left uppercase">
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
				<div className="flex justify-center mt-2">
					<button
						onClick={(e) => {
							e.preventDefault();
							dispatch(
								addToCart({
									...product,
									quantity: 1,
									size: product.sizes[0],
								})
							);

							toast.success("Added to cart");
						}}
						className="
                                px-8 py-1
                                bg-transparent
                                border-2 border-solid border-pink-900
                                text-pink-900
                                rounded-md
								w-full
                            
                            "
					>
						Add To Cart
					</button>
				</div>{" "}
			</div>
		</Link>
	);
}
