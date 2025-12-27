import React from "react";
import { Link } from "react-router-dom";

export default function TexturedImageGrid() {
	return (
		<>
			<div className="flex flex-col gap-2 items-center justify-center mb-3 mt-8">
				<h3 className="font-medium text-2xl font-bodoni">
					New Collection
				</h3>
				<p className="font-medium text-sm">
					Get them before everyone else does
				</p>
			</div>
			<section
				className="py-3 px-6 bg-cover bg-center"
				style={{
					backgroundImage: "url('/assets/newimg/paper-bg.jpg')",
				}}
			>
				<div className="max-w-6xl mx-auto grid grid-cols-2 gap-10">
					{/* Card 1 */}
					<div className="bg-white p-2 transform -rotate-6">
						<div className="relative aspect-[3/4] overflow-hidden">
							<img
								src="/assets/newimg/img-5.jpg"
								alt=""
								className="w-full h-full object-cover"
							/>

							{/* Gradient */}
							<div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_30%,rgba(0,0,0,0.7)_100%)]" />

							{/* Text */}
							<div className="absolute bottom-3 left-0 right-0 px-3 text-center">
								<h3 className="text-white text-sm font-medium tracking-wide">
									T-SHIRTS
								</h3>
							</div>
						</div>
					</div>

					{/* Card 2 */}
					<div className="bg-white p-2 transform rotate-3">
						<div className="relative aspect-[3/4] overflow-hidden">
							<img
								src="/assets/newimg/img-2.jpg"
								alt=""
								className="w-full h-full object-cover"
							/>

							<div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_30%,rgba(0,0,0,0.7)_100%)]" />

							<div className="absolute bottom-3 left-0 right-0 px-3 text-center">
								<h3 className="text-white text-sm font-medium tracking-wide">
									SHIRTS
								</h3>
							</div>
						</div>
					</div>

					{/* Card 3 */}
					<div className="bg-white p-2 transform rotate-3">
						<div className="relative aspect-[3/4] overflow-hidden">
							<img
								src="/assets/newimg/img-4.jpg"
								alt=""
								className="w-full h-full object-cover"
							/>

							<div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_30%,rgba(0,0,0,0.75)_100%)]" />

							<div className="absolute bottom-3 left-0 right-0 px-3 text-center">
								<h3 className="text-white text-sm font-medium tracking-wide">
									HOODIES
								</h3>
							</div>
						</div>
					</div>

					{/* Card 4 */}
					<div className="bg-white p-2 transform -rotate-1">
						<div className="relative aspect-[3/4] overflow-hidden">
							<img
								src="/assets/newimg/img-16.jpg"
								alt=""
								className="w-full h-full object-cover"
							/>

							<div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_35%,rgba(0,0,0,0.7)_100%)]" />

							<div className="absolute bottom-3 left-0 right-0 px-3 text-center">
								<h3 className="text-white text-sm font-medium tracking-wide">
									JOGGERS
								</h3>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Link
						to="/shop"
						className="mt-3 font-semibold font-roboto-slab text-lg underline"
					>
						Explore All &rarr;
					</Link>
				</div>
			</section>
		</>
	);
}
