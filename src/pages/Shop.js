import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PageHeading from "../common/PageHeading";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../api/productService";

// ---------- Portal Sheet ----------
function MobileFilterSheet({
	open,
	title,
	onClose,
	onClear,
	onApply,
	children,
}) {
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = prev);
	}, [open]);

	if (!open) return null;

	return createPortal(
		<>
			<div
				className="fixed inset-0 z-[9998] bg-black/50"
				onClick={onClose}
			/>
			<div className="fixed left-0 right-0 bottom-0 z-[9999] w-screen rounded-t-2xl bg-white border-t shadow-2xl sheet-big">
				<div className="px-4 py-3 flex items-center justify-between border-b">
					<h3 className="text-lg font-semibold">{title}</h3>
					<button
						className="text-sm px-3 py-1.5 rounded-lg border"
						onClick={onClose}
					>
						Done
					</button>
				</div>

				<div className="p-4 max-h-[70vh] overflow-y-auto">
					{children}
				</div>

				<div className="p-4 pt-0 flex items-center justify-between">
					<button
						className="text-sm px-3 py-1.5 rounded-lg border"
						onClick={onClear}
					>
						Clear All
					</button>
					<button
						className="px-4 py-2 rounded-xl bg-blue-600 text-white"
						onClick={onApply || onClose}
					>
						Apply
					</button>
				</div>
			</div>
		</>,
		document.body
	);
}

const Shop = () => {
	const dispatch = useDispatch();

	// ⭐ REAL API PRODUCTS
	const [apiProducts, setApiProducts] = useState([]);

	// ⭐ FETCH PRODUCTS ON PAGE LOAD
	useEffect(() => {
		fetchProducts()
			.then((res) => {
				console.log("Fetched API Products:", res.data);
				setApiProducts(res.data);
			})
			.catch((err) => console.error("API Error:", err));
	}, []);

	const [filters, setFilters] = useState({
		categories: [],
		brands: [],
		priceRange: [0, 20000],
	});

	// ⭐ Build categories from API
	const categoryList = Array.from(
		new Set(apiProducts.map((p) => p.category?.name || "Others"))
	);

	// ⭐ Brand optional (if you later use)
	const brandList = [];

	// ⭐ Filtering logic
	const filteredProducts = apiProducts.filter((product) => {
		const categoryName = product.category?.name || "Others";

		if (
			filters.categories.length > 0 &&
			!filters.categories.includes(categoryName)
		) {
			return false;
		}

		const price = Number(product.price);
		if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
			return false;
		}

		return true;
	});

	const clearAll = () =>
		setFilters({ categories: [], brands: [], priceRange: [0, 20000] });

	const [activeSheet, setActiveSheet] = useState(null);

	return (
		<div>
			<PageHeading home={"home"} pagename={"Shop"} />

			<div className="w-11/12 mx-auto mt-4 md:mt-8">
				{/* Mobile filter buttons */}
				<div className="md:hidden bg-white/90 border-b py-2">
					<div className="flex items-center gap-2 overflow-x-auto">
						<button
							className="px-3 py-1.5 rounded-full border"
							onClick={() => setActiveSheet("price")}
						>
							Price
						</button>

						<button
							className="px-3 py-1.5 rounded-full border"
							onClick={() => setActiveSheet("category")}
						>
							Category
						</button>

						<button
							className="ml-auto px-3 py-1.5 rounded-full border"
							onClick={clearAll}
						>
							Clear
						</button>
					</div>
				</div>

				{/* Product Grid */}
				<div className="flex gap-3 items-start">
					<div className="w-full md:w-3/4">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{filteredProducts.map((item) => (
								<div key={item._id}>
									<div className="overflow-hidden bg-white rounded-3xl border product-card">
										<div className="relative">
											<img
												src={
													item
														.images?.[0]
												}
												alt={item.title}
												className="rounded-3xl w-full object-cover"
											/>

											<div className="absolute -bottom-3 right-0 bg-white p-4 rounded-s-2xl">
												<div className="bg-black text-white h-10 w-10 grid place-items-center rounded-3xl">
													<button
														className="text-2xl"
														onClick={() =>
															dispatch(
																addToCart(
																	item
																)
															)
														}
													>
														<BiCart />
													</button>
												</div>
											</div>
										</div>

										<div className="mt-2 p-3">
											<p className="mb-1 font-medium">
												{item.title}
											</p>
											<p className="font-semibold">
												₹{item.price}
											</p>
										</div>
									</div>
								</div>
							))}

							{filteredProducts.length === 0 && (
								<div className="col-span-full text-slate-600">
									No products match your filter.
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Bottom Filter Sheet */}
			<MobileFilterSheet
				open={!!activeSheet}
				title={
					activeSheet === "price"
						? "Filter by Price"
						: activeSheet === "category"
						? "Filter by Category"
						: ""
				}
				onClose={() => setActiveSheet(null)}
				onClear={clearAll}
			>
				{activeSheet === "price" && (
					<>
						<Slider
							min={0}
							max={20000}
							range
							value={filters.priceRange}
							onChange={(value) =>
								setFilters((f) => ({
									...f,
									priceRange: value,
								}))
							}
						/>
						<div className="mt-3 flex justify-between text-sm text-slate-700">
							<span>Min: ₹{filters.priceRange[0]}</span>
							<span>Max: ₹{filters.priceRange[1]}</span>
						</div>
					</>
				)}

				{activeSheet === "category" && (
					<div className="space-y-2">
						{categoryList.map((category) => (
							<label
								key={category}
								className="flex items-center gap-2 text-slate-700"
							>
								<input
									type="checkbox"
									className="h-4 w-4 accent-blue-600"
									checked={filters.categories.includes(
										category
									)}
									onChange={() => {
										const next = new Set(
											filters.categories
										);
										next.has(category)
											? next.delete(category)
											: next.add(category);
										setFilters((f) => ({
											...f,
											categories:
												Array.from(next),
										}));
									}}
								/>
								<span>{category}</span>
							</label>
						))}
					</div>
				)}
			</MobileFilterSheet>
		</div>
	);
};

export default Shop;
