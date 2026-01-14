import { Link, useParams } from "react-router-dom";

import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import {
	BadgePercent,
	Copy,
	Share2,
	Truck,
	Plus,
	Info,
	Factory,
	RefreshCcw,
} from "lucide-react";
import { useState } from "react";
import NewProductCard from "../components/ui/ProductCard";
import CustomerReviews from "../components/home/Reviews";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "sonner";
import { useProductById, useProducts } from "../hooks/useProducts";

const productInfo = [
	{
		title: "Product Details",
		icon: Info,
		content: [
			"Premium quality pure cotton fabric",
			"Breathable and skin-friendly material",
			"Suitable for daily wear and casual outings",
			"Durable stitching for long-lasting use",
		],
	},
	{
		title: "Manufacturing Details",
		icon: Factory,
		content: [
			"Manufactured in India",
			"Ethically sourced materials",
			"Quality checked before packaging",
		],
	},
	{
		title: "Free Shipping",
		icon: Truck,
		content: [
			"Free delivery on all orders",
			"Ships within 24–48 hours",
			"Trackable shipping available",
		],
	},
	{
		title: "7 Days Exchange",
		icon: RefreshCcw,
		content: [
			"Easy 7-day exchange policy",
			"No questions asked return",
			"Product must be unused and unwashed",
		],
	},
];

