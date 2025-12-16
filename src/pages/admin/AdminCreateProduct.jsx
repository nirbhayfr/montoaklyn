import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUploadThing } from "../../uploadthing";

export default function AdminCreateProduct() {
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setImageUrl(res[0].url);
    },
  });

  const [image, setImageUrl] = useState("");
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const submitProduct = async () => {
    if (!title.trim()) return toast.error("Product title is required.");
    if (!description.trim()) return toast.error("Description is required.");
    if (!image) return toast.error("At least one image is required.");
    if (!String(price).trim()) return toast.error("Price is required.");
    if (!sizes.trim()) return toast.error("Sizes are required.");
    if (!colors.trim()) return toast.error("Colors are required.");
    if (!categoryId) return toast.error("Category is required.");

    const payload = {
      id: "PID-" + Date.now(),
      title,
      description,
      images: [image],
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      quantity: Number(quantity),
      sizes: sizes.split(",").map((s) => s.trim()),
      colors: colors.split(",").map((s) => s.trim()),
      category: categoryId,
      productSellingCategory: sellingCategory,
      inStock,
    };

    console.log("PAYLOAD →", payload);

    try {
      await api.post("/product", payload);
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ API ERROR →", err.response?.data || err);
      toast.error("Failed to create product");
    }
  };

  return (
    <div>
      <h1 className="page-title">Create Product</h1>

      <div className="create-prod-form">
        {/* IMAGE PREVIEW */}
        <div className="image-preview-box">
          {image && <img src={image} alt="preview" className="preview-img" />}
        </div>

        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            className="modal-input"
            placeholder="Product Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="modal-input"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
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
        </div>

        <div className="form-group">
          <label className="form-label">Product Image</label>
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
            {isUploading && <p className="upload-status">Uploading...</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            className="modal-input"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Old Price</label>
          <input
            className="modal-input"
            placeholder="Old Price (optional)"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input
            className="modal-input"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Sizes</label>
          <input
            className="modal-input"
            placeholder="Sizes (S,M,L...)"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Colors</label>
          <input
            className="modal-input"
            placeholder="Colors (comma separated)"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Selling Category</label>
          <select
            className="modal-input"
            value={sellingCategory}
            onChange={(e) => setSellingCategory(e.target.value)}
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

        <button className="primary-btn create-btn" onClick={submitProduct}>
          Create Product
        </button>
      </div>
    </div>
  );
}
