import React from "react";
import { Link } from "react-router-dom";

export default function Exclusive() {
	return (
		<section className="py-8">
			{/* SECTION HEADINGS */}
			<div className="flex flex-col gap-2 items-center justify-center mb-3">
				<h3 className="font-medium text-2xl font-bodoni">
					Montoaklyn’s Exclusive
				</h3>
				<p className="font-medium text-sm">
					Trendy Global Style for Extraordinary You
				</p>
			</div>

			{/* SLIDER */}
			<div className="overflow-x-auto no-scrollbar">
				<div className="flex gap-8 px-6 snap-x snap-mandatory">
					{/* Slide 1 */}
					<div className="snap-start shrink-0 w-[70vw] h-[300px] relative">
						<img
							src="/assets/newimg/img-12.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/30" />
						<div className="absolute inset-0 flex items-end justify-center pb-10">
							<Link
								to="/shop"
								className="text-white underline underline-offset-4 tracking-wide"
							>
								Shop the look
							</Link>
						</div>
						<div className="absolute inset-0 flex items-end justify-center pb-28 text-center">
							<p className="text-amber-400 text-4xl font-extrabold translate -rotate-12 tracking-wide font-roboto-slab">
								Back To College
							</p>
						</div>
					</div>

					{/* Slide 2 */}
					<div className="snap-start shrink-0 w-[70vw] h-[300px] relative">
						<img
							src="/assets/newimg/img-21.jpeg"
							alt=""
							className="w-full h-full object-cover object-top"
						/>
						<div className="absolute inset-0 bg-black/30" />
						<div className="absolute inset-0 flex items-end justify-center pb-10">
							<Link
								to="/shop"
								className="text-white underline underline-offset-4 tracking-wide"
							>
								Shop the look
							</Link>
						</div>
						<div className="absolute inset-0 flex items-end justify-center pb-28 text-left">
							<p className="text-white text-2xl tracking-wide font-rye">
								Traditional Vibes
							</p>
						</div>
					</div>

					{/* Slide 3 */}
					<div className="snap-start shrink-0 w-[70vw] h-[300px] relative">
						<img
							src="/assets/newimg/img-11.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/30" />
						<div className="absolute inset-0 flex items-end justify-center pb-10">
							<Link
								to="/shop"
								className="text-white underline underline-offset-4 tracking-wide"
							>
								Shop the look
							</Link>
						</div>
						<div className="absolute inset-0 flex items-end justify-center pb-16 text-right px-4">
							<p className="text-white text-xl tracking-wide font-bodoni">
								Celebrate Your Kind Of Party
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
