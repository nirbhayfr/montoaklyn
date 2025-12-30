import { useEffect, useState } from "react";
import { api } from "../api/api";

export const useProducts = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await api.get("/product");
			setProducts(res.data.filter((el) => el.inStock));
		};

		fetchProducts();
	}, []);

	return products;
};

export const useProductById = (id) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;

		const fetchProduct = async () => {
			try {
				setLoading(true);
				const res = await api.get(`/product/${id}`);
				setProduct(res.data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	return { product, loading, error };
};
