import React, { useEffect, useState } from "react";
// import "./Carousel.css"; // Custom CSS for animation

// const slides = [
//   "/images/miniture/slider-1.jpeg",
//   "/images/miniture/slider-2.jpeg",
//   "/images/miniture/slider-3.jpeg",
// ];

const Carousel = ({ slides }) => {
  const [slide, setSlide] = useState(0);

  const next = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1);
  };

  const prev = () => {
    setSlide(slide === 0 ? slides.length - 1 : slide - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [slide]);
  return (
    <div className="w-[70vh] flex gap-2 relative overflow-hidden ">
      <img
        key={slide} // force re-render for animation
        className="slide-animation w-full object-fill  rounded-md"
        // slide from left
        src={slides[slide]}
        alt=""
      />

      {slides.length > 1 && (
        <div className="absolute  inset-0 flex justify-between items-center p-2">
          <div
            onClick={prev}
            className="rounded-full size-8 border-2 bg-gray-50 hover:bg-white flex justify-center items-center cursor-pointer"
          >
            <LeftChevron />
          </div>
          <div
            onClick={next}
            className="rounded-full size-8 border-2 bg-gray-50 hover:bg-white flex justify-center items-center cursor-pointer"
          >
            <RightChevron />
          </div>
        </div>
      )}
    </div>
  );
};

const LeftChevron = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="4"
    stroke="currentColor"
    className="size-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

const RightChevron = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="4"
    stroke="currentColor"
    className="size-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

export default Carousel;
