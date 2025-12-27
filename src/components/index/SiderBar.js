import React, { useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

export default function SiderBar({ onClose }) {
	const isMobile = useIsMobile();
	return (
		<div
			className="border-l-2 border-red-500 fixed top-0 left-0 h-full overflow-x-hidden p-2 py-4 overflow-y-scroll w-[84%] lg:w-[600px] bg-white shadow-2xl z-50 transition-transform duration-300 animate-sidebar-in
   
    flex 
    flex-col
    "
		>
			{/* <!-- header --> */}
			<div className="ul-sidebar-header relative">
				<div className="ul-sidebar-header-logo  -mt-4">
					<a href="/">
						<img
							src="/assets/img/montoaklyn.png"
							alt="logo"
							className="logo scale-125"
						/>
					</a>
				</div>
				{/* <!-- sidebar closer --> */}
				<button
					className="ul-sidebar-closer  absolute top-0 right-0"
					onClick={onClose}
				>
					<i className="flaticon-close "></i>
				</button>
			</div>

			<div className="ul-sidebar-header-nav-wrapper d-block d-lg-none"></div>

			<div className="ul-sidebar-about d-none d-lg-block">
				<span className="title">About Montoaklyn</span>
				<p className="mb-0">
					Montoaklyn is a premium e-commerce platform celebrating
					the rich heritage of Indian tradition. Our curated
					collection blends timeless craftsmanship with modern
					design, offering everything from traditional attire and
					handcrafted jewelry to artisanal home décor and
					accessories. Each product tells a story of India’s
					vibrant culture, made by skilled artisans from across
					the country. At Montoaklyn, we believe in preserving
					traditions while embracing contemporary elegance —
					bringing the essence of India to your doorstep.
				</p>
			</div>

			<div className="ul-sidebar-products-wrapper d-none d-lg:flex">
				{/* LEFT: slider */}
				<div className="ul-sidebar-products-slider flex-1 min-w-0">
					<Swiper
						modules={[Navigation, Autoplay]}
						slidesPerView={1}
						loop={true}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
						navigation={{
							prevEl: ".prev", // hook to your existing buttons
							nextEl: ".next",
						}}
						className="swiper"
					>
						{/* product card 1 */}
						<SwiperSlide className="swiper-slide">
							<div className="ul-product">
								<div className="ul-product-heading">
									<span className="ul-product-price">
										$99.00
									</span>
									<span className="ul-product-discount-tag">
										25% Off
									</span>
								</div>

								<div className="ul-product-img">
									<img
										src="assets/img/product-img-1.jpg"
										alt="Product Image"
									/>

									<div className="ul-product-actions">
										<button>
											<i className="flaticon-shopping-bag"></i>
										</button>
										<a href="#">
											<i className="flaticon-hide"></i>
										</a>
										<button>
											<i className="flaticon-heart"></i>
										</button>
									</div>
								</div>

								<div className="ul-product-txt">
									<h4 className="ul-product-title">
										<a href="/shopdetails">
											Orange Airsuit
										</a>
									</h4>
									<h5 className="ul-product-category">
										<a href="/shop">
											Fashion Bag
										</a>
									</h5>
								</div>
							</div>
						</SwiperSlide>

						{/* product card 2 */}
						<SwiperSlide className="swiper-slide">
							<div className="ul-product">
								<div className="ul-product-heading">
									<span className="ul-product-price">
										$99.00
									</span>
									<span className="ul-product-discount-tag">
										25% Off
									</span>
								</div>

								<div className="ul-product-img">
									<img
										src="assets/img/product-img-2.jpg"
										alt="Product Image"
									/>

									<div className="ul-product-actions">
										<button>
											<i className="flaticon-shopping-bag"></i>
										</button>
										<a href="#">
											<i className="flaticon-hide"></i>
										</a>
										<button>
											<i className="flaticon-heart"></i>
										</button>
									</div>
								</div>

								<div className="ul-product-txt">
									<h4 className="ul-product-title">
										<a href="/shop-details">
											Orange Airsuit
										</a>
									</h4>
									<h5 className="ul-product-category">
										<a href="/shop">
											Fashion Bag
										</a>
									</h5>
								</div>
							</div>
						</SwiperSlide>

						{/* product card 3 */}
						<SwiperSlide className="swiper-slide">
							<div className="ul-product">
								<div className="ul-product-heading">
									<span className="ul-product-price">
										$99.00
									</span>
									<span className="ul-product-discount-tag">
										25% Off
									</span>
								</div>

								<div className="ul-product-img">
									<img
										src="assets/img/product-img-2.jpg"
										alt="Product Image"
									/>

									<div className="ul-product-actions">
										<button>
											<i className="flaticon-shopping-bag"></i>
										</button>
										<a href="#">
											<i className="flaticon-hide"></i>
										</a>
										<button>
											<i className="flaticon-heart"></i>
										</button>
									</div>
								</div>

								<div className="ul-product-txt">
									<h4 className="ul-product-title">
										<a href="/shopdetails">
											Orange Airsuit
										</a>
									</h4>
									<h5 className="ul-product-category">
										<a href="/shop">
											Fashion Bag
										</a>
									</h5>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>

				{/* RIGHT: the nav arrows */}
				<div className="ul-sidebar-products-slider-nav flex-shrink-0 flex flex-col gap-2">
					<button className="prev">
						<i className="flaticon-left-arrow"></i>
					</button>
					<button className="next">
						<i className="flaticon-arrow-point-to-right"></i>
					</button>
				</div>
			</div>

			{/* keep your about section same */}
			<div className="ul-sidebar-about d-none d-lg-block">
				<p className="mb-0">
					Phasellus eget fermentum mauris. Suspendisse nec
					dignissim nulla. Integer non quam commodo, scelerisque
					felis id, eleifend turpis. Phasellus in nulla quis erat
					tempor tristique eget vel purus. Nulla pharetra
					pharetra pharetra. Praesent varius eget justo ut
					lacinia. Phasellus pharetra, velit viverra lacinia
					consequat, ipsum odio mollis dolor, nec facilisis arcu
					arcu ultricies sapien. Quisque ut dapibus nunc. Vivamus
					sit amet efficitur velit. Phasellus eget fermentum
					mauris. Suspendisse nec dignissim nulla. Integer non
					quam commodo, scelerisque felis id, eleifend turpis.
					Phasellus in nulla quis erat tempor tristique eget vel
					purus. Nulla pharetra pharetra pharetra. Praesent
					varius eget justo ut lacinia. Phasellus pharetra velit.
				</p>
			</div>
			<div>{isMobile && <MobileSidebarNav />}</div>
			{/* <!-- sidebar footer --> */}
			<div className="ul-sidebar-footer mb-12">
				<span className="ul-sidebar-footer-title">Follow us</span>

				<div className="ul-sidebar-footer-social">
					<a href="#">
						<i className="flaticon-facebook-app-symbol"></i>
					</a>
					{/* <a href="#">
            <i className="flaticon-twitter"></i>
          </a> */}
					<a
						href="https://www.instagram.com/mont_oaklyn?igsh=MWxxbWwxNHZ5YmE1cw%3D%3D&utm_source=qr"
						target="_blank"
					>
						<i className="flaticon-instagram"></i>
					</a>
					{/* <a href="#">
            <i className="flaticon-youtube"></i>
          </a> */}
				</div>
			</div>
		</div>
	);
}

function MobileSidebarNav() {
	const [openMegaMenu, setOpenMegaMenu] = useState(false);

	return (
		<div className="block lg:hidden text-[13px] uppercase pt-4">
			{/* Wrapper */}
			<div className=" bg-white  w-full">
				<nav className="flex flex-col   border border-black   text-gray-800 ">
					{/* Main Links */}
					<a href="/" className=" py-2 px-4 hover:text-red-600">
						Home
					</a>
					<a
						href="/shop"
						className="border-t py-2 px-4 hover:text-red-600"
					>
						Shop
					</a>
					<a
						href="/shop"
						className="border-t py-2 px-4 hover:text-red-600"
					>
						Fabric's
					</a>
					<a
						href="/shop"
						className="border-t py-2 px-4  hover:text-red-600"
					>
						Men's
					</a>
				</nav>
			</div>
		</div>
	);
}
