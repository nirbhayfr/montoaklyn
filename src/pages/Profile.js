import { useNavigate } from "react-router-dom";
import { decryptData } from "../crypto";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import { useEffect, useState } from "react";

import { api } from "../api/api";

const formatDate = (isoDate) => {
	if (!isoDate) return "-";

	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(isoDate));
};

function Profile() {
	const user = decryptData(localStorage.getItem("user"));
	const navigate = useNavigate();

	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await api.get(`/order/${user._id}`);
				setOrders(res.data.data || []);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [user._id]);

	return (
		<>
			<Header />
			<div className="flex items-center justify-center px-4 py-8 -mt-16">
				<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-black">
					{/* Header */}
					<div className="flex items-center gap-4 border-b border-gray-300 pb-4">
						<div className="h-16 w-16 rounded-full bg-black flex items-center justify-center text-white text-xl font-semibold">
							{user.name?.charAt(0)}
						</div>

						<div>
							<h2 className="text-xl font-semibold">
								{user.name}
							</h2>
							<p className="text-sm text-gray-600">
								{user.role}
							</p>
						</div>
					</div>

					{/* Details */}
					<div className="mt-6 space-y-3 text-sm">
						<div className="flex justify-between border-b border-gray-200 pb-2">
							<span className="text-gray-600">Email</span>
							<span className="font-medium">
								{user.email}
							</span>
						</div>

						<div className="flex justify-between">
							<span className="text-gray-600">
								Member Since
							</span>
							<span className="font-medium">
								{formatDate(user.createdAt)}
							</span>
						</div>
					</div>

					{/* Actions */}
					{/* Actions */}
					<div className="mt-6 space-y-2">
						{user.role === "ADMIN" && (
							<button
								className="w-full border border-black py-2 rounded-lg bg-gray-800 text-white transition"
								onClick={() => navigate("/admin/home")}
							>
								Visit Admin Panel
							</button>
						)}

						<button
							className="w-full border border-black py-2 rounded-lg bg-black text-white transition"
							onClick={() => {
								localStorage.removeItem("user");
								navigate("/login", { replace: true });
							}}
						>
							Logout
						</button>
					</div>
				</div>
			</div>

			{/* ORDERS LIST */}
			<div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
				<h3 className="text-lg font-semibold border-b pb-3">
					My Orders
				</h3>

				{loading && (
					<p className="text-sm text-gray-500 mt-4">
						Loading orders...
					</p>
				)}

				{!loading && orders.length === 0 && (
					<p className="text-sm text-gray-500 mt-4">
						You have not placed any orders yet.
					</p>
				)}

				<div className="mt-4 space-y-3">
					{orders.map((order) => (
						<div
							key={order._id}
							className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2 hover:bg-gray-50 transition"
						>
							{/* Order header */}
							<div className="flex justify-between items-center">
								<div>
									<p className="text-sm font-medium">
										Order #{order._id.slice(-6)}
									</p>
									<p className="text-xs text-gray-500">
										{formatDate(order.createdAt)}
									</p>
								</div>

								<div className="text-right">
									<p className="text-sm font-semibold">
										₹
										{order.totalAmount.toFixed(2)}
									</p>
									<span
										className={`text-xs px-2 py-1 rounded-full ${
											order.isCompleted
												? "bg-black text-white"
												: "border border-black text-black"
										}`}
									>
										{order.isCompleted
											? "Completed"
											: "Pending"}
									</span>
								</div>
							</div>

							{/* Products */}
							<div className="mt-2 space-y-6">
								{order.products.map((p, idx) => (
									<div
										key={idx}
										className="flex items-center gap-2"
									>
										<div className="size-10 flex justify-center items-center">
											{p.product
												?.images?.[0] && (
												<img
													src={
														p.product
															.images[0]
													}
													alt={
														p.product
															.title
													}
													className="size-10 object-cover rounded object-top"
												/>
											)}
										</div>
										<p className="text-sm text-gray-700">
											{p.product?.title
												.split(" ")
												.slice(0, 4)
												.join(" ")}{" "}
											x {p.quantity}
										</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Profile;
