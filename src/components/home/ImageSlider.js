import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
	{
		id: 1,
		image: "/assets/newimg/img-3.jpg",
		text: "Not Loud, Just Rare",
		buttonColor: "black",
		textColor: "black",
		font: "font-roboto",
	},
	{
		id: 2,
		image: "/assets/newimg/img-18.jpg",
		text: "Sale 60% off",
		buttonColor: "black",
		textColor: "red",
		font: "font-roboto-slab",
		fontWeight: 500,
		fontStyle: "italic",
	},
	{
		id: 3,
		image: "/assets/newimg/img-19.jpg",
		text: "WINTER Edit'25",
		buttonColor: "black",
		textColor: "#E4B400",
		font: "font-rye",
		fontSize: "40px",
	},
];

const ImageSlider = () => {
	const [index, setIndex] = useState(0);

	// Auto fade every 4 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % slides.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="fade-banner">
			{/* Dots */}
			{/* <div className="fade-dots">
				{slides.map((_, i) => (
					<span
						key={i}
						className={`dot ${i === index ? "active" : ""}`}
					/>
				))}
			</div> */}

			{/* Images + Text */}
			{slides.map((slide, i) => (
				<div
					key={slide.id}
					className={`fade-slide ${i === index ? "active" : ""}`}
				>
					<div className="fade-image-wrapper">
						<img src={slide.image} alt={slide.text} />
						<div className="fade-gradient"></div>
					</div>
					<div className="fade-content">
						<h2
							style={{
								color: slide.textColor,
								fontWeight: slide.fontWeight,
								fontStyle: slide.fontStyle,
								fontSize: slide.fontSize,
							}}
							className={slide.font}
						>
							{slide.text}
						</h2>

						<Link
							to="/shop"
							type="button"
							className="fade-btn"
							style={{
								backgroundColor: slide.buttonColor,
							}}
						>
							Shop Now
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default ImageSlider;
