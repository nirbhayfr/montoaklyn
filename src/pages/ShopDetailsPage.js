// src/pages/ShopDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ⭐ REMOVE dummy data
// import { products } from "../data/Data";

// ⭐ ADD API
import { fetchProductById, fetchProducts } from "../api/productService";

/* ----------------------------- SMALL PIECES ----------------------------- */
const StarRow = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {stars.map((s, i) => (
        <span
          key={i}
          style={{
            color: s <= value ? "#fbbf24" : "#d1d5db",
            fontSize: 14,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewMediaGrid = ({ media = [] }) => {
  if (!media.length) return null;

  const MAX_SHOW = 2;
  const visible = media.slice(0, MAX_SHOW);
  const remaining = media.length - MAX_SHOW;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 100px)",
        gap: 8,
      }}
    >
      {visible.map((src, i) => (
        <div key={i} style={{ position: "relative", width: 100, height: 100 }}>
          <img
            src={src}
            alt={`Review media ${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
          {i === visible.length - 1 && remaining > 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              +{remaining} more
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const ReviewsSection = ({ pid, reviews = [] }) => {
  if (!reviews.length) {
    return (
      <section className="ul-product-details-reviews" style={{ marginTop: 24 }}>
        <h3 className="ul-product-details-inner-title">Ratings and reviews</h3>
        <p>No reviews yet. Be the first to review this product.</p>
      </section>
    );
  }

  const averageRating =
    reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length;

  const ratingText =
    averageRating >= 4.5
      ? "Excellent"
      : averageRating >= 3.5
      ? "Good"
      : averageRating >= 2.5
      ? "Average"
      : "Poor";

  const allMedia = reviews.flatMap((r) => r.images || []);

  return (
    <section className="ul-product-details-reviews" style={{ marginTop: 24 }}>
      <div
        className="flex items-center gap-3"
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#e8f5e9",
            color: "#1b5e20",
            padding: "4px 8px",
            borderRadius: 6,
            fontWeight: 700,
          }}
        >
          {averageRating.toFixed(1)} ★{" "}
          <span style={{ marginLeft: 6 }}>{ratingText}</span>
        </div>
        <span style={{ color: "#6b7280" }}>
          based on {reviews.length} reviews
        </span>
      </div>

      {allMedia.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <ReviewMediaGrid media={allMedia} />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {reviews.map((r, i) => (
          <article
            key={i}
            className="ul-product-details-review"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: 12,
              marginBottom: 12,
            }}
          >
            <div
              className="header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h4 style={{ margin: 0 }}>{r.user}</h4>
              <StarRow value={r.rating || 0} />
            </div>

            <p style={{ margin: "4px 0", color: "#374151" }}>
              {r.comment || ""}
            </p>

            {r.images?.length > 0 && (
              <div style={{ marginTop: 6 }}>
                <ReviewMediaGrid media={r.images} />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

/* ----------------------------- RELATED PRODUCTS ----------------------------- */
const RelatedProducts = ({ currentProduct, allProducts }) => {
  const navigate = useNavigate();

  if (!currentProduct) return null;

  const related = allProducts
    .filter(
      (p) =>
        String(p._id) !== String(currentProduct._id) &&
        p.category?.name === currentProduct.category?.name
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section style={{ marginTop: 32 }}>
      <h3 className="ul-product-details-inner-title">Related products</h3>

      <div className="flex flex-col gap-4">
        {related.map((p) => {
          const imgSrc = Array.isArray(p.images) ? p.images[0] : p.images;

          return (
            <div
              key={p._id}
              className="ul-product-horizontal cursor-pointer hover:shadow-md transition"
              style={{
                display: "flex",
                gap: 12,
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 10,
                background: "#fff",
              }}
              onClick={() => navigate(`/shopdetails/${p._id}`)}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  overflow: "hidden",
                  borderRadius: 8,
                  background: "#f3f4f6",
                }}
              >
                <img
                  src={imgSrc}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: 14 }}>{p.title}</h4>
                <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>
                  ₹{p.price}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
                  {p.category?.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ====================== MAIN PAGE ====================== */
export default function ShopDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("green");

  // ⭐ Fetch product details
  useEffect(() => {
    fetchProductById(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error("Product details error:", err));
  }, [id]);

  // ⭐ Fetch all products (for related products)
  useEffect(() => {
    fetchProducts()
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.error("Error loading all products:", err));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const incQty = () => setQty((q) => q + 1);
  const decQty = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, size, color, quantity: qty }));
    dispatch(getCartTotal());

    toast.success(`${qty} × ${product.title} added to cart`, {
      autoClose: 2000,
      theme: "colored",
    });
  };

  /* ------------------------------ Loading State ------------------------------ */
  if (!product) {
    return (
      <>
        <Header />
        <div className="ul-container" style={{ padding: 24 }}>
          <p>Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  /* ------------------------------ MAIN VIEW ------------------------------ */
  return (
    <>
      <Header />
      <ToastContainer />

      <main>
        {/* BREADCRUMB */}
        <div className="ul-container">
          <div className="ul-breadcrumb">
            <h2 className="ul-breadcrumb-title">Shop Details</h2>
            <div className="ul-breadcrumb-nav">
              <a href="/">
                <i className="flaticon-home" /> Home
              </a>
              <i className="flaticon-arrow-point-to-right" />
              <a href="/shop">Shop</a>
              <i className="flaticon-arrow-point-to-right" />
              <span>Shop Details</span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="ul-inner-page-container">
          <div className="ul-product-details">
            <div className="ul-product-details-top">
              <div className="row ul-bs-row row-cols-lg-2 row-cols-1 align-items-center">
                {/* IMAGES */}
                <div className="col flex justify-center items-center">
                  <Carousel slides={product.images || []} />
                </div>

                {/* TEXT */}
                <div className="col">
                  <div className="ul-product-details-txt">
                    {/* rating */}
                    <div className="ul-product-details-rating">
                      <span className="rating">
                        <StarRow value={product.rating || 0} /> {product.rating}
                      </span>
                      <span className="review-number">
                        ({product.reviews?.length || 0} customer reviews)
                      </span>
                    </div>

                    {/* price */}
                    <span className="flex items-center gap-3 text-lg font-semibold">
                      ₹{product.price}
                      {product.oldPrice > product.price && (
                        <span className="text-gray-400 line-through">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </span>

                    <h3 className="ul-product-details-title">
                      {product.title}
                    </h3>

                    <p className="ul-product-details-descr">
                      {product.description}
                    </p>

                    {/* Sizes */}
                    <div className="ul-product-details-option ul-product-details-sizes">
                      <span className="title">Size</span>
                      <form
                        className="variants"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        {["S", "M", "L", "XL", "XXL"].map((s) => (
                          <label key={s}>
                            <input
                              type="radio"
                              name="product-size"
                              checked={size === s}
                              onChange={() => setSize(s)}
                              hidden
                            />
                            <span
                              className={`size-btn ${
                                size === s ? "active" : ""
                              }`}
                            >
                              {s}
                            </span>
                          </label>
                        ))}
                      </form>
                    </div>

                    {/* Colors */}
                    <div className="ul-product-details-option ul-product-details-colors">
                      <span className="title">Color</span>
                      <form className="variants">
                        {["green", "blue", "brown", "red"].map((c) => (
                          <label key={c}>
                            <input
                              type="radio"
                              name="product-color"
                              checked={color === c}
                              onChange={() => setColor(c)}
                              hidden
                            />
                            <span
                              className={`color-btn ${c} ${
                                color === c ? "active" : ""
                              }`}
                            />
                          </label>
                        ))}
                      </form>
                    </div>

                    {/* quantity */}
                    <div className="ul-product-details-option ul-product-details-quantity">
                      <span className="title">Quantity</span>
                      <form
                        className="ul-product-quantity-wrapper"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <input
                          type="number"
                          value={qty}
                          readOnly
                          className="ul-product-quantity"
                        />
                        <div className="btns">
                          <button onClick={incQty} type="button">
                            <i className="flaticon-plus" />
                          </button>
                          <button onClick={decQty} type="button">
                            <i className="flaticon-minus-sign" />
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* actions */}
                    <div className="ul-product-details-actions">
                      <div className="left">
                        <button
                          className="add-to-cart"
                          onClick={handleAddToCart}
                        >
                          Add to Cart <i className="flaticon-cart" />
                        </button>

                        <button className="add-to-wishlist">
                          <i className="flaticon-heart" /> Add to wishlist
                        </button>
                      </div>

                      <div className="share-options">
                        <button>
                          <i className="flaticon-facebook-app-symbol" />
                        </button>
                        <button>
                          <i className="flaticon-twitter" />
                        </button>
                        <button>
                          <i className="flaticon-linkedin-big-logo" />
                        </button>
                        <a>
                          <i className="flaticon-youtube" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom content */}
            <div className="ul-product-details-bottom">
              <div className="ul-product-details-long-descr-wrapper">
                <h3 className="ul-product-details-inner-title">
                  {product.title}
                </h3>
                <p>{product.description}</p>
              </div>

              <ReviewsSection pid={id} reviews={product.reviews || []} />

              <RelatedProducts
                currentProduct={product}
                allProducts={allProducts}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
