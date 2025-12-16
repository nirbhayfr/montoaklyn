import React from "react";

// Swiper only for mobile
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const CategoryBubble = ({ img, label, active, setCategory }) => {
	console.log(img, label, active);
	return (
		<a
			href="/shop"
			className={`category-card ${active ? "active" : ""}`}
			onClick={(e) => {
				e.preventDefault();
				setCategory(label);
			}}
		>
			<div className="category-avatar">
				<img src={img} alt={label} />
			</div>
			<div className="category-text">{label}</div>
		</a>
	);
};

const CategorySectionShop = ({ categories, setCategory }) => {
	if (!categories || !setCategory) return;

	return (
		<section className="category-strip">
			{/* DESKTOP / TABLET layout */}
			<div className="category-row-wrapper desktop-row">
				<div className="category-row">
					{categories.map((cat, i) => (
						<div key={i} className="category-item">
							<CategoryBubble
								img={cat.image}
								label={cat.name}
								active={cat.active}
								setCategory={setCategory}
							/>
						</div>
					))}
				</div>
			</div>

			{/* MOBILE layout with infinite loop */}
			<div className="mobile-row">
				<Swiper
					modules={[Autoplay, FreeMode]}
					loop={true}
					freeMode={true}
					slidesPerView={"auto"}
					spaceBetween={16}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					className="category-swiper"
				>
					{categories.map((cat, i) => (
						<SwiperSlide key={i} className="category-slide">
							<CategoryBubble
								img={cat.image}
								label={cat.name}
								active={cat.active}
								setCategory={setCategory}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default CategorySectionShop;
