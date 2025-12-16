// ShopPage.jsx — One-line Flipkart-style filter bar + Add-to-Cart confirm dialog
// Exports (named): products, ShopPage, ProductCard

import React, { useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategorySectionShop from "../components/index/main/categoryshopcircle";

import { fetchProducts, fetchCategories } from "../api/productService";

const parsePrice = (p) => {
	if (typeof p === "number") return p;
	const n = Number(String(p).replace(/[^0-9.]/g, ""));
	return Number.isFinite(n) ? n : 0;
};

// ---------------- AddToCartModal (unchanged) ----------------
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
					<button className="ul-modal-close" onClick={onClose}>
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
							<button onClick={() => onQtyChange(qty + 1)}>
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

// ---------------------- MAIN SHOP PAGE ----------------------
export const ShopPage = () => {
	const [category, setCategory] = useState("");
	const [priceRange, setPriceRange] = useState("");
	const [sortBy, setSortBy] = useState("relevance");
	const [status, setStatus] = useState("");

	const [apiProducts, setApiProducts] = useState([]);
	const [apiCategories, setApiCategories] = useState([]);

	// ⭐ Fetch products
	useEffect(() => {
		fetchProducts()
			.then((res) => {
				console.log("API PRODUCTS:", res.data);
				setApiProducts(res.data);
			})
			.catch((err) => console.error("API ERROR:", err));
	}, []);

	// ⭐ Fetch categories
	useEffect(() => {
		fetchCategories()
			.then((res) => {
				console.log("CATEGORIES:", res.data);
				setApiCategories(res.data);
			})
			.catch((err) => console.error("Category API error:", err));
	}, []);

	// modal state
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [chosenSize, setChosenSize] = useState("M");
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();

	const openConfirm = (product) => {
		setSelectedProduct(product);
		setChosenSize("M");
		setQty(1);
		setConfirmOpen(true);
	};

	const closeConfirm = () => {
		setConfirmOpen(false);
		setSelectedProduct(null);
	};

	const handleConfirmAdd = () => {
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
			autoClose: 2000,
			theme: "colored",
		});
	};

	const handleQuickAdd = (product, e) => {
		e?.preventDefault();
		e?.stopPropagation();

		dispatch(addToCart({ ...product, quantity: 1 }));
		dispatch(getCartTotal());

		toast.success(`${product.title} added to cart`, {
			autoClose: 1500,
			theme: "colored",
		});
	};

	// ⭐ Categories list from API
	const categories = apiCategories.map((c) => c.name);

	const priceRanges = [
		{ key: "", label: "Any Price" },
		{ key: "0-500", label: "Under ₹500" },
		{ key: "500-1000", label: "₹500 – ₹1000" },
	];

	// ⭐ Filtering
	const filtered = useMemo(() => {
		let list = [...apiProducts];

		if (category)
			list = list.filter(
				(p) => (p.category?.name || "Others") === category
			);

		if (status === "in_stock") list = list.filter((p) => p.inStock);

		if (priceRange) {
			let [min, max] = priceRange.split("-");
			min = Number(min);
			max = Number(max);
			list = list.filter((p) => p.price >= min && p.price <= max);
		}

		switch (sortBy) {
			case "price_asc":
				list.sort((a, b) => a.price - b.price);
				break;
			case "price_desc":
				list.sort((a, b) => b.price - a.price);
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
	}, [apiProducts, category, priceRange, sortBy, status]);

	return (
		<>
			<Header />
			<CategorySectionShop
				categories={apiCategories}
				setCategory={setCategory}
			/>

			{/* FILTER BAR */}
			<section className="ul-container" style={{ marginTop: 20 }}>
				<div className="ul-toolbar-inline">
					{/* Category Dropdown (Now REAL categories) */}
					<select
						className="ul-pill ul-select ul-control"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="">All Categories</option>
						{categories.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>

					<select
						className="ul-pill ul-select ul-control"
						value={priceRange}
						onChange={(e) => setPriceRange(e.target.value)}
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
						{apiProducts.length}
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
							key={product._id}
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

			<ToastContainer />
			<Footer />

			<AddToCartModal
				product={selectedProduct}
				open={confirmOpen}
				onClose={closeConfirm}
				onConfirm={handleConfirmAdd}
				size={chosenSize}
				qty={qty}
				onSizeChange={setChosenSize}
				onQtyChange={setQty}
			/>
		</>
	);
};

// ---------------------- PRODUCT CARD ----------------------
export const ProductCard = ({ product, onAddClick, onQuickAdd }) => {
	const { _id, price, oldPrice, images, title } = product;
	const navigate = useNavigate();

	return (
		<div className="col">
			<div
				className="ul-product-card-wrap"
				onClick={() => navigate(`/shopdetails/${_id}`)}
				style={{
					cursor: "pointer",
					width: "100%",
					background: "#fff",
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
				}}
			>
				<div className="product-image-wrapper">
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
						src={images?.[0]}
						alt={title}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</div>

				<div
					style={{
						width: "50px",
						height: "2px",
						background: "#ef2853",
						marginBottom: "20px",
					}}
				/>

				<div className="flex items-center justify-between px-3">
					<h4 className="ul-product-title text-sm font-semibold">
						{title?.length > 15
							? title.substring(0, 15) + "..."
							: title}
					</h4>
				</div>

				<div className="px-3 pb-3 mt-2">
					<span className="text-black font-semibold text-base">
						Rs {price}
					</span>
				</div>
			</div>
		</div>
	);
};
