import { useEffect, useMemo, useState } from "react";
import Footer from "../components/index/Footer";
import { Header } from "../components/index/Header";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import ShopBanner from "../components/shop/ShopBanner";
import ShopProducts from "../components/shop/ShopProducts";
import { useProducts } from "../hooks/useProducts";
import { api } from "../api/api";

function NewShopPage() {
	// source data
	const products = useProducts();

	// UI state
	const [filters, setFilters] = useState({
		category: null,
		sort: null, // "PRICE_ASC"
	});

	const [categories, setCategories] = useState([]);
	const [showFilter, setShowFilter] = useState(false);

	// fetch categories once
	useEffect(() => {
		const fetchCategories = async () => {
			const res = await api.get("/category");
			setCategories(res.data);
		};

		fetchCategories();
	}, []);

	// derived products (no extra state)
	const filteredProducts = useMemo(() => {
		if (!products.length) return [];

		let result = [...products];

		if (filters.category) {
			result = result.filter(
				(p) => p.category.name === filters.category
			);
		}

		if (filters.sort === "PRICE_ASC") {
			result.sort((a, b) => a.price - b.price);
		}

		return result;
	}, [products, filters]);

	// handlers
	const toggleSort = () => {
		setFilters((prev) => ({
			...prev,
			sort: prev.sort ? null : "PRICE_ASC",
		}));
	};

	const filterByCategory = (category) => {
		setFilters({
			category,
			sort: null,
		});
	};

	const clearFilters = () => {
		setFilters({ category: null, sort: null });
	};

	return (
		<>
			<Header />
			<ShopBanner />
			<ShopProducts products={filteredProducts} />
			<Footer />

			{/* Sticky Bottom Bar */}
			<div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200">
				<div className="flex divide-x divide-gray-200">
					<button
						onClick={toggleSort}
						className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium"
					>
						<ArrowUpDown size={16} />
						{filters.sort ? "Undo Sort" : "Sort"}
					</button>

					<button
						onClick={() => setShowFilter(true)}
						className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium"
					>
						<SlidersHorizontal size={16} />
						Filter
					</button>
				</div>
			</div>

			{/* Filter Modal */}
			{showFilter && (
				<div className="fixed inset-0 bg-black/40 z-[10000]">
					<div className="absolute bottom-0 w-full bg-white p-4 rounded-t-xl">
						<h3 className="font-semibold mb-3">
							Filter by Category
						</h3>

						<div className="flex flex-col gap-2">
							{categories.map((cat) => (
								<button
									key={cat._id}
									onClick={() =>
										filterByCategory(cat.name)
									}
								>
									{cat.name}
								</button>
							))}
						</div>

						<div className="flex gap-3 mt-4">
							<button
								onClick={clearFilters}
								className="flex-1 border py-2"
							>
								Clear
							</button>
							<button
								onClick={() => setShowFilter(false)}
								className="flex-1 bg-black text-white py-2"
							>
								Apply
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default NewShopPage;
