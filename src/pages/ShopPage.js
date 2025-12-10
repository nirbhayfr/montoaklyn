// ShopPage.jsx — One-line Flipkart-style filter bar + Add-to-Cart confirm dialog
// Exports (named): products, ShopPage, ProductCard

import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategorySectionShop from "../components/index/main/categoryshopcircle";
import { products } from "../data/Data";

const parsePrice = (p) => {
	if (typeof p === "number") return p;
	const n = Number(String(p).replace(/[^0-9.]/g, ""));
	return Number.isFinite(n) ? n : 0;
};

// 👇 Add this right before the final closing line of your ShopPage.jsx
export const AddToCartModal = ({
	open,
	product,
	size,
	qty,
	onSizeChange,
	onQtyChange,
	onClose,
	onConfirm,
}) => {
	if (!open || !product) return null;

	const sizeOptions = ["S", "M", "L", "XL", "XXL"];

	return (
		<div
			className="ul-modal-overlay"
			role="dialog"
			aria-modal="true"
			onClick={onClose}
		>
			<div className="ul-modal" onClick={(e) => e.stopPropagation()}>
				<div className="ul-modal-header">
					<h4>Add to Cart</h4>
					<button
						className="ul-modal-close"
						onClick={onClose}
						aria-label="Close"
					>
						×
					</button>
				</div>

				<div className="ul-modal-body">
					<div className="ul-modal-product">
						<img
							src={product.images[0]}
							alt={product.title}
						/>
						<div>
							<h5 className="ul-modal-title">
								{product.title}
							</h5>
							<div className="ul-modal-price">
								{product.price}
							</div>
						</div>
					</div>

					<div className="ul-modal-row">
						<label>Size</label>
						<div className="ul-size-pills">
							{sizeOptions.map((s) => (
								<button
									key={s}
									className={`ul-size-pill ${
										size === s ? "active" : ""
									}`}
									onClick={() => onSizeChange(s)}
									type="button"
								>
									{s}
								</button>
							))}
						</div>
					</div>

					<div className="ul-modal-row">
						<label>Quantity</label>
						<div className="ul-qty">
							<button
								type="button"
								onClick={() =>
									onQtyChange(Math.max(1, qty - 1))
								}
							>
								−
							</button>
							<input
								type="number"
								min={1}
								value={qty}
								readOnly
							/>
							<button
								type="button"
								onClick={() => onQtyChange(qty + 1)}
							>
								+
							</button>
						</div>
					</div>
				</div>

				<div className="ul-modal-footer">
					<button className="ul-btn-secondary" onClick={onClose}>
						Cancel
					</button>
					<button className="ul-btn-primary" onClick={onConfirm}>
						Confirm <i className="flaticon-shopping-bag" />
					</button>
				</div>
			</div>
		</div>
	);
};

