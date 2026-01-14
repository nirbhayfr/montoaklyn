import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import { useUploadThing } from "../../uploadthing";

export default function EditProduct() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { startUpload, isUploading } = useUploadThing("imageUploader", {
		onClientUploadComplete: (res) => {
			const urls = res.map((f) => f.url);
			setImages((prev) => [...prev, ...urls]);
		},
	});

	const [images, setImages] = useState([]);

	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);

	// FORM FIELDS
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [oldPrice, setOldPrice] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [sizes, setSizes] = useState("");
	const [colors, setColors] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [sellingCategory, setSellingCategory] = useState("featured");
	const [inStock, setInStock] = useState(true);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		fetchProduct();
		fetchCategories();
	}, []);

	const fetchProduct = async () => {
		try {
			const res = await api.get(`/product/${id}`);
			const p = res.data;

			setTitle(p.title || "");
			setDescription(p.description || "");
			setImages(p.images || []);
			setPrice(p.price ?? "");
			setOldPrice(p.oldPrice ?? "");
			setQuantity(p.quantity ?? 1);
			setSizes((p.sizes || []).join(","));
			setColors((p.colors || []).join(","));
			setCategoryId(p.category?._id || p.category || "");
			setSellingCategory(p.productSellingCategory || "featured" || "");
			setInStock(p.inStock ?? true);

			setLoading(false);
		} catch (err) {
			console.log(err);
			toast.error("Failed to load product");
		}
	};

	const fetchCategories = async () => {
		try {
			const res = await api.get("/category");
			setCategories(res.data || []);
		} catch (err) {
			console.log(err);
		}
	};

	// SUBMIT UPDATE
	const updateProduct = async () => {
		if (!title.trim() || !price || !categoryId) {
			toast.error("Title, Price, and Category are required");
			return;
		}
		if (images.length === 0) {
			toast.error("At least one image is required");
			return;
		}

		const payload = {
			title: title.trim(),
			description: description.trim(),
			images,
			price: Number(price),
			oldPrice: oldPrice ? Number(oldPrice) : undefined,
			quantity: Number(quantity),
			sizes: sizes
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
			colors: colors
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
			category: categoryId,
			productSellingCategory: sellingCategory,
			inStock: !!inStock,
		};

		try {
			await api.put(`/product/${id}`, payload);
			toast.success("Product updated!");
			navigate("/admin/products");
		} catch (err) {
			console.log(err);
			toast.error("Error updating product");
		}
	};

	if (loading) return <div style={{ padding: 30 }}>Loading...</div>;

	return (
		<div className="create-container">
			<h1 className="page-title">Edit Product</h1>

			<div className="create-form">
				<input
					className="modal-input"
					placeholder="Product Name"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<textarea
					className="modal-input"
					placeholder="Description"
					rows={3}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<select
					className="modal-input"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					<option value="">Select category</option>
					{categories.map((c) => (
						<option key={c._id} value={c._id}>
							{c.name}
						</option>
					))}
				</select>

				{/* IMAGE URL INPUT */}
				<div className="upload-box">
					<input
						type="file"
						accept="image/*"
						multiple
						disabled={isUploading}
						onChange={(e) => {
							if (!e.target.files?.length) return;
							startUpload(Array.from(e.target.files));
						}}
					/>

					{isUploading && (
						<p className="upload-status">Uploading...</p>
					)}
				</div>

				{/* IMAGE PREVIEW */}
				<div className="flex gap-2 flex-wrap mt-3">
					{images.map((img, index) => (
						<div
							key={index}
							className="relative w-16 h-16 border border-gray-300 rounded overflow-hidden flex items-center justify-center"
						>
							<img
								src={img}
								alt={`product-${index}`}
								className="w-full h-full object-cover"
							/>

							{/* Remove Button */}
							<button
								type="button"
								onClick={() =>
									setImages((prev) =>
										prev.filter(
											(_, i) => i !== index
										)
									)
								}
								className="absolute top-1 right-1 bg-red-600 text-black w-10 h-10 flex items-center justify-center rounded-full text-2xl hover:bg-red-700 shadow-lg"
							>
								×
							</button>
						</div>
					))}
				</div>

				<div className="row">
					<input
						className="modal-input"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<input
						className="modal-input"
						placeholder="Old Price"
						value={oldPrice}
						onChange={(e) => setOldPrice(e.target.value)}
					/>
				</div>

				<div className="row">
					<input
						className="modal-input"
						placeholder="Quantity"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<input
						className="modal-input"
						placeholder="Sizes (S,M,L...)"
						value={sizes}
						onChange={(e) => setSizes(e.target.value)}
					/>

					<input
						className="modal-input"
						placeholder="Colors (comma separated)"
						value={colors}
						onChange={(e) => setColors(e.target.value)}
					/>

					<select
						className="modal-input"
						value={sellingCategory}
						onChange={(e) =>
							setSellingCategory(e.target.value)
						}
					>
						<option value="featured">Featured</option>
						<option value="on-selling">On Selling</option>
						<option value="best-selling">Best Selling</option>
						<option value="top-rating">Top Rating</option>
					</select>
				</div>

				<div className="instock-row">
					<input
						type="checkbox"
						checked={inStock}
						onChange={(e) => setInStock(e.target.checked)}
					/>
					<label>In Stock</label>
				</div>

				<button
					className="primary-btn create-btn"
					onClick={updateProduct}
				>
					Update Product
				</button>
			</div>
		</div>
	);
}
