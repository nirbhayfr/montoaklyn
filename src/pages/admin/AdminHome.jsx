import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link } from "react-router-dom";

export default function AdminHome() {
	const [totalCategories, setTotalCategories] = useState(0);
	const [totalProducts, setTotalProducts] = useState(0);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchCounts();
	}, []);

	const fetchCounts = async () => {
		try {
			const catRes = await api.get("/category");
			const prodRes = await api.get("/product");

			setProducts(prodRes.data);

			setTotalCategories(catRes.data.length);
			setTotalProducts(prodRes.data.length);
		} catch (err) {
			console.error("Error fetching dashboard data", err);
		}
	};

	const activeProducts = products.filter((p) => p.inStock).length;
	const inactiveProducts = totalProducts - activeProducts;

	return (
		<div>
			<h2 className="page-title">Admin Dashboard</h2>
			<div className="page-title-underline"></div>

			<div className="dashboard-actions">
				<button
					className="dash-btn"
					onClick={() =>
						(window.location.href = "/admin/category")
					}
				>
					Manage Categories
				</button>

				<button
					className="dash-btn"
					onClick={() =>
						(window.location.href = "/admin/products")
					}
				>
					Manage Products
				</button>
				<Link to="/" className="dash-btn hover:text-white">
					Visit Website Home
				</Link>
			</div>

			{/* STAT CARDS */}
			<div className="dashboard-cards">
				<div className="dashboard-card">
					<div className="dashboard-card-title">
						Total Products
					</div>
					<div className="dashboard-card-value">
						{totalProducts}
					</div>
					<div className="dashboard-card-sub">
						{`Active: ${activeProducts} / Inactive: ${inactiveProducts}`}
					</div>
				</div>

				<div className="dashboard-card">
					<div className="dashboard-card-title">
						Total Categories
					</div>
					<div className="dashboard-card-value">
						{totalCategories}
					</div>
					<div className="dashboard-card-sub">
						{`Active: ${totalCategories} / Inactive: 0`}
					</div>
				</div>

				<div className="dashboard-card">
					<div className="dashboard-card-title">
						Active Orders
					</div>
					<div className="dashboard-card-value">—</div>
					<div className="dashboard-card-sub">
						Pending / Completed
					</div>
				</div>
			</div>

			<h3 className="recent-title">Recently Added Products</h3>
			<p className="recent-empty">No products found.</p>
		</div>
	);
}
