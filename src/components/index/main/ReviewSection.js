import React from "react";
// ⬇️ import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// ⬇️ import Swiper core styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// (Optional) if you want pagination dots/arrows later:
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

const reviewsData = [
  {
    img: "review-author-1.jpg",
    name: "Priya Sharma",
    role: "Verified Buyer",
    rating: 4,
    description:
      "The kurta is beautiful! The fabric is soft and the embroidery is very neat. It fits perfectly, just like the size chart suggested. Delivery was also quick.",
  },
  {
    img: "review-author-2.jpg",
    name: "Rohan Gupta",
    role: "Verified Buyer",
    rating: 5,
    description:
      "Absolutely love these jeans. The fit is amazing and the denim quality is top-notch. They are very comfortable to wear all day. Will be buying another pair!",
  },
  {
    img: "review-author-3.jpg",
    name: "Anil Singh",
    role: "Verified Buyer",
    rating: 4,
    description:
      "I'm very happy with this saree. The colour is exactly as shown in the picture and the material is lightweight. Good value for money. Received many compliments!",
  },
  {
    img: "review-author-4.png",
    name: "Vikram Patel",
    role: "Verified Buyer",
    rating: 5,
    description:
      "Ordered a formal shirt and it's excellent. The stitching is perfect and the fabric feels premium. It was packed very well. Great online shopping experience.",
  },
  {
    img: "review-author-2.png",
    name: "Sameer Khan",
    role: "Verified Buyer",
    rating: 3,
    description:
      "The t-shirt is okay for the price. The print is nice, but the material is a bit thinner than I expected. Fit is good, though. It's decent for casual wear.",
  },
];

const ReviewsSection = () => {
  return (
    <section className="ul-reviews overflow-hidden">
      {/* heading */}
      <div className="ul-section-heading text-center justify-content-center">
        <div>
          <span className="ul-section-sub-title">Customer Reviews</span>
          <h2 className="ul-section-title">Product Reviews</h2>
          <p className="ul-reviews-heading-descr">
            Our references are very valuable, the result of a great effort...
          </p>
        </div>
      </div>

      {/* Swiper slider */}
      <Swiper
        className="ul-reviews-slider "
        // basic behavior
        loop={true}
        spaceBetween={24}
        // responsive breakpoints
        breakpoints={{
          0: { slidesPerView: 1 }, // mobile
          640: { slidesPerView: 1 }, // small tablets
          768: { slidesPerView: 2 }, // md
          1024: { slidesPerView: 3 }, // desktop
        }}

        // If you want autoplay, uncomment:
        // autoplay={{ delay: 3000 }}

        // If you want pagination or navigation arrows, add modules & props
        // modules={[Pagination, Navigation, Autoplay]}
        // pagination={{ clickable: true }}
        // navigation={true}
      >
        {reviewsData.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="ul-review my-4">
              <div className="ul-review-rating">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={
                      i < review.rating ? "flaticon-star" : "flaticon-star-3"
                    }
                  ></i>
                ))}
              </div>

              <p className="ul-review-descr">{review.description}</p>

              <div className="ul-review-bottom">
                <div className="ul-review-reviewer">
                  <div className="reviewer-image">
                    <img
                      src={`assets/img/${review.img}`}
                      alt="reviewer"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="reviewer-name">{review.name}</h3>
                    <span className="reviewer-role">{review.role}</span>
                  </div>
                </div>

                <div className="ul-review-icon">
                  <i className="flaticon-left"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewsSection;
