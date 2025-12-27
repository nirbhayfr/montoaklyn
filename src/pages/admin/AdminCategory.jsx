import React, { useState, useEffect } from "react";
import Modal from "../../components/ui/Modal";
import { api } from "../../api/api";
import { useUploadThing } from "../../uploadthing";

export default function AdminCategory() {
	const { startUpload, isUploading } = useUploadThing("imageUploader", {
		onClientUploadComplete: (res) => {
			setImageUrl(res[0].url);
		},
	});

	const [categories, setCategories] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [currentId, setCurrentId] = useState(null);
	const [name, setName] = useState("");
	const [image, setImageUrl] = useState("");

	const [search, setSearch] = useState("");

	// LOAD CATEGORIES
	const fetchCategories = async () => {
		const res = await api.get("/category");
		setCategories(res.data);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	// CREATE CATEGORY
	const createCategory = async () => {
		console.log(name, image);
		await api.post("/category", { name, image });
		setOpenModal(false);
		setName("");
		fetchCategories();
		setImageUrl("");
	};

	// EDIT CATEGORY
	const updateCategory = async () => {
		await api.put(`/category/${currentId}`, { name, image });
		setOpenModal(false);
		setName("");
		fetchCategories();
		setImageUrl("");
	};

	// DELETE CATEGORY
	const removeCategory = async (id) => {
		await api.delete(`/category/${id}`);
		fetchCategories();
	};

	// OPEN EDIT MODAL
	const openEdit = (cat) => {
		setEditMode(true);
		setCurrentId(cat._id);
		setName(cat.name);
		setOpenModal(true);
	};

	const filtered = categories.filter((c) =>
		c.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div>
			<h1 className="page-title">Manage Categories</h1>

			{/* Search + Create */}
			<div className="cat-top-row">
				<input
					type="text"
					placeholder="Search categories..."
					className="search-input"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<button
					className="primary-btn"
					onClick={() => {
						setEditMode(false);
						setName("");
						setOpenModal(true);
					}}
				>
					+ Create Category
				</button>
			</div>

			{/* GRID CATEGORY LIST */}
			<div className="category-grid">
				{filtered.map((cat) => (
					<div key={cat._id} className="category-card">
						<img
							src={cat.image}
							className="category-img"
							alt=""
						/>

						<div className="category-title">{cat.name}</div>

						{/* ACTION BUTTONS */}
						<div className="category-actions">
							<button
								className="edit-btn"
								onClick={() => openEdit(cat)}
							>
								Edit
							</button>

							<button
								className="delete-btn"
								onClick={() => removeCategory(cat._id)}
							>
								Delete
							</button>

							<button className="inactive-btn">
								{cat.active ? "Deactivate" : "Activate"}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* MODAL */}
			<Modal
				open={openModal}
				title={editMode ? "Edit Category" : "Create Category"}
				onClose={() => setOpenModal(false)}
			>
				<label>Category Name</label>

				<input
					type="text"
					className="modal-input"
					placeholder="Category Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<div className="upload-box">
					<input
						type="file"
						accept="image/*"
						disabled={isUploading}
						onChange={(e) => {
							if (!e.target.files?.length) return;
							startUpload([e.target.files[0]]);
						}}
					/>

					{isUploading && (
						<p className="upload-status">Uploading...</p>
					)}

					{image && (
						<div className="image-preview">
							<img src={image} alt="Preview" />
						</div>
					)}
				</div>

				<button
					className="quick-btn"
					onClick={editMode ? updateCategory : createCategory}
					disabled={isUploading}
				>
					{editMode ? "Update" : "Create"}
				</button>
			</Modal>
		</div>
	);
}
