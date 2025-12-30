import { useEffect, useState } from "react";

import { completeOrder, fetchAllOrders } from "../../api/orders";
import { toast } from "sonner";

const formatDate = (isoDate) => {
	if (!isoDate) return "-";
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(isoDate));
};

export default function AdminOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState("ALL"); // ALL | COMPLETED | PENDING

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			const res = await fetchAllOrders();
			setOrders(res.data.data || []);
		} catch (err) {
			console.error("Failed to fetch orders", err);
		} finally {
			setLoading(false);
		}
	};

	const markAsCompleted = async (orderId) => {
		try {
			await completeOrder(orderId);
			setOrders((prev) =>
				prev.map((o) =>
					o._id === orderId ? { ...o, isCompleted: true } : o
				)
			);
			toast.success("Marked as complete.");
		} catch (err) {
			console.error("Failed to update order", err);
		}
	};

	if (loading) {
		return <p className="text-sm text-gray-500">Loading orders...</p>;
	}

	const filteredOrders = [...orders]
		.filter((order) => {
			if (filter === "COMPLETED") return order.isCompleted;
			if (filter === "PENDING") return !order.isCompleted;
			return true;
		})
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return (
		<div className="p-6 space-y-6">
			<h2 className="text-xl font-semibold">All Orders</h2>

			<div className="flex gap-2">
				<button
					onClick={() => setFilter("ALL")}
					className={`px-3 py-1 text-sm rounded border ${
						filter === "ALL"
							? "bg-black text-white border-black"
							: "border-gray-300"
					}`}
				>
					All
				</button>

				<button
					onClick={() => setFilter("PENDING")}
					className={`px-3 py-1 text-sm rounded border ${
						filter === "PENDING"
							? "bg-black text-white border-black"
							: "border-gray-300"
					}`}
				>
					Pending
				</button>

				<button
					onClick={() => setFilter("COMPLETED")}
					className={`px-3 py-1 text-sm rounded border ${
						filter === "COMPLETED"
							? "bg-black text-white border-black"
							: "border-gray-300"
					}`}
				>
					Completed
				</button>
			</div>

			{filteredOrders.map((order) => (
				<div
					key={order._id}
					className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
				>
					{/* ORDER HEADER */}
					<div className="flex justify-between items-center border-b pb-3">
						<div>
							<p className="text-sm font-semibold">
								Order #{order._id}
							</p>
							<p className="text-xs text-gray-500">
								Placed on {formatDate(order.createdAt)}
							</p>
						</div>

						<div className="text-right">
							<p className="font-semibold">
								₹{order.totalAmount}
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

					{/* USER */}
					<div className="mt-3 text-sm">
						<p>
							<span className="font-medium">User ID:</span>{" "}
							{order.user}
						</p>
					</div>

					{/* SHIPPING ADDRESS */}
					<div className="mt-3 text-sm border rounded p-3">
						<p className="font-medium mb-1">
							Shipping Address
						</p>
						<p>{order.shippingAddress.fullName}</p>
						<p>{order.shippingAddress.phone}</p>
						<p>
							{order.shippingAddress.addressLine}
							{order.shippingAddress.landmark &&
								`, ${order.shippingAddress.landmark}`}
						</p>
						<p>
							{order.shippingAddress.city},{" "}
							{order.shippingAddress.state} –{" "}
							{order.shippingAddress.postalCode}
						</p>
					</div>

					{/* PRODUCTS */}
					<div className="mt-4">
						<p className="font-medium mb-2">Products</p>

						<div className="space-y-2">
							{order.products.map((p, idx) => (
								<div
									key={idx}
									className="flex gap-3 border rounded p-2"
								>
									{p.images?.[0] && (
										<img
											src={p.images[0]}
											alt={p.title}
											className="w-16 h-16 object-cover rounded flex-shrink-0 object-top"
										/>
									)}

									<div className="text-sm">
										<p className="font-medium">
											{p.title}
										</p>
										<p>Price: ₹{p.price}</p>
										<p>Quantity: {p.quantity}</p>
										<p>Subtotal: ₹{p.subtotal}</p>
										<p className="text-xs text-gray-500">
											Product ID: {p.product}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* ACTION */}
					{!order.isCompleted && (
						<div className="mt-4">
							<button
								onClick={() =>
									markAsCompleted(order._id)
								}
								className="border border-black px-4 py-2 rounded text-sm bg-black text-white transition"
							>
								Mark as Complete
							</button>
						</div>
					)}
				</div>
			))}
		</div>
	);
}
