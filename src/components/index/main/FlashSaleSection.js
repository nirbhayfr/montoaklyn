import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../../../redux/cartSlice";
import { ProductCard } from "../../../pages/ShopPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { products } from "../../../data/Data";

import { AddToCartModal } from "../../../pages/ShopPage";

const FlashSaleSection = () => {
	const dispatch = useDispatch();
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	// state for modal
	const [modalOpen, setModalOpen] = React.useState(false);
	const [selectedProduct, setSelectedProduct] = React.useState(null);
	const [chosenSize, setChosenSize] = React.useState("M");
	const [qty, setQty] = React.useState(1);

	const handleAdd = (product, e) => {
		e?.preventDefault();
		e?.stopPropagation();
		setSelectedProduct(product);
		setChosenSize("M");
		setQty(1);
		setModalOpen(true);
	};

	const handleConfirmAdd = () => {
		if (!selectedProduct) return;
		dispatch(
			addToCart({
				...selectedProduct,
				size: chosenSize,
				quantity: qty,
			})
		);
		setModalOpen(false);
	};

	return (
		<div className="overflow-hidden">
			<div className="ul-container">
				<div className="ul-flash-sale">
					<div className="ul-inner-container">
						{/* header ... keep yours */}
						<div className="ul-section-heading ul-flash-sale-heading">
							<div className="left">
								<span className="ul-section-sub-title">
									New Collection
								</span>
								<h2 className="ul-section-title">
									Trending Flash Sell
								</h2>
							</div>

							{/* countdown */}
							{/* <div className="ul-flash-sale-countdown-wrapper">
                <div className="ul-flash-sale-countdown">
                  <div className="days-wrapper">
                    <div className="days number">3</div>
                    <span className="txt">Days</span>
                  </div>
                  <div className="hours-wrapper">
                    <div className="hours number">06</div>
                    <span className="txt">Hours</span>
                  </div>
                  <div className="minutes-wrapper">
                    <div className="minutes number">34</div>
                    <span className="txt">Min</span>
                  </div>
                  <div className="seconds-wrapper">
                    <div className="seconds number">54</div>
                    <span className="txt">Sec</span>
                  </div>
                </div>
              </div> */}
							<FlashSaleCountdown />

							<a href="/shop" className="ul-btn">
								View All Collection{" "}
								<i className="flaticon-up-right-arrow"></i>
							</a>

							<div className="ul-products-slider-nav ul-products-slider-flash-nav">
								<button className="prev" ref={prevRef}>
									<i className="flaticon-left-arrow"></i>
								</button>
								<button className="next" ref={nextRef}>
									<i className="flaticon-arrow-point-to-right"></i>
								</button>
							</div>
						</div>

						{/* Swiper product list */}
						<Swiper
							className="ul-flash-sale-slider"
							modules={[Navigation]}
							spaceBetween={24}
							loop={true}
							breakpoints={{
								0: { slidesPerView: 1 },
								576: { slidesPerView: 2 },
								768: { slidesPerView: 3 },
								1200: { slidesPerView: 4 },
							}}
							onBeforeInit={(swiper) => {
								swiper.params.navigation.prevEl =
									prevRef.current;
								swiper.params.navigation.nextEl =
									nextRef.current;
							}}
							navigation={{
								prevEl: prevRef.current,
								nextEl: nextRef.current,
							}}
						>
							{products.map((product) => (
								<SwiperSlide key={product.id}>
									<div className="ul-product-card-wrap">
										<ProductCard
											product={product}
											onAddClick={(e) =>
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
											<i className="flaticon-shopping-bag mt-1"></i>
										</button>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>

			{/* Reuse modal from ShopPage */}
			<AddToCartModal
				open={modalOpen}
				product={selectedProduct}
				size={chosenSize}
				qty={qty}
				onSizeChange={setChosenSize}
				onQtyChange={setQty}
				onClose={() => setModalOpen(false)}
				onConfirm={handleConfirmAdd}
			/>

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
		</div>
	);
};

const FlashSaleCountdown = () => {
	const [timeLeft, setTimeLeft] = useState(0);

	useEffect(() => {
		// 3 days in seconds = 3 * 24 * 60 * 60
		const totalSeconds = 3 * 24 * 60 * 60;

		// Retrieve stored end time if exists
		const storedEndTime = localStorage.getItem("flashSaleEndTime");
		let endTime = storedEndTime
			? Number(storedEndTime)
			: Date.now() + totalSeconds * 1000;

		// Reset if expired
		if (Date.now() > endTime) {
			endTime = Date.now() + totalSeconds * 1000;
			localStorage.setItem("flashSaleEndTime", endTime.toString());
		}

		// Update every second
		const interval = setInterval(() => {
			const now = Date.now();
			const diff = endTime - now;

			if (diff <= 0) {
				// Restart countdown when finished
				endTime = Date.now() + totalSeconds * 1000;
				localStorage.setItem(
					"flashSaleEndTime",
					endTime.toString()
				);
			}

			setTimeLeft(Math.max(0, Math.floor((endTime - now) / 1000)));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// Calculate Days, Hours, Minutes, Seconds
	const days = Math.floor(timeLeft / (24 * 3600));
	const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
	const minutes = Math.floor((timeLeft % 3600) / 60);
	const seconds = Math.floor(timeLeft % 60);

	return (
		<div className="ul-flash-sale-countdown-wrapper flex justify-center">
			<div className="ul-flash-sale-countdown flex items-center justify-center gap-6">
				<div className="days-wrapper text-center">
					<div className="days number text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
						{String(days).padStart(2, "0")}
					</div>
					<span className="txt text-sm text-gray-500">Days</span>
				</div>

				<div className="hours-wrapper text-center">
					<div className="hours number text-3xl font-bold text-orange-400">
						{String(hours).padStart(2, "0")}
					</div>
					<span className="txt text-sm text-gray-500">
						Hours
					</span>
				</div>

				<div className="minutes-wrapper text-center">
					<div className="minutes number text-3xl font-bold text-yellow-400">
						{String(minutes).padStart(2, "0")}
					</div>
					<span className="txt text-sm text-gray-500">Min</span>
				</div>

				<div className="seconds-wrapper text-center">
					<div className="seconds number text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
						{String(seconds).padStart(2, "0")}
					</div>
					<span className="txt text-sm text-gray-500">Sec</span>
				</div>
			</div>
		</div>
	);
};

export default FlashSaleSection;
