import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const GallerySection = () => {
  const galleryItems = [
    "assets/img/gallery-item-1.jpg",
    "assets/img/gallery-item-2.jpg",
    "assets/img/gallery-item-3.jpg",
    "assets/img/gallery-item-4.jpg",
    "assets/img/gallery-item-5.jpg",
    "assets/img/gallery-item-6.jpg",
    "assets/img/gallery-item-1.jpg",
    "assets/img/gallery-item-2.jpg",
  ];

  return (
    <div className="ul-gallery overflow-hidden mx-auto">
      <Swiper
        className="ul-gallery-slider"
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1400: { slidesPerView: 6 },
        }}
      >
        {galleryItems.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <div className="ul-gallery-item">
              <img src={imgSrc} alt={`Gallery Image ${index + 1}`} />

              <div className="ul-gallery-item-btn-wrapper">
                <a href={imgSrc} data-fslightbox="gallery">
                  <i className="flaticon-instagram"></i>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySection;
