import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/index/Footer";
import { Header } from "../components/index/Header";
import { ArrowLeft, BadgePercent, ChevronRight, Trash2 } from "lucide-react";
import {
	decreaseQuantity,
	increaseQuantity,
	removeItem,
} from "../redux/cartSlice";
import { products } from "../data/newData";
import NewProductCard from "../components/ui/ProductCard";
import { Link } from "react-router-dom";

function CartPage() {
	const cart = useSelector((state) => state.cart.data);

	const subTotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const totalMrp = cart.reduce(
		(sum, item) => sum + item.mrp * item.quantity,
		0
	);
	const extraOff = Math.round(subTotal * 0.1);
	const discount = totalMrp - subTotal;

	return (
		<>
			<Header />

			{/* Cart Header */}
			<div className="px-4 py-4 flex items-center gap-3 border-b -mt-14">
				<button>
					<ArrowLeft size={20} />
				</button>

				<h1 className="font-medium text-lg">
					My Bag ({cart.length} items)
				</h1>
			</div>

			{/* Best Price Box */}
			<div className="relative border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-4 mt-6">
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
							Get at ₹{subTotal - extraOff}
						</p>
						<p className="text-xs text-gray-500">
							10% off on order above ₹{subTotal} <br />
							T&amp;C applied
						</p>
					</div>
				</div>

				{/* Right Button */}
				<button className="px-2 py-1 border border-green-600 text-green-700 bg-green-50 rounded-md text-sm font-medium whitespace-nowrap">
					Extra ₹{extraOff} OFF
				</button>
			</div>

			<div className="flex flex-col gap-3">
				{cart.map((product) => (
					<CartItem key={product.id} product={product} />
				))}
			</div>

			<div className="border border-gray-200 rounded-md p-4">
				<h3 className="text-sm font-semibold mb-3">
					Order Summary ({cart.length} items)
				</h3>

				<div className="flex justify-between text-sm mb-2">
					<span>Total MRP</span>
					<span>₹{totalMrp}</span>
				</div>

				<div className="flex justify-between text-sm mb-2 ">
					<span>Discount</span>
					<span className="text-green-600">- ₹{discount}</span>
				</div>

				<div className="flex justify-between text-sm mb-2">
					<span>Delivery Charge</span>
					<span className="text-green-600">FREE</span>
				</div>

				<hr className="my-3" />

				<div className="flex justify-between font-semibold">
					<span>Total Amount</span>
					<span>₹{subTotal}</span>
				</div>
			</div>

			<div className="text-black rounded-md px-6 py-4 ">
				<div className="bg-gray-200 rounded-md px-6 py-2 flex items-center justify-center gap-2">
					<BadgePercent />
					<span className="font-medium text-xs">
						Yay !! Your total discount is ₹{discount}
					</span>
				</div>
			</div>

			{/* Coupon Card */}
			<div className="p-4">
				<div className="border border-gray-800 rounded-md px-3 py-2 text-sm">
					{/* Top row */}
					<div className="flex justify-between items-start pr-2">
						<div>
							<p className="font-semibold">
								Extra 15% OFF
							</p>
							<p className="text-gray-600 mt-3 text-xs">
								15% off upto ₹150 on minimum purchase of
								₹300
							</p>
						</div>

						<button className="border border-black text-black px-3 py-1 rounded text-xs font-medium hover:bg-black hover:text-white transition">
							APPLY
						</button>
					</div>

					{/* Bottom strip */}
					<div className="mt-4 bg-gray-100 px-3 py-2 text-xs flex items-center cursor-pointer justify-center">
						<span>
							View / Apply more coupons and gift cards
						</span>
						<ChevronRight className="size-3" />
					</div>
				</div>
			</div>

			{/* Recently Viewed */}
			<div className="mb-4">
				<h3 className="font-medium font-bodoni text-xl text-center mb-4">
					Recently Viewed
				</h3>

				<div className="flex gap-4 overflow-x-auto no-scrollbar">
					<div />

					{products.slice(0, 8).map((item) => (
						<div key={item.id} className="min-w-[160px]">
							<NewProductCard product={item} />
						</div>
					))}

					<div />
				</div>
			</div>

			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-2 flex items-center justify-between">
				{/* Amount */}
				<div>
					<p className="text-base font-semibold">₹{subTotal}</p>
					<p className="text-xs text-gray-500">
						Total Payable Amount
					</p>
				</div>

				{/* CTA */}
				{subTotal !== 0 && (
					<Link
						to="/checkout"
						className="bg-black text-white px-6 py-2 text-sm font-medium"
					>
						Proceed to Buy
					</Link>
				)}
			</div>

			<Footer />
		</>
	);
}

export default CartPage;

const CartItem = ({ product }) => {
	const dispatch = useDispatch();

	return (
		<div className="relative flex gap-4 border border-gray-200 rounded-md p-3">
			{/* Image */}
			<div className="relative w-24 h-32 flex-shrink-0">
				<img
					src={product.image}
					alt={product.name}
					className="w-full h-full object-cover rounded object-top"
				/>

				{/* Rating */}
				<span className="absolute bottom-1 left-1 bg-black text-white text-xs px-1.5 py-0.5 rounded">
					{product.rating} ★
				</span>
			</div>

			{/* Details */}
			<div className="flex-1">
				<h3 className="text-sm font-medium leading-snug">
					{product.name}
				</h3>

				<div className="flex items-center gap-2 mt-1">
					<span className="text-sm font-semibold">
						₹{product.price}
					</span>
					<span className="text-xs text-gray-400 line-through">
						₹{product.mrp}
					</span>
					<span className="text-xs font-medium text-green-600">
						{Math.round(
							((product.mrp - product.price) /
								product.mrp) *
								100
						)}
						% OFF
					</span>
				</div>

				{/* Quantity + Size */}
				<div className="flex gap-3 mt-8">
					<div className="flex items-center border border-gray-300 rounded text-xs">
						<button
							className="px-2 py-1 border-r border-gray-300"
							onClick={() =>
								dispatch(
									decreaseQuantity({
										id: product.id,
									})
								)
							}
						>
							−
						</button>

						<span className="px-3 py-1 select-none">
							{product.quantity}
						</span>

						<button
							className="px-2 py-1 border-l border-gray-300"
							onClick={() =>
								dispatch(
									increaseQuantity({
										id: product.id,
									})
								)
							}
						>
							+
						</button>
					</div>

					<select className="border border-gray-300 rounded px-2 py-1 text-xs">
						{["S", "M", "L", "XL"].map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Delete */}
			<button
				className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm"
				onClick={() => dispatch(removeItem({ id: product.id }))}
			>
				<Trash2 className="size-5" />
			</button>
		</div>
	);
};
