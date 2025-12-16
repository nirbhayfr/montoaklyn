// src/pages/CartPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/index/Header";
import {
	updateQuantity,
	removeItem,
	getCartTotal,
	resetCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../components/index/Footer";

/* ------- helpers ------- */
const parsePrice = (p) => {
	const n = Number(String(p).replace(/[^0-9.]/g, ""));
	return Number.isFinite(n) ? n : 0;
};
const pctFromDiscount = (discount) => {
	const m = String(discount || "").match(/(\d+)\s*%/);
	return m ? Number(m[1]) : 0;
};

export const CartPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart.data);
	console.log(cart);

	// local derived totals
	const { subtotal, totalMRP, totalSavings } = useMemo(() => {
		let subtotalAcc = 0;
		let mrpAcc = 0;

		for (const item of cart) {
			const unit = parsePrice(item.price);
			const qty = Number(item.quantity) || 1;
			const pct = pctFromDiscount(item.discount);
			const mrpUnit = pct ? unit / (1 - pct / 100) : unit;

			subtotalAcc += unit * qty;
			mrpAcc += mrpUnit * qty;
		}
		const save = Math.max(0, Math.round(mrpAcc - subtotalAcc));
		return {
			subtotal: Math.round(subtotalAcc),
			totalMRP: Math.round(mrpAcc),
			totalSavings: save,
		};
	}, [cart]);

	const shipping = cart.length > 0 ? 0 : 0; // flat demo shipping
	const grandTotal = subtotal + shipping;

	// keep original getCartTotal behavior if you rely on it elsewhere
	useEffect(() => {
		dispatch(getCartTotal());
	}, [cart, dispatch]);

	/* ------- handlers ------- */
	const handleIncrease = (id) => {
		const product = cart.find((i) => i.id === id);
		if (product) {
			dispatch(
				updateQuantity({
					id,
					quantity: Number(product.quantity) + 1,
				})
			);
		}
	};

	const handleDecrease = (id) => {
		const product = cart.find((i) => i.id === id);
		if (product && product.quantity > 1) {
			dispatch(
				updateQuantity({
					id,
					quantity: Number(product.quantity) - 1,
				})
			);
		}
	};

	const handleRemove = (id) => dispatch(removeItem({ id }));
	const handleResetCart = () => dispatch(resetCart());

	return (
		<div>
			<Header />

			<main>
				{/* ===== HERO (breadcrumb) ===== */}
				<div className="ul-container">
					<div className="cart-hero">
						<h2
							className="ul-breadcrumb-title"
							style={{ margin: 0 }}
						>
							My Cart
						</h2>
						<div
							className="ul-breadcrumb-nav"
							style={{ marginTop: 6 }}
						>
							<a href="/">
								<i className="flaticon-home" /> Home
							</a>
							<i
								className="flaticon-arrow-point-to-right"
								aria-hidden="true"
							/>
							<span
								className="current-page"
								aria-current="page"
							>
								Cart
							</span>
						</div>
					</div>
				</div>

				{/* ===== Savings banner ===== */}
				{/* {totalSavings > 0 && (
          <div className="ul-container">
            <div className="cart-save-banner">
              <span className="dot" />
              You’ll save <span style={{ width: 4 }} />
              ₹{totalSavings.toLocaleString()}
              <span style={{ width: 4 }} /> on this order!
            </div>
          </div>
        )} */}

				{/* ===== List + totals area ===== */}
				<div className="ul-container" style={{ marginBottom: 96 }}>
					{/* left: product list */}
					<div className="cart-list">
						{cart.length === 0 && (
							<div
								className="cart-card"
								style={{ textAlign: "center" }}
							>
								Your cart is empty
							</div>
						)}

						{cart.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								onIncrease={() =>
									handleIncrease(item.id)
								}
								onDecrease={() =>
									handleDecrease(item.id)
								}
								onRemove={() => handleRemove(item.id)}
							/>
						))}

						{/* reset button (kept from your functionality) */}
						{cart.length > 0 && (
							<div
								style={{
									marginTop: 10,
									display: "flex",
									gap: 10,
								}}
							>
								<button
									className="ul-cart-update-cart-btn"
									onClick={handleResetCart}
								>
									Reset Cart
								</button>
							</div>
						)}
					</div>

					{/* totals card (small, like right panel) */}
					{cart.length > 0 && (
						<div
							className="cart-card"
							style={{
								marginTop: 12,
								borderStyle: "dashed",
							}}
						>
							<h3
								className="ul-cart-expense-overview-title"
								style={{ marginBottom: 10 }}
							>
								Price Details
							</h3>

							<div className="middle">
								<div
									className="single-row"
									style={{
										display: "flex",
										justifyContent:
											"space-between",
									}}
								>
									<span className="inner-title">
										MRP (incl. taxes)
									</span>
									<span className="number">
										₹{totalMRP.toLocaleString()}
									</span>
								</div>

								<div
									className="single-row"
									style={{
										display: "flex",
										justifyContent:
											"space-between",
									}}
								>
									<span className="inner-title">
										Savings
									</span>
									<span
										className="number"
										style={{
											color: "#16a34a",
											fontWeight: 700,
										}}
									>
										− ₹
										{totalSavings.toLocaleString()}
									</span>
								</div>

								<div
									className="single-row"
									style={{
										display: "flex",
										justifyContent:
											"space-between",
									}}
								>
									<span className="inner-title">
										Subtotal
									</span>
									<span className="number">
										₹{subtotal.toLocaleString()}
									</span>
								</div>

								<div
									className="single-row"
									style={{
										display: "flex",
										justifyContent:
											"space-between",
									}}
								>
									<span className="inner-title">
										Shipping
									</span>
									<span className="number">
										{shipping === 0
											? "Free"
											: `₹${shipping.toLocaleString()}`}
									</span>
								</div>
							</div>

							<div
								className="bottom"
								style={{
									borderTop: "1px dashed #e5e7eb",
									marginTop: 10,
									paddingTop: 10,
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<span
									className="inner-title"
									style={{ fontWeight: 800 }}
								>
									Total Payable
								</span>
								<span
									className="number"
									style={{ fontWeight: 800 }}
								>
									₹{grandTotal.toLocaleString()}
								</span>
							</div>
							<div>
								<button
									onClick={() =>
										navigate("/checkout")
									}
									style={{
										display: "block",
										width: "100%",
										background:
											"linear-gradient(90deg, #ff5a5f, #ff8a00)",
										color: "white",
										fontWeight: "700",
										fontSize: "16px",
										border: "none",
										borderRadius: "8px",
										padding: "14px 0",
										cursor: "pointer",

										transition: "0.3s ease",
										paddingBottom: "20px",
										marginBottom: "40px",
										marginTop: "25px",
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.background =
											"linear-gradient(90deg, #ff8a00, #ff5a5f)")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.background =
											"linear-gradient(90deg, #ff5a5f, #ff8a00)")
									}
								>
									Proceed to Checkout
								</button>
							</div>
						</div>
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
};

/* =========================================================
   Compact Flipkart-style Cart Item card (UI only)
   ========================================================= */
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
	const { title, images, price, quantity, size, color, discount, onSale } =
		item;

	const unit = parsePrice(price);
	const qty = Number(quantity) || 1;
	const pct = pctFromDiscount(discount);
	const mrpUnit = pct ? unit / (1 - pct / 100) : unit;

	// const imgSrc = "/" + String(images[0] || "").replace(/^\/+/, "");

	// ETA text
	const eta = new Date();
	eta.setDate(eta.getDate() + 7);
	const etaStr = eta.toLocaleDateString("en-IN", {
		weekday: "short",
		day: "numeric",
		month: "short",
	});

	return (
		<article className="cart-card">
			{/* <div className="cart-card-head">
        {onSale && <span className="badge-deal">SUPER DEALS</span>}
      </div> */}
			{/* {images[0]} */}
			<div className="cart-row">
				{/* image */}
				<a href="/shopdetails" aria-label={title}>
					<img
						className="cart-img"
						src={images[0] || "/products/placeholder.png"} // fallback image
						alt={title || "Product image"}
					/>
				</a>

				{/* details */}
				<div>
					<a href="/shopdetails" className="cart-title">
						{title}
					</a>

					<div className="cart-meta">
						{size && (
							<>
								Size: <b>{size}</b>
							</>
						)}
						{size && color ? " • " : ""}
						{color && (
							<>
								Color:{" "}
								<b
									style={{
										textTransform: "capitalize",
									}}
								>
									{color}
								</b>
							</>
						)}
					</div>

					<div className="qty-line">
						<span
							className="cart-meta"
							style={{ marginRight: 4 }}
						>
							Qty:
						</span>
						<div className="qty-pill">
							<button
								type="button"
								onClick={onDecrease}
								aria-label="Decrease"
							>
								−
							</button>
							<input readOnly value={qty} />
							<button
								type="button"
								onClick={onIncrease}
								aria-label="Increase"
							>
								+
							</button>
						</div>
					</div>

					<div className="cart-meta">
						Delivery by <b>{etaStr}</b>
					</div>
				</div>

				{/* right prices */}
				<div className="price-box">
					{pct > 0 && <span className="disc-chip">-{pct}%</span>}
					<div>
						<span className="price-now">
							₹{Math.round(unit).toLocaleString()}
						</span>
						{pct > 0 && (
							<span className="price-mrp">
								₹{Math.round(mrpUnit).toLocaleString()}
							</span>
						)}
					</div>
					<div className="subtotal">
						Subtotal:{" "}
						<b>₹{Math.round(unit * qty).toLocaleString()}</b>
					</div>
				</div>
			</div>

			{/* actions row (functionality unchanged) */}
			<div className="card-actions">
				<button title="Save for later">
					<i className="flaticon-bookmark" /> Save for later
				</button>
				<button onClick={onRemove}>
					<i className="flaticon-close" /> Remove
				</button>
				<button
					onClick={() => (window.location.href = "/checkout")}
				>
					<i className="flaticon-bolt" /> Buy this now
				</button>
			</div>
		</article>
	);
};

export default CartPage;
