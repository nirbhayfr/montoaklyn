import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";

export const CheckoutPage = () => {
	const navigate = useNavigate();
	const SCRIPT_URL =
		"https://script.google.com/macros/s/AKfycbwb5APRylVF9qNBPNyfMT80KyL3WC6km1lvLErTE8-Oxb8vuvM1zQLby8ZdQYNH34Wy/exec";

	const [billing, setBilling] = useState({
		firstName: "",
		lastName: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zipcode: "",
		country: "",
		phone: "",
		email: "rddas6363@gmail.com",
	});

	const [message, setMessage] = useState({ text: "", type: "" });

	const cart = JSON.parse(localStorage.getItem("cart") || "[]");

	const handleChange = (field, value) =>
		setBilling((prev) => ({ ...prev, [field]: value }));

	const handlePlaceOrder = async () => {
		const requiredFields = [
			"firstName",
			"lastName",
			"address1",
			"city",
			"state",
			"zipcode",
			"country",
			"phone",
		];

		const emptyFields = requiredFields.filter((f) => !billing[f].trim());

		if (emptyFields.length > 0) {
			setMessage({
				text: "⚠️ Please fill out all required fields before placing your order.",
				type: "error",
			});
			return;
		}

		if (!cart.length) {
			setMessage({
				text: "🛒 Your cart is empty.",
				type: "error",
			});
			return;
		}

		const total = cart.reduce(
			(acc, item) => acc + parseFloat(item.price) * item.quantity,
			0
		);

		const orderData = {
			order_id: Math.floor(Math.random() * 1000000),
			customer_name: `${billing.firstName} ${billing.lastName}`,
			email: billing.email,
			phone: billing.phone,
			address_line1: billing.address1,
			address_line2: billing.address2,
			city: billing.city,
			state: billing.state,
			zipcode: billing.zipcode,
			country: billing.country,
			cart,
			total: total.toFixed(2),
		};

		try {
			await fetch(SCRIPT_URL, {
				method: "POST",
				mode: "no-cors",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(orderData),
			});

			setMessage({
				text: "✅ Order placed successfully! Redirecting...",
				type: "success",
			});

			setTimeout(() => {
				localStorage.removeItem("cart");
				navigate("/order-confirmed");
			}, 1500);
		} catch (err) {
			console.error("Error:", err);
			setMessage({
				text: "❌ Something went wrong. Please try again.",
				type: "error",
			});
		}
	};

	return (
		<div>
			<Header />

			<main className="ul-container">
				<h2 className="ul-breadcrumb-title">Checkout</h2>

				{/* Billing form */}
				<section className="ul-checkout-form">
					<h3 className="ul-checkout-title">Billing Details</h3>
					<div className="row row-cols-lg-2 row-cols-1 ul-bs-row">
						{[
							["First Name*", "firstName"],
							["Last Name*", "lastName"],
							["Street Address*", "address1"],
							["Address 2", "address2"],
							["City*", "city"],
							["State*", "state"],
							["Zip Code*", "zipcode"],
							["Country*", "country"],
							["Phone*", "phone"],
						].map(([label, field]) => (
							<div key={field} className="form-group">
								<label>{label}</label>
								<input
									type="text"
									value={billing[field]}
									onChange={(e) =>
										handleChange(
											field,
											e.target.value
										)
									}
								/>
							</div>
						))}
					</div>
					<br />

					<button
						type="button"
						onClick={handlePlaceOrder}
						className="ul-checkout-form-btn"
					>
						Place Your Order
					</button>

					{/* Inline message */}
					{message.text && (
						<p
							className={`mt-3 text-sm ${
								message.type === "error"
									? "text-red-500"
									: "text-green-600 font-medium"
							}`}
						>
							{message.text}
						</p>
					)}
				</section>

				{/* Order summary */}
				<aside className="ul-checkout-bill-summary">
					<h4>Your Order</h4>
					{cart.map((item, i) => (
						<div key={i} className="single-row">
							<span>
								{item.title} (x{item.quantity})
							</span>
							<span>{item.price}</span>
						</div>
					))}
					<div className="ul-checkout-bill-summary-footer ul-checkout-bill-summary-header">
						<span className="left">Total</span>
						<span className="right">
							Rs{" "}
							{cart
								.reduce(
									(acc, item) =>
										acc +
										parseFloat(item.price) *
											item.quantity,
									0
								)
								.toFixed(2)}
						</span>
					</div>
				</aside>
			</main>

			<Footer />
		</div>
	);
};
