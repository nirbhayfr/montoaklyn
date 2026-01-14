import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import { createOrder } from "../api/orders";
import { decryptData } from "../crypto";
import { api } from "../api/api";

export const CheckoutPage = () => {
	const navigate = useNavigate();
	// const SCRIPT_URL =
	// 	"https://script.google.com/macros/s/AKfycbwb5APRylVF9qNBPNyfMT80KyL3WC6km1lvLErTE8-Oxb8vuvM1zQLby8ZdQYNH34Wy/exec";
	const discountData =
		JSON.parse(localStorage.getItem("appliedDiscount")) || {};

	const { extraOff = 0 } = discountData;

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

	const subTotal = cart
		.reduce(
			(acc, item) => acc + parseFloat(item.price) * item.quantity,
			0
		)
		.toFixed(2);

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
				text: "Please fill out all required fields.",
				type: "error",
			});
			return;
		}

		if (!cart.length) {
			setMessage({
				text: "Your cart is empty.",
				type: "error",
			});
			return;
		}

		const storedUser = localStorage.getItem("user");
		if (!storedUser) {
			navigate("/login");
			return;
		}

		const user = decryptData(storedUser);

		const payload = {
			customerId: user._id,
			products: cart.map((item) => ({
				product: item._id,
				quantity: item.quantity,
				size: item.size,
			})),
			shippingAddress: {
				fullName: `${billing.firstName} ${billing.lastName}`,
				phone: billing.phone,
				addressLine: billing.address1,
				landmark: billing.address2 || "",
				city: billing.city,
				state: billing.state,
				postalCode: billing.zipcode,
			},
			discount: extraOff,
		};

		// try {
		// 	const response = await api.post("/create-payment", {
		// 		amount: subTotal * 100,
		// 	});
		// 	console.log(response.data.checkoutPageUrl);
		// 	window.location.href = response.data.checkoutPageUrl;
		// } catch (error) {
		// 	console.error(error);
		// }

		try {
			await createOrder(payload);

			setMessage({
				text: "Order placed successfully!",
				type: "success",
			});

			setTimeout(() => {
				localStorage.removeItem("cart");
				localStorage.removeItem("appliedDiscount");
				navigate("/order-confirmed");
			}, 1200);
		} catch (err) {
			console.error(err);
			setMessage({
				text: err.response?.data?.message || "Order failed",
				type: "error",
			});
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen">
			<Header />

			<main className="ul-container py-2 -mt-6">
				<h2 className="ul-breadcrumb-title text-2xl font-semibold mb-6">
					Checkout
				</h2>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Billing form */}
					<section className="ul-checkout-form lg:col-span-2 bg-white border border-gray-200 rounded-md p-6">
						<h3 className="ul-checkout-title text-lg font-semibold mb-4">
							Billing Details
						</h3>

						<div className="row row-cols-lg-2 row-cols-1 ul-bs-row gap-y-4">
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
									<label className="text-sm font-medium mb-1 block">
										{label}
									</label>
									<input
										type="text"
										value={billing[field]}
										onChange={(e) =>
											handleChange(
												field,
												e.target.value
											)
										}
										className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
									/>
								</div>
							))}
						</div>

						<button
							type="button"
							onClick={handlePlaceOrder}
							className="ul-checkout-form-btn mt-6 bg-black text-white px-6 py-3 rounded text-sm font-medium hover:bg-gray-900"
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
					<aside className="ul-checkout-bill-summary bg-white border border-gray-200 rounded-md p-3 h-fit mb-3">
						<h4 className="text-lg font-semibold mb-4">
							Your Order
						</h4>

						<div className="space-y-2">
							{cart.map((item, i) => (
								<div
									key={i}
									className="flex justify-between text-sm text-gray-700"
								>
									<span>
										{item.title} (x{item.quantity}
										)
									</span>
									<span>₹{item.price}</span>
								</div>
							))}
						</div>

						<hr className="my-4" />

						<div className="flex justify-between font-semibold text-base">
							<span>Total</span>
							<span>₹{subTotal - extraOff}</span>
						</div>
					</aside>
				</div>
			</main>

			<Footer />
		</div>
	);
};
