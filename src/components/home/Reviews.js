import React from "react";
import { Star } from "lucide-react";

const reviews = [
	{
		rating: 4.3,
		date: "22 Dec 2025",
		text: "The quality exceeded my expectations. Fabric feels premium and the fit is perfect.",
		name: "Aarav Mehta",
		image: "/assets/newimg/img-10.jpg",
	},
	{
		rating: 4.9,
		date: "18 Dec 2025",
		text: "Absolutely love the styling. Minimal yet classy. Delivery was quick and packaging was great.",
		name: "Ritik Sharma",
		image: "/assets/newimg/img-8.jpg",
	},
	{
		rating: 4.6,
		date: "12 Dec 2025",
		text: "Great experience overall. The colors look even better in person. Worth the price.",
		name: "Karan Verma",
		image: "/assets/newimg/img-7.jpg",
	},
];

export default function CustomerReviews() {
	return (
		<section className="py-8">
			{/* Heading */}
			<div className="flex flex-col gap-2 items-center justify-center mb-6 mt-8">
				<h3 className="font-medium text-2xl font-bodoni">
					Customer Reviews
				</h3>
				<p className="font-medium text-sm">
					Real reviews from real people
				</p>
			</div>

			{/* Slider */}
			<div className="overflow-x-auto no-scrollbar">
				<div className="flex gap-8 w-max px-8">
					{reviews.map((review, idx) => (
						<div
							key={idx}
							className="w-[70vw] md:w-[35vw] lg:w-[32vw] flex-shrink-0"
						>
							<div className=" h-full flex flex-col">
								{/* Rating + Date */}
								<div className="flex items-center justify-between mb-4">
									<span className="flex items-center gap-2 bg-black text-white text-xs px-3 py-1 rounded-full">
										{review.rating}
										<Star
											size={14}
											className="text-[#d4af37]"
											fill="#d4af37"
										/>
									</span>

									<span className="text-xs text-gray-400">
										{review.date}
									</span>
								</div>

								{/* Review Text */}
								<p className="text-xs text-gray-700 leading-relaxed mb-6">
									{review.text}
								</p>

								{/* Name */}
								<p className="text-sm font-medium mb-3">
									{review.name}
								</p>

								{/* Image */}
								<img
									src={review.image}
									alt={review.name}
									className="w-full h-40 object-cover object-top rounded-lg"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
