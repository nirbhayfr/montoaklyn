import React, { useState, useEffect, useCallback } from "react";

const slides = [
  {
    img: "assets/img/banner-slide-1.png",
    subTitle: "Perfect for Summer Evenings",
    title: "Casual and Stylish for All Seasons",
    price: 129,
    link: "/shop",
    extraClass: "",
  },
  {
    img: "assets/img/banner-slide-2.png",
    subTitle: "Comfort Meets Style",
    title: "Stay Trendy with Our New Collection",
    price: 149,
    link: "/shop",
    extraClass: "ul-banner-slide--2",
  },
  {
    img: "assets/img/banner-slide-3.png",
    subTitle: "New Arrivals",
    title: "Upgrade Your Wardrobe Effortlessly",
    price: 179,
    link: "/shop",
    extraClass: "ul-banner-slide--3",
  },
];

const initialThumbs = [
  "assets/img/banner-img-slide-1.jpg",
  "assets/img/banner-img-slide-2.jpg",
  "assets/img/banner-img-slide-3.jpg",
];

const Banner = () => {
  const [mainBannerIndex, setMainBannerIndex] = useState(0);
  const [thumbs, setThumbs] = useState(initialThumbs);

  // helper: go to next slide
  const goNext = useCallback(() => {
    setMainBannerIndex((prev) => {
      const nextIndex = (prev + 1) % slides.length;
      return nextIndex;
    });

    // rotate thumbnails left
    setThumbs((prev) => {
      const arr = [...prev];
      const first = arr.shift();
      arr.push(first);
      return arr;
    });
  }, []);

  // helper: go prev slide
  const goPrev = useCallback(() => {
    setMainBannerIndex((prev) => {
      const nextIndex = (prev - 1 + slides.length) % slides.length;
      return nextIndex;
    });

    // rotate thumbnails right
    setThumbs((prev) => {
      const arr = [...prev];
      const last = arr.pop();
      arr.unshift(last);
      return arr;
    });
  }, []);

  // autoplay every 5s
  useEffect(() => {
    const id = setInterval(() => {
      goNext();
    }, 5000);

    return () => clearInterval(id);
  }, [goNext]);

  // when user clicks a thumbnail
  const handleThumbClick = (i) => {
    // i is the visible index in the current rotated thumbs array.
    // We want that thumbnail to become the ACTIVE main slide,
    // and also reorder thumbnails so that clicked one becomes first.
    setMainBannerIndex(i);

    setThumbs((prev) => {
      // rotate array so index i becomes 0
      const arr = [...prev];
      const head = arr.slice(i);
      const tail = arr.slice(0, i);
      return [...head, ...tail];
    });
  };

  const activeSlide = slides[mainBannerIndex];

  return (
    <>
      {/* BANNER SECTION START */}
      <div className="overflow-hidden">
        <div className="ul-container">
          <section className="ul-banner">
            {/* Main banner */}
            <div className="ul-banner-slider-wrapper">
              {/* This used to say 'swiper', but it's just our custom slider now */}
              <div className="ul-banner-slider-track">
                <div className="ul-banner-slider-track">
                  <BannerSlide {...activeSlide} />
                </div>

                {/* Navigation */}
                <div className="ul-banner-slider-nav-wrapper">
                  <div className="ul-banner-slider-nav">
                    <button className="prev" onClick={goPrev}>
                      <span className="icon">
                        <i className="flaticon-down"></i>
                      </span>
                    </button>
                    <button className="next" onClick={goNext}>
                      <span className="icon">
                        <i className="flaticon-down"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="ul-banner-img-slider-wrapper">
              {/* again dropping 'swiper' class, using flex */}
              <div className="ul-banner-img-slider">
                <div className="flex h-full w-[220%] gap-5">
                  {thumbs.map((img, i) => (
                    <div key={i} className="cursor-pointer">
                      <img
                        src={img}
                        alt={`Banner ${i}`}
                        onClick={() => handleThumbClick(i)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* BANNER SECTION END */}
    </>
  );
};

function BannerSlide({ img, subTitle, title, price, link, extraClass = "" }) {
  return (
    <div className={`ul-banner-slide ${extraClass}`}>
      <div className="ul-banner-slide-img">
        <img src={img} alt="Banner" className="animate-slide-out2" />
      </div>
      <div className="ul-banner-slide-txt">
        <span className="ul-banner-slide-sub-title">{subTitle}</span>
        <h1 className="ul-banner-slide-title">{title}</h1>
        {/* <p className="ul-banner-slide-price">
          Starting From <span className="price">${price}</span>
        </p> */}
        <a href={link} className="ul-btn">
          SHOP NOW <i className="flaticon-up-right-arrow"></i>
        </a>
      </div>
    </div>
  );
}

export default Banner;