function ShopDetailsPage() {
	const params = useParams();
	const products = useProducts();
	const productById = useProductById(params.id);
	const product = productById.product;

	const [selectedSize, setSelectedSize] = useState(null);
	const [openIndex, setOpenIndex] = useState(null);

	const dispatch = useDispatch();

	if (!product) {
		return (
			<>
				<Header />
				<div className="min-h-[60vh] flex items-center justify-center text-lg">
					Loading ...
				</div>
				<Footer />
			</>
		);
	}

	const discountPercent = Math.round(
		((product.oldPrice - product.price) / product.oldPrice) * 100
	);
	const extraOff = Math.round(product.price * 0.1);

	const handleShare = async () => {
		try {
			const url = window.location.href;
			await navigator.clipboard.writeText(url);
			toast.success("Link copied to clipboard");
		} catch (err) {
			toast.error("Failed to copy link");
		}
	};

	return (
		<>
			<Header />

			{/* Breadcrumb */}
			<div className="px-4 md:px-10 py-4 text-sm text-gray-500 -mt-12">
				<span className="hover:text-black cursor-pointer">
					Products
				</span>
				<span className="mx-2">{">"}</span>
				<span className="text-black font-medium">
					{product.title}
				</span>
			</div>

			{/* Product Image */}
			<div className="relative w-full h-[420px] md:h-[520px] bg-gray-100">
				<img
					src={product.images[0]}
					alt={product.title}
					className="w-full h-full object-cover object-top"
				/>

				{/* Icons */}
				<div className="absolute bottom-4 right-4 flex gap-3">
					<button
						className="p-2 bg-white rounded-full shadow hover:scale-105 transition"
						onClick={handleShare}
					>
						<Share2 size={18} />
					</button>
				</div>
			</div>

			{/* Product Info */}
			<div className="px-4 md:px-10 py-6">
				<h1 className="text-lg font-medium uppercase mb-2">
					{product.title}
				</h1>

				<div className="flex items-center gap-2 mb-1">
					<span className="text-md font-semibold">
						₹{product.price}
					</span>
					<span className="text-gray-500 line-through text-xs">
						₹{product.oldPrice}
					</span>
					<span className="text-green-600 font-medium">
						({discountPercent}% OFF)
					</span>
				</div>

				<p className="text-xs text-gray-800">
					Inclusive of all taxes
				</p>

				{/* Best Price Box */}
				{product.price >= 850 ? (
					<Link
						to="/cart"
						className="relative border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-2 mt-6"
					>
						{/* Tag */}
						<div
							className="absolute -top-3 left-4 px-3 py-1 text-xs font-semibold text-white rounded-md uppercase"
							style={{
								background:
									"linear-gradient(90deg, #EF2853, #FFA31A)",
							}}
						>
							Best Price
						</div>

						{/* Left Content */}
						<div className="flex gap-3">
							<div className="mt-1 text-[#EF2853]">
								<BadgePercent size={22} />
							</div>

							<div>
								<p className="font-medium">
									Get at ₹{product.price - extraOff}
								</p>
								<p className="text-[.7rem] text-gray-500">
									10% off on order above 850
									<br />
									T&amp;C applied
								</p>
							</div>
						</div>

						{/* Right Button */}
						<button className="px-2 py-1 border border-green-600 text-green-700 bg-green-50 rounded-md text-xs font-medium whitespace-nowrap">
							Extra ₹{extraOff} OFF
						</button>
					</Link>
				) : (
					<></>
				)}

				{/* Size Manager */}
				<div className="flex items-center justify-between my-3">
					<h3 className="font-medium">Select Size</h3>
					<button className="text-sm text-[#EF2853] font-medium">
						Size Chart
					</button>
				</div>

				<div className="flex gap-3">
					{product.sizes.map((size) => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`w-12 h-12 rounded-md border text-sm font-medium transition
								${
									selectedSize === size
										? "border-black bg-black text-white"
										: "border-gray-300 hover:border-black"
								}`}
						>
							{size}
						</button>
					))}
				</div>

				{/* Service Highlights */}
				<div className="grid grid-cols-3 gap-6 text-center py-6 border-t">
					<div className="flex flex-col items-center gap-2">
						<img
							src="/assets/newimg/detail-3.jpeg"
							alt=""
							className="size-16"
						/>
						<p className="text-xs">
							Free Delivery All over the world
						</p>
					</div>

					<div className="flex flex-col items-center gap-2">
						<img
							src="/assets/newimg/detail-2.jpeg"
							alt=""
							className="size-16"
						/>
						<p className="text-xs">Easy Return & Exchange</p>
					</div>

					<div className="flex flex-col items-center gap-2">
						<img
							src="/assets/newimg/detail-1.jpeg"
							alt=""
							className="size-16"
						/>
						<p className="text-xs">100% Secure Payment</p>
					</div>
				</div>

				{/* Key Highlights */}
				<div className="mt-6">
					<h3 className="font-medium mb-4">Key Highlights</h3>

					<div className="grid grid-cols-2 gap-x-6">
						{[
							{ label: "Color", value: "Grey" },
							{ label: "Pattern", value: "Lining" },
							{ label: "Fabric", value: "Pure Cotton" },
							{ label: "Fit", value: "Regular" },
							{ label: "Sleeves", value: "Full Sleeves" },
						].map((item) => (
							<div
								key={item.label}
								className="border-b py-3 text-sm"
							>
								<p className="text-gray-500">
									{item.label}
								</p>
								<p className="font-semibold">
									{item.value}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Wash Care */}
				<div className="mt-8 w-full">
					<h3 className="font-medium mb-4">Wash Care</h3>

					<div className="grid grid-cols-4 gap-2">
						{[
							{
								title: "Machine Wash",
								img: "/assets/newimg/detail-7.jpeg",
							},
							{
								title: "Cold Wash Only",
								img: "/assets/newimg/detail-6.jpeg",
							},
							{
								title: "Reverse & Dry",
								img: "/assets/newimg/detail-5.jpeg",
							},
							{
								title: "Avoid Direct Sun",
								img: "/assets/newimg/detail-4.jpeg",
							},
						].map((item) => (
							<div
								key={item.title}
								className="rounded-md flex flex-col items-center text-center"
							>
								<img
									src={item.img}
									alt={item.title}
									className="h-16 w-16 object-contain mb-3 border border-gray-300"
								/>
								<p className="text-[0.6rem]">
									{item.title}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Product Information */}
				<div className="mt-8">
					<h3 className="font-medium mb-4">
						Product Information
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{productInfo.map((item, index) => {
							const Icon = item.icon;
							const isOpen = openIndex === index;

							return (
								<div
									key={item.title}
									className="border rounded-md"
								>
									<button
										onClick={() =>
											setOpenIndex(
												isOpen
													? null
													: index
											)
										}
										className="w-full flex items-center justify-between p-1 px-2"
									>
										<div className="flex items-center gap-3">
											<div className="border rounded-md p-2">
												<Icon size={20} />
											</div>
											<p className="text-sm">
												{item.title}
											</p>
										</div>

										<Plus
											size={20}
											className={`transition-transform ${
												isOpen
													? "rotate-45"
													: ""
											}`}
										/>
									</button>

									{isOpen && (
										<div className="px-4 py-3 text-sm text-gray-600 space-y-2">
											{item.content.map(
												(line) => (
													<p key={line}>
														• {line}
													</p>
												)
											)}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>

				{/* Recommended For You */}
				<div className="mt-10">
					<h3 className="font-medium font-bodoni text-xl  text-center mb-4">
						Recommended For You
					</h3>

					<div className="flex gap-4 overflow-x-auto no-scrollbar">
						{products
							.filter((p) => p.id !== product.id)
							.slice(0, 8)
							.map((item) => (
								<div
									key={item.id}
									className="min-w-[160px]"
								>
									<NewProductCard product={item} />
								</div>
							))}
					</div>
				</div>

				<CustomerReviews />
			</div>

			{/* Fixed Add to Cart */}
			<div className="fixed bottom-0 left-0 w-full bg-white p-2 z-50 bg-transparent">
				<button
					className="w-full bg-black text-white py-3 rounded-md font-medium"
					onClick={(e) => {
						e.preventDefault();
						if (selectedSize === null) {
							toast.warning("Please select a size");
							return;
						}

						dispatch(
							addToCart({
								...product,
								quantity: 1,
								size: selectedSize,
							})
						);
						setSelectedSize(null);
						toast.success("Added to cart");
					}}
				>
					Add to Cart
				</button>
			</div>

			<div className="pb-16 bg-black">
				<Footer />
			</div>
		</>
	);
}

export default ShopDetailsPage;
