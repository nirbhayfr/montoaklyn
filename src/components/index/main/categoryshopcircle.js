import React from "react";

// Swiper only for mobile
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const categories = [
  { img: "assets/img/category-1.jpg", label: "MEN", active: true },
  // { img: "assets/img/category-2.jpg", label: "KIDS" },
  // { img: "assets/img/category-3.jpg", label: "PANTS" },
  { img: "assets/img/category-4.jpg", label: "Fabric" },
  // { img: "assets/img/category-5.jpg", label: "JEANS" },
  // { img: "assets/img/category-6.jpg", label: "SWEATER" },
  // { img: "assets/img/category-7.jpg", label: "SHOE" },
  // { img: "assets/img/category-1.jpg", label: "MEN 2" },
  // { img: "assets/img/category-2.jpg", label: "KIDS 2" },
];

const CategoryBubble = ({ img, label, active }) => (
  <a href="/shop" className={`category-card ${active ? "active" : ""}`}>
    <div className="category-avatar">
      <img src={img} alt={label} />
    </div>
    <div className="category-text">{label}</div>
  </a>
);

const CategorySectionShop = () => {
  return (
    <section className="category-strip">
      {/* DESKTOP / TABLET layout */}
      <div className="category-row-wrapper desktop-row">
        <div className="category-row">
          {categories.map((cat, i) => (
            <div key={i} className="category-item">
              <CategoryBubble
                img={cat.img}
                label={cat.label}
                active={cat.active}
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
                img={cat.img}
                label={cat.label}
                active={cat.active}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySectionShop;
