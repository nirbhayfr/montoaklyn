import React, { useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function SiderBar({ onClose }) {
	const isMobile = useIsMobile();

	return (
		<div
			className="
        fixed top-0 left-0 h-full w-[84%] lg:w-[600px]
        bg-white shadow-2xl z-50
        overflow-y-scroll p-4
        transition-transform duration-300 animate-sidebar-in
        flex flex-col
      "
		>
			{/* Header */}
			<div className="relative mb-6">
				<div className="-mt-4">
					<Link to="/" onClick={onClose}>
						<img
							src="/assets/img/montoaklyn.png"
							alt="logo"
							className="logo scale-125"
						/>
					</Link>
				</div>

				<button
					className="absolute top-0 right-0"
					onClick={onClose}
				>
					<i className="flaticon-close"></i>
				</button>
			</div>

			{/* Desktop About */}
			<div className="hidden lg:block mb-8">
				<span className="block font-semibold mb-2">
					About Montoaklyn
				</span>
				<p className="text-sm text-gray-700">
					Montoaklyn is a premium e-commerce platform celebrating
					the rich heritage of Indian tradition. Our curated
					collection blends timeless craftsmanship with modern
					design, offering everything from traditional attire and
					handcrafted jewelry to artisanal home décor and
					accessories.
				</p>
			</div>

			{/* Desktop Product Slider */}
			{/* <div className="hidden lg:flex gap-4 mb-10">
				<div className="flex-1 min-w-0">
					<Swiper
						modules={[Navigation, Autoplay]}
						slidesPerView={1}
						loop
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
						navigation={{
							prevEl: ".prev",
							nextEl: ".next",
						}}
					>
						{[1, 2, 3].map((item) => (
							<SwiperSlide key={item}>
								<div className="ul-product">
									<div className="ul-product-img">
										<img
											src={`/assets/img/product-img-${item}.jpg`}
											alt="Product"
										/>
									</div>

									<div className="ul-product-txt mt-2">
										<h4 className="font-semibold">
											<Link to="/shopdetails">
												Orange Airsuit
											</Link>
										</h4>
										<p className="text-sm text-gray-600">
											Fashion Bag
										</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className="flex flex-col gap-2">
					<button className="prev">
						<i className="flaticon-left-arrow"></i>
					</button>
					<button className="next">
						<i className="flaticon-arrow-point-to-right"></i>
					</button>
				</div>
			</div> */}

			{/* Mobile Navigation */}
			{isMobile && <MobileSidebarNav onClose={onClose} />}

			{/* Footer */}
			<div className="mt-auto mb-10">
				<span className="block font-semibold mb-3">Follow us</span>

				<div className="flex gap-4">
					<a href="#">
						<i className="flaticon-facebook-app-symbol"></i>
					</a>
					<a
						href="https://www.instagram.com/mont_oaklyn"
						target="_blank"
						rel="noreferrer"
					>
						<i className="flaticon-instagram"></i>
					</a>
				</div>
			</div>
		</div>
	);
}

function MobileSidebarNav({ onClose }) {
	return (
		<div className="block lg:hidden text-sm uppercase pt-4">
			<nav className="flex flex-col border border-black text-gray-800">
				<Link
					to="/"
					onClick={onClose}
					className="py-3 px-4 border-b hover:bg-black hover:text-white transition"
				>
					Home
				</Link>

				<Link
					to="/shop"
					onClick={onClose}
					className="py-3 px-4 border-b hover:bg-black hover:text-white transition"
				>
					Shop
				</Link>

				<Link
					to="/cart"
					onClick={onClose}
					className="py-3 px-4 border-b hover:bg-black hover:text-white transition"
				>
					Cart
				</Link>

				<Link
					to="/profile"
					onClick={onClose}
					className="py-3 px-4 hover:bg-black hover:text-white transition"
				>
					Profile
				</Link>
			</nav>
		</div>
	);
}
