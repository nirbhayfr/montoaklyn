// src/pages/ShopDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { products } from "../data/Data";
import { useNavigate } from "react-router-dom";

/* -----------------------------
   SMALL REUSABLE PIECES
----------------------------- */
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

// ✅ show only first 2 review media items, then overlay +N
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

  // in your data, a review looks like:
  // { user, rating, comment, images: [...] }
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
      {/* Header Summary */}
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
          {averageRating.toFixed(1)} <span style={{ fontSize: 12 }}>★</span>
          <span style={{ marginLeft: 6, fontWeight: 600 }}>{ratingText}</span>
        </div>
        <span style={{ color: "#6b7280" }}>
          based on {reviews.length} reviews
        </span>
      </div>

      {/* Media Grid (capped) */}
      {allMedia.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <ReviewMediaGrid media={allMedia} />
        </div>
      )}

      {/* Individual Reviews */}
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
              <div>
                <h4 style={{ margin: 0 }}>{r.user}</h4>
              </div>
              <StarRow value={r.rating || 0} />
            </div>

            <p style={{ margin: "4px 0", color: "#374151" }}>
              {r.comment || r.text || ""}
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

const RelatedProducts = ({ currentProduct, allProducts }) => {
  const navigate = useNavigate();

  if (!currentProduct) return null;

  const related = allProducts
    .filter(
      (p) =>
        String(p.id) !== String(currentProduct.id) &&
        p.category &&
        currentProduct.category &&
        p.category.toLowerCase() === currentProduct.category.toLowerCase()
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
              key={p.id}
              className="ul-product-horizontal cursor-pointer hover:shadow-md transition"
              style={{
                display: "flex",
                gap: 12,
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 10,
                background: "#fff",
              }}
              onClick={() => navigate(`/shopdetails/${p.id}`)} // ✅ navigate on click
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  overflow: "hidden",
                  borderRadius: 8,
                  background: "#f3f4f6",
                  flexShrink: 0,
                }}
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : null}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: 14 }}>{p.title}</h4>
                <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>
                  {p.price}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
                  {p.category}
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
  // make sure we compare as string
  const product = products.find((item) => String(item.id) === String(id));

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("green");
  const dispatch = useDispatch();

  // ✅ Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const incQty = () => setQty((q) => q + 1);
  const decQty = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;
    // include selected size/color
    dispatch(addToCart({ ...product, size, color, quantity: qty }));
    dispatch(getCartTotal());
    toast.success(`${qty} × ${product.title} added to cart`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="ul-container" style={{ padding: 24 }}>
          <p>Product not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <main>
        {/* BREADCRUMB */}
        <div className="ul-container">
          <div className="ul-breadcrumb">
            <h2 className="ul-breadcrumb-title">Shop Details</h2>
            <div className="ul-breadcrumb-nav" aria-label="Breadcrumb">
              <a href="/">
                <i className="flaticon-home" /> Home
              </a>
              <i className="flaticon-arrow-point-to-right" aria-hidden="true" />
              <a href="/shop">Shop</a>
              <i className="flaticon-arrow-point-to-right" aria-hidden="true" />
              <span className="current-page" aria-current="page">
                Shop Details
              </span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="ul-inner-page-container">
          <div className="ul-product-details">
            <div className="ul-product-details-top">
              <div
                className="row ul-bs-row row-cols-lg-2 row-cols-1 align-items-center
              "
              >
                {/* images */}
                <div className="col flex justify-center items-center">
                  {/* product.images is array in your data */}
                  <Carousel
                    slides={
                      Array.isArray(product.images)
                        ? product.images
                        : [product.images]
                    }
                  />
                </div>

                {/* text */}
                <div className="col">
                  <div className="ul-product-details-txt">
                    {/* rating */}
                    <div className="ul-product-details-rating">
                      <span
                        className="rating"
                        aria-label={`${product.rating} out of 5`}
                      >
                        {Array.from({ length: 5 }, (_, index) => {
                          const starValue = index + 1;
                          if (product.rating >= starValue) {
                            return (
                              <i
                                key={index}
                                className="flaticon-star"
                                style={{ color: "#FFD700" }}
                              />
                            );
                          } else if (product.rating >= starValue - 0.5) {
                            return (
                              <i
                                key={index}
                                className="flaticon-star"
                                style={{
                                  background:
                                    "linear-gradient(90deg, #FFD700 50%, #ccc 50%)",
                                  WebkitBackgroundClip: "text",
                                  color: "transparent",
                                }}
                              />
                            );
                          } else {
                            return (
                              <i
                                key={index}
                                className="flaticon-star"
                                style={{ color: "#ccc" }}
                              />
                            );
                          }
                        })}
                        <span style={{ marginLeft: 6, fontWeight: 500 }}>
                          {product.rating?.toFixed
                            ? product.rating.toFixed(1)
                            : product.rating}
                        </span>
                      </span>

                      <span className="review-number">
                        ({product.reviews?.length || 0} customer reviews)
                      </span>
                    </div>

                    {/* price */}
                    <span className="flex items-center gap-3 text-lg font-semibold">
                      {(() => {
                        // Clean numeric values even if "Rs 850" or "850 Rs"
                        const price = Number(
                          product.price?.toString().replace(/\D/g, "")
                        );
                        const oldPrice = Number(
                          product.oldPrice?.toString().replace(/\D/g, "")
                        );
                        const discount =
                          oldPrice && price
                            ? Math.round(((oldPrice - price) / oldPrice) * 100)
                            : 0;

                        return (
                          <>
                            {/* New Price */}
                            <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent text-2xl font-bold">
                              Rs {price}
                            </span>

                            {/* Old Price */}
                            {oldPrice > price && (
                              <span className="text-gray-400 line-through text-base">
                                Rs {oldPrice}
                              </span>
                            )}

                            {/* Discount Badge */}
                            {discount > 0 && (
                              <span className="text-sm font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white shadow-md">
                                {discount}% OFF
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </span>

                    {/* title */}
                    <h3 className="ul-product-details-title">
                      {product.title}
                    </h3>

                    {/* description */}
                    <p className="ul-product-details-descr">
                      {product.description}
                    </p>

                    {/* options */}
                    <div className="ul-product-details-options">
                      {/* sizes */}
                      <div className="ul-product-details-option ul-product-details-sizes">
                        <span className="title">Size</span>
                        <form
                          className="variants"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          {["S", "M", "L", "XL", "XXL"].map((s) => (
                            <label
                              key={s}
                              htmlFor={`ul-product-details-size-${s}`}
                            >
                              <input
                                type="radio"
                                name="product-size"
                                id={`ul-product-details-size-${s}`}
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

                      {/* colors */}
                      <div className="ul-product-details-option ul-product-details-colors">
                        <span className="title">Color</span>
                        <form
                          className="variants"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          {[
                            { key: "green", cls: "green" },
                            { key: "blue", cls: "blue" },
                            { key: "brown", cls: "brown" },
                            { key: "red", cls: "red" },
                          ].map((c, idx) => (
                            <label
                              key={c.key}
                              htmlFor={`ul-product-details-color-${idx + 1}`}
                            >
                              <input
                                type="radio"
                                name="product-color"
                                id={`ul-product-details-color-${idx + 1}`}
                                checked={color === c.key}
                                onChange={() => setColor(c.key)}
                                hidden
                              />
                              <span
                                className={`color-btn ${c.cls} ${
                                  color === c.key ? "active" : ""
                                }`}
                              />
                            </label>
                          ))}
                        </form>
                      </div>
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
                          className="ul-product-quantity"
                          value={qty}
                          min={1}
                          readOnly
                        />
                        <div className="btns">
                          <button
                            type="button"
                            className="quantityIncreaseButton"
                            onClick={incQty}
                            aria-label="Increase quantity"
                          >
                            <i className="flaticon-plus" />
                          </button>
                          <button
                            type="button"
                            className="quantityDecreaseButton"
                            onClick={decQty}
                            aria-label="Decrease quantity"
                          >
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
                          Add to Cart{" "}
                          <span className="icon">
                            <i className="flaticon-cart" />
                          </span>
                        </button>

                        <button className="add-to-wishlist">
                          <span className="icon">
                            <i className="flaticon-heart" />
                          </span>{" "}
                          Add to wishlist
                        </button>
                      </div>
                      <div className="share-options">
                        <button aria-label="Share to Facebook">
                          <i className="flaticon-facebook-app-symbol" />
                        </button>
                        <button aria-label="Share to Twitter">
                          <i className="flaticon-twitter" />
                        </button>
                        <button aria-label="Share to LinkedIn">
                          <i className="flaticon-linkedin-big-logo" />
                        </button>
                        <a href="#" aria-label="YouTube">
                          <i className="flaticon-youtube" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* row */}
            </div>

            {/* bottom: description, reviews, related */}
            <div className="ul-product-details-bottom">
              {/* description */}
              <div className="ul-product-details-long-descr-wrapper">
                <h3 className="ul-product-details-inner-title">
                  {product.title}
                </h3>
                <p>{product.description || "No description."}</p>
              </div>

              {/* reviews (with capped media) */}
              <ReviewsSection pid={id} reviews={product.reviews || []} />

              {/* related products */}
              <RelatedProducts
                currentProduct={product}
                allProducts={products}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