// ✅ Main ShopPage Component
export const ShopPage = () => {
	// filters
	const [category, setCategory] = useState("");
	const [priceRange, setPriceRange] = useState("");
	const [sortBy, setSortBy] = useState("relevance");
	const [color, setColor] = useState("");
	const [status, setStatus] = useState("");
	const [minRating, setMinRating] = useState(0);

	// modal state
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [chosenSize, setChosenSize] = useState("M");
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();

	const openConfirm = (product) => {
		setSelectedProduct(product);
		setChosenSize(product.size || "M");
		setQty(1);
		setConfirmOpen(true);
	};

	const closeConfirm = () => {
		setConfirmOpen(false);
		setSelectedProduct(null);
	};

	const handleConfirmAdd = () => {
		if (!selectedProduct) return;
		dispatch(
			addToCart({
				...selectedProduct,
				size: chosenSize,
				quantity: qty,
			})
		);
		dispatch(getCartTotal());
		setConfirmOpen(false);
		toast.success(`${qty} × ${selectedProduct.title} added to cart`, {
			position: "top-right",
			autoClose: 2000,
			theme: "colored",
		});
	};

	// quick add (no modal)
	const handleQuickAdd = (product, e) => {
		e?.preventDefault();
		e?.stopPropagation();
		const payload = {
			...product,
			quantity:
				product.quantity && product.quantity > 0
					? product.quantity
					: 1,
		};
		dispatch(addToCart(payload));
		dispatch(getCartTotal());
		toast.success(`${payload.title} added to cart`, {
			position: "top-right",
			autoClose: 1500,
			theme: "colored",
		});
	};

	const categories = useMemo(
		() => Array.from(new Set(products.map((p) => p.category))),
		[]
	);
	const colorOptions = useMemo(
		() => Array.from(new Set(products.map((p) => p.color))),
		[]
	);
	const sizeOptions = ["S", "M", "L", "XL", "XXL"];

	const priceRanges = [
		{ key: "", label: "Any Price" },
		{ key: "0-500", label: "Under ₹500" },
		{ key: "500-1000", label: "₹500 – ₹1000" },
		// { key: "100-200", label: "$100 – $200" },
		// { key: "200+", label: "$200 & above" },
	];

	const filtered = useMemo(() => {
		let list = [...products];
		if (category) list = list.filter((p) => p.category === category);
		if (color) list = list.filter((p) => p.color === color);
		if (status === "in_stock") list = list.filter((p) => p.inStock);
		if (status === "on_sale") list = list.filter((p) => p.onSale);
		if (minRating > 0)
			list = list.filter((p) => (p.rating || 0) >= minRating);
		if (priceRange) {
			list = list.filter((p) => {
				const pr = parsePrice(p.price);
				if (priceRange === "200+") return pr >= 200;
				const [lo, hi] = priceRange.split("-").map(Number);
				return pr >= lo && pr <= hi;
			});
		}
		switch (sortBy) {
			case "price_asc":
				list.sort(
					(a, b) => parsePrice(a.price) - parsePrice(b.price)
				);
				break;
			case "price_desc":
				list.sort(
					(a, b) => parsePrice(b.price) - parsePrice(a.price)
				);
				break;
			case "title_asc":
				list.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "title_desc":
				list.sort((a, b) => b.title.localeCompare(a.title));
				break;
			default:
				break;
		}
		return list;
	}, [category, color, status, minRating, priceRange, sortBy]);

	const clearAll = () => {
		setCategory("");
		setPriceRange("");
		setSortBy("relevance");
		setColor("");
		setStatus("");
		setMinRating(0);
	};

	return (
		<>
			<Header />
			<CategorySectionShop />

			{/* ONE-LINE FILTER BAR */}
			<section className="ul-container" style={{ marginTop: 20 }}>
				<div className="ul-toolbar-inline">
					<select
						className="ul-pill ul-select ul-control"
						value={priceRange}
						onChange={(e) => setPriceRange(e.target.value)}
						aria-label="Price"
						title="Price"
					>
						{priceRanges.map((r) => (
							<option key={r.key} value={r.key}>
								{r.label}
							</option>
						))}
					</select>

					<select
						className="ul-pill ul-select ul-control"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						aria-label="Sort by"
						title="Sort by"
					>
						<option value="relevance">Sort: Relevance</option>
						<option value="price_asc">
							Price: Low to High
						</option>
						<option value="price_desc">
							Price: High to Low
						</option>
						<option value="title_asc">Title: A → Z</option>
						<option value="title_desc">Title: Z → A</option>
					</select>

					<div className="ul-toolbar-count">
						Showing <strong>{filtered.length}</strong> /{" "}
						{products.length}
					</div>
				</div>
			</section>

			{/* PRODUCT GRID */}
			<section
				className="ul-inner-page-container"
				style={{ marginTop: 12 }}
			>
				<div className="row ul-bs-row row-cols-lg-4 row-cols-2 row-cols-xxs-1">
					{filtered.map((product) => (
						<ProductCard
							className=""
							key={product.id}
							product={product}
							onAddClick={() => openConfirm(product)}
							onQuickAdd={(e) =>
								handleQuickAdd(product, e)
							}
						/>
					))}
					{filtered.length === 0 && (
						<div className="col" style={{ padding: 24 }}>
							<p>No products match your filters.</p>
						</div>
					)}
				</div>
			</section>

			{/* Pagination (visual only) */}
			<div className="ul-pagination mb-4">
				<ul>
					<li>
						<a href="#">
							<i className="flaticon-left-arrow" />
						</a>
					</li>
					<li className="pages">
						<a href="#" className="active">
							01
						</a>
						<a href="#">02</a>
						<a href="#">03</a>
						<a href="#">04</a>
						<a href="#">05</a>
					</li>
					<li>
						<a href="#">
							<i className="flaticon-arrow-point-to-right" />
						</a>
					</li>
				</ul>
			</div>

			<ToastContainer />
			<Footer />

			{/* ✅ Replaced modal here */}
			<AddToCartModal
				product={selectedProduct}
				open={confirmOpen}
				onClose={closeConfirm}
				onConfirm={handleConfirmAdd}
				chosenSize={chosenSize}
				setChosenSize={setChosenSize}
				qty={qty}
				setQty={setQty}
				sizeOptions={["S", "M", "L", "XL", "XXL"]}
			/>

			{/* ensure quick button is always clickable */}
			<style>{`
        .ul-product-card-wrap { position: relative; }
        .ul-quick-add-btn {
          position: absolute; right: 12px; bottom: 12px; z-index: 5;
          width: 40px; height: 40px; border: 0; border-radius: 999px;
          background: #ef2853; color: #fff; display: grid; place-items: center;
          cursor: pointer; opacity: .92;
        }
        .ul-quick-add-btn:hover { opacity: 1; }
        .ul-product .ul-product-actions, .ul-product .ul-product-img::after { pointer-events: none; }
      `}</style>
		</>
	);
};

