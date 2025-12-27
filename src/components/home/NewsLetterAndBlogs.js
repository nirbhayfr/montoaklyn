import React from "react";

export default function NewsLetterAndBlogs() {
	const blogs = [
		{
			date: "20 Dec",
			title: "Winter Essentials You Need",
			text: "Discover must-have pieces to elevate your winter wardrobe effortlessly.",
			image: "/assets/newimg/img-15.jpg",
		},
		{
			date: "15 Dec",
			title: "Global Fashion Trends 2025",
			text: "A deep dive into trends shaping modern global fashion this year.",
			image: "/assets/newimg/img-14.jpg",
		},
		{
			date: "10 Dec",
			title: "Styling Neutrals the Right Way",
			text: "Learn how to style pastel and neutral tones for a premium look.",
			image: "/assets/newimg/img-13.jpg",
		},
	];

	return (
		<>
			<section className="py-8 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="relative rounded-xl overflow-hidden">
						{/* Background Image */}
						<img
							src="/assets/newimg/img-22.jpg"
							alt="Newsletter"
							className="w-full h-[360px] object-cover"
						/>

						{/* Gradient Overlay */}
						<div className="absolute inset-0 bg-[linear-gradient(135deg,#EF2853,#FFA31A)] opacity-70" />

						{/* Content */}
						<div className="absolute inset-0 flex items-center justify-center px-6">
							<div className="text-center text-white max-w-xl w-full">
								<h2 className="text-3xl md:text-4xl font-semibold mb-2 font-bodoni">
									Sign up to newsletter
								</h2>

								<p className="text-xs tracking-[0.3em] uppercase mb-8">
									GET NEWSLETTER
								</p>

								{/* Input Group */}
								<div className="relative bg-white rounded-md">
									<input
										type="email"
										placeholder="Enter your email"
										className="w-full px-3 pr-20 py-2 text-sm text-black outline-none bg-transparent rounded-md"
									/>

									<button
										className="absolute right-2 top-1/2 -translate-y-1/2 
	max-w-[3.5rem] px-2 py-1 text-[.4rem] font-medium uppercase text-white 
	rounded-md bg-[linear-gradient(90deg,#EF2853,#FFA31A)]
	whitespace-normal break-words text-center leading-tight"
									>
										Subscribe Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-8">
				{/* Heading */}
				<div className="max-w-7xl mx-auto text-center mb-12">
					<h2 className="text-2xl font-semibold mb-2 font-bodoni">
						Latest News & Blogs
					</h2>
				</div>

				{/* Slider */}
				<div className="overflow-x-auto no-scrollbar">
					<div className="flex gap-4 w-max px-4">
						{blogs.map((blog, idx) => (
							<div
								key={idx}
								className="relative w-[70vw] md:w-[40vw] lg:w-[32vw] h-[300px] flex-shrink-0 overflow-hidden rounded-lg"
							>
								{/* Background Image */}
								<img
									src={blog.image}
									alt={blog.title}
									className="absolute inset-0 w-full h-full object-cover"
								/>

								{/* Date Tag */}
								<div className="absolute top-4 left-4 bg-[#EF2853] text-white text-xs px-3 py-1 z-10">
									{blog.date}
								</div>

								{/* Bottom Overlay */}
								<div className="absolute bottom-0 left-0 right-0 h-[40%] bg-black/70 p-3 flex flex-col justify-between">
									<div>
										<h3 className="text-white text-sm font-medium mb-2">
											{blog.title}
										</h3>
										<p className="text-xs text-gray-200 leading-relaxed">
											{blog.text}
										</p>
									</div>

									<div className="text-right">
										<button className="text-white text-xs underline underline-offset-4">
											Read More ...
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
