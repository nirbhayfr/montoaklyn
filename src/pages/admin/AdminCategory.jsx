import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { api } from "../../api/api";

export default function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState("");

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
    await api.post("/category", { name });
    setOpenModal(false);
    setName("");
    fetchCategories();
  };

  // EDIT CATEGORY
  const updateCategory = async () => {
    await api.put(`/category/${currentId}`, { name });
    setOpenModal(false);
    setName("");
    fetchCategories();
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

  // CATEGORY IMAGES
  const catImages = {
    "Top Wear": "/cat/topwear.jpg",
    "Bottom Wear": "/cat/bottomwear.jpg",
    "Outer Wear": "/cat/outerwear.jpg",
    "Winter Wear": "/cat/winterwear.jpg",
    "Summer Wear": "/cat/summerwear.jpg",
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
              src={catImages[cat.name] || "/cat/default.jpg"}
              className="category-img"
              alt=""
            />

            <div className="category-title">{cat.name}</div>

            {/* ACTION BUTTONS */}
            <div className="category-actions">
              <button className="edit-btn" onClick={() => openEdit(cat)}>
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
        <input
          type="text"
          className="modal-input"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="quick-btn"
          onClick={editMode ? updateCategory : createCategory}
        >
          {editMode ? "Update" : "Create"}
        </button>
      </Modal>
    </div>
  );
}
