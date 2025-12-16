import React, { useEffect, useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product");
      setProducts(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE — modal open
  const askDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // DELETE — confirmed
  const confirmDelete = async () => {
    try {
      await api.delete(`/product/${deleteId}`);
      setProducts(products.filter((p) => p._id !== deleteId));
      toast.success("Product deleted!");
      setConfirmOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product");
    }
  };

  // ACTIVATE/DEACTIVATE
  const toggleActive = async (p) => {
    try {
      await api.put(`/product/${p._id}`, { inStock: !p.inStock });
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // FILTERS
  const visibleProducts = products
    .filter((p) =>
      categoryFilter
        ? p.category?._id === categoryFilter || p.category === categoryFilter
        : true
    )
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="page-title">Manage Products</h1>

      {/* TOP ROW */}
      <div className="cat-top-row">
        <div style={{ display: "flex", gap: 12 }}>
          <input
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="search-input"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ minWidth: 180 }}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/admin/products/create")}
        >
          + Create Product
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {visibleProducts.map((p) => (
          <div className="product-card" key={p._id}>
            <img
              src={p.images?.[0] || "/cat/default.jpg"}
              className="product-img"
              alt={p.title}
            />

            <div className="product-body">
              <div className="product-title">{p.title}</div>
              <div className="product-price">₹{p.price}</div>

              <div className="product-sub">
                <span>{p.category?.name || "—"}</span>
                <span>Qty: {p.quantity}</span>
              </div>

              <div className="product-actions">
                <button
                  className="primary-btn small"
                  onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn small"
                  onClick={() => askDelete(p._id)}
                >
                  Delete
                </button>

                <button
                  className="inactive-btn small"
                  onClick={() => toggleActive(p)}
                >
                  {p.inStock ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="This product will be permanently deleted."
      />
    </div>
  );
}
