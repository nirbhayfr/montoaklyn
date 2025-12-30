import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Timer() {
	// Example: 3 days, 8 hours
	const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60 + 8 * 60 * 60);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const days = String(Math.floor(timeLeft / (24 * 3600))).padStart(2, "0");
	const hours = String(Math.floor((timeLeft % (24 * 3600)) / 3600)).padStart(
		2,
		"0"
	);
	const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(
		2,
		"0"
	);
	const seconds = String(timeLeft % 60).padStart(2, "0");

	return (
		<section className="w-full">
			{/* TOP SECTION */}
			<div
				className="relative pl-6 py-8 overflow-hidden"
				style={{
					background:
						"radial-gradient(circle at left, #c2410c 0%, #3b1d0f 70%)",
				}}
			>
				<div className="max-w-7xl mx-auto grid grid-cols-2 items-center">
					{/* LEFT CONTENT */}
					<div className="relative z-10 text-white flex flex-col h-full">
						<h2 className="text-4xl md:text-5xl font-bodoni mb-4">
							Men&apos;s Collection
						</h2>

						<p className="text-sm tracking-wide mb-6 uppercase">
							Upgrade your wardrobe effortlessly
						</p>

						<span className="inline-block bg-white text-black text-xs px-4 py-1 rounded-md w-fit mb-16">
							Up to 30% Off
						</span>

						<div className="mt-auto">
							<Link
								to="/shop"
								className="text-white underline underline-offset-4 tracking-wide"
							>
								Explore Now &rarr;
							</Link>
						</div>
					</div>

					{/* RIGHT IMAGE */}
					<div className="absolute z-0 overflow-hidden right-0">
						<img
							src="/assets/newimg/no-bg.png"
							alt="Men's Collection"
							className="
                                        w-[100%]
                                        ml-auto
                                        
                                        max-w-none
                                        scale-x-[-1]
                                    "
						/>
					</div>
				</div>
			</div>

			{/* BOTTOM STRIP */}
			<div className="bg-black py-4">
				<div className="max-w-7xl mx-auto flex items-center justify-center gap-8 text-center">
					<span className="text-[#d4af37] text-sm tracking-wide">
						Secret Santa Sale ends in:
					</span>

					<div className="flex gap-3">
						{[
							{ value: days, label: "Days" },
							{ value: hours, label: "Hours" },
							{ value: minutes, label: "Minutes" },
							{ value: seconds, label: "Seconds" },
						].map((item) => (
							<div
								key={item.label}
								className="flex flex-col items-center"
							>
								<span className="text-[#d4af37] text-sm font-semibold">
									{item.value}
								</span>
								<span className="text-[#d4af37] text-[0.5rem] tracking-wide uppercase">
									{item.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
