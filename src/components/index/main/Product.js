import React, { useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { ProductCard, AddToCartModal } from "../../../pages/ShopPage";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { products } from "../../../data/Data";

// import { AddToCartModal } from "../../../pages/ShopPage";

const ProductsSection = () => {
	const dispatch = useDispatch();

	// Modal state
	const [showModal, setShowModal] = useState(false);
	const [addedProduct, setAddedProduct] = useState(null);
	const modalTimeoutRef = useRef(null);

	// refs for navigation
	const prevBtn1 = useRef(null);
	const nextBtn1 = useRef(null);

	// normalize and add to cart
	const handleAdd = useCallback(
		(rawProduct, e) => {
			e?.preventDefault?.();
			e?.stopPropagation?.();
			if (!rawProduct) return;

			const product = {
				id: rawProduct.id,
				title: rawProduct.title,
				price: rawProduct.price,
				img:
					rawProduct.images?.[0] ||
					rawProduct.image ||
					rawProduct.thumbnail,
				category: rawProduct.category,
				size: rawProduct.size,
				color: rawProduct.color,
				inStock: rawProduct.inStock ?? true,
				onSale: rawProduct.onSale ?? false,
				discount: rawProduct.discount,
				detailsUrl: rawProduct.detailsUrl || "/shopdetails",
				categoryUrl: rawProduct.categoryUrl || "/shop",
				quantity:
					rawProduct.quantity && rawProduct.quantity > 0
						? rawProduct.quantity
						: 1,
			};

			if (!product.id) {
				console.warn("addToCart: product.id missing", product);
				return;
			}

			dispatch(addToCart(product));

			// clear any existing timeout to avoid flicker
			if (modalTimeoutRef.current)
				clearTimeout(modalTimeoutRef.current);

			setAddedProduct(product);
			setShowModal(true);

			console.log("🛒 Product Added:", product);

			// hide modal after 2.5 seconds
			modalTimeoutRef.current = setTimeout(() => {
				setShowModal(false);
				modalTimeoutRef.current = null;
			}, 2500);
		},
		[dispatch]
	);

	return (
		<>
			{/* PRODUCTS SECTION START */}
			<div className="ul-container mb-8">
				<br />
				<section className="ul-products">
					<div className="ul-inner-container">
						{/* header row */}
						<div className="ul-section-heading">
							<div className="left">
								<span className="ul-section-sub-title">
									Summer collection
								</span>
								<h2 className="ul-section-title">
									Shopping Every Day
								</h2>
							</div>

							<div className="right">
								<a href="/shop" className="ul-btn">
									More Collection{" "}
									<i className="flaticon-up-right-arrow"></i>
								</a>
							</div>
						</div>

						{/* main grid */}
						<div className="row ul-bs-row">
							{/* LEFT BANNER */}
							{/* <div className="col-lg-3 col-md-4 col-12">
                <div className="ul-products-sub-banner">
                  <div className="ul-products-sub-banner-img">
                    <img
                      src="assets/img/products-sub-banner-1.jpg"
                      alt="Sub Banner"
                    />
                  </div>
                  <div className="ul-products-sub-banner-txt">
                    <h3 className="ul-products-sub-banner-title">
                      Trending Now Only This Weekend!
                    </h3>
                    <a href="/shop" className="ul-btn">
                      Shop Now <i className="flaticon-up-right-arrow"></i>
                    </a>
                  </div>
                </div>
              </div> */}

							{/* SLIDER */}
							{/* <div className="col-lg-9 col-md-8 col-12"> */}
							<div>
								<Swiper
									className="ul-products-slider-1"
									modules={[Navigation]}
									spaceBetween={24}
									loop={true}
									breakpoints={{
										0: { slidesPerView: 1 },
										576: { slidesPerView: 2 },
										992: { slidesPerView: 3 },
										1200: { slidesPerView: 4 },
										0: { slidesPerView: 1 },
										576: { slidesPerView: 2 },
										992: { slidesPerView: 3 },
										1200: { slidesPerView: 4 },
									}}
									onBeforeInit={(swiper) => {
										swiper.params.navigation.prevEl =
											prevBtn1.current;
										swiper.params.navigation.nextEl =
											nextBtn1.current;
									}}
									navigation={{
										prevEl: prevBtn1.current,
										nextEl: nextBtn1.current,
									}}
								>
									{products.map((product) => (
										<SwiperSlide key={product.id}>
											<div className=" ul-product-card-wrap h-full ">
												<ProductCard
													product={
														product
													}
													onAdd={(e) =>
														handleAdd(
															product,
															e
														)
													}
												/>
												<button
													className="ul-addtocart-quick"
													onClick={(e) =>
														handleAdd(
															product,
															e
														)
													}
													aria-label="Add to Cart"
													title="Add to Cart"
												>
													<i className="flaticon-shopping-bag"></i>
												</button>
											</div>
										</SwiperSlide>
									))}
								</Swiper>

								<div className="ul-products-slider-nav ul-products-slider-1-nav">
									<button
										className="prev"
										ref={prevBtn1}
									>
										<i className="flaticon-left-arrow"></i>
									</button>
									<button
										className="next"
										ref={nextBtn1}
									>
										<i className="flaticon-arrow-point-to-right"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* ADD TO CART MODAL */}
			{showModal && addedProduct && (
				<div
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%) scale(1)",
						background: "white",
						padding: 30,
						borderRadius: 12,
						zIndex: 9999,
						boxShadow: "0 0 25px rgba(0,0,0,0.3)",
						textAlign: "center",
						animation: "fadeIn 0.3s ease",
					}}
				>
					<h3>✅ Added to Cart!</h3>
					<p style={{ fontWeight: "600", marginTop: 8 }}>
						{addedProduct.title}
					</p>
					<button
						onClick={() => setShowModal(false)}
						style={{
							marginTop: 12,
							padding: "8px 16px",
							background: "#ef2853",
							color: "#fff",
							border: "none",
							borderRadius: 8,
							cursor: "pointer",
						}}
					>
						Close
					</button>
				</div>
			)}

			{/* INLINE STYLE FIX */}
			<style>{`
        .ul-product-card-wrap { position: relative; }
        .ul-addtocart-quick {
          position: absolute;
          right: 16px;
          bottom: 45px;
          z-index: 5;

          width: 32px;
          height: 32px;
          border-radius: 50%;

          display: grid;
          place-items: center;
          cursor: pointer;

          background: linear-gradient(135deg, #ff4d6d, #ff2e4f);
          color: #fff;
          border: none;

          box-shadow: 0 4px 12px rgba(255, 45, 75, 0.3);
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s ease;
        }

        .ul-addtocart-quick:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(255, 45, 75, 0.45);
          opacity: 1;
        }

        .ul-addtocart-quick:active {
          transform: scale(0.92);
        }

      `}</style>
		</>
	);
};

export default ProductsSection;