// ✅ ProductCard (unchanged)
export const ProductCard = ({ product, onAddClick, onQuickAdd }) => {
	const {
		id,
		price,
		// discount,
		oldPrice,
		images,
		title,
		category,
		detailsUrl,
		categoryUrl,
	} = product;
	const navigate = useNavigate();

	return (
		<div className="col">
			<div
				className=" ul-product-card-wrap relative"
				onClick={() => navigate(`/shopdetails/${id}`)}
				style={{
					cursor: "pointer",
					width: "100%",
					borderRadius: "2px",
					overflow: "hidden",
					background: "#fff",
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
				}}
			>
				{/* IMAGE SECTION (80% height) */}
				<div
					className="product-image-wrapper"
					style={{
						position: "relative",

						width: "100%",
					}}
				>
					{/* NEW IN TAG */}
					<span
						style={{
							position: "absolute",
							top: "10px",
							left: "10px",
							background: "#FFA500",
							color: "#000",
							padding: "4px 8px",
							fontSize: "10px",
							fontWeight: "bold",
							borderRadius: "4px",
							textTransform: "uppercase",
							zIndex: 2,
						}}
					>
						New In
					</span>

					<img
						src={images[0]}
						alt={title}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "top center",
						}}
					/>
				</div>

				{/* LIGHT BORDER (40px width centered) */}
				<div
					style={{
						width: "50px",
						height: "2px",
						background: "#ef2853",

						marginBottom: "20px",
					}}
				></div>

				{/* PRODUCT NAME + ADD BUTTON */}
				<div
					className="flex items-center justify-between px-3"
					style={{ marginTop: "-6px" }}
				>
					<h4 className="ul-product-title text-sm font-semibold">
						{title.length > 15
							? title.substring(0, 15) + "..."
							: title}
					</h4>
				</div>

				{/* PRICE + DISCOUNT */}
				<div className="px-3 pb-3 mt-2">
					{(() => {
						const numericPrice = Number(
							price?.toString().replace(/\D/g, "")
						);
						const numericOldPrice = Number(
							oldPrice?.toString().replace(/\D/g, "")
						);

						const discount =
							numericOldPrice && numericPrice
								? Math.round(
										((numericOldPrice -
											numericPrice) /
											numericOldPrice) *
											100
								  )
								: 0;

						return (
							<div className="flex items-center gap-2 text-sm font-medium">
								{/* Price */}
								<span className="text-black font-semibold text-base">
									Rs {numericPrice}
								</span>

								{/* Old Price */}
								{numericOldPrice > numericPrice && (
									<span className="text-gray-400 line-through text-xs">
										Rs {numericOldPrice}
									</span>
								)}

								{/* Discount */}
								{discount > 0 && (
									<span
										style={{
											background: "#f4f4f4",
											color: "#333",
											padding: "1px 4px",
											fontSize: "8px",
											fontWeight: 600,
											borderRadius: "12px",
											border: "1px solid #e0e0e0",
											whiteSpace: "nowrap",
										}}
									>
										{discount}% OFF
									</span>
								)}
							</div>
						);
					})()}
				</div>
			</div>
		</div>
	);
};
