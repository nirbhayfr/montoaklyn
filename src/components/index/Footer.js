import React from "react";
import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-black text-white px-6 py-12 font-roboto-slab">
			{/* Top Section */}
			<div className="max-w-7xl mx-auto flex justify-between">
				{/* Left: Quick Links (40%) */}
				<div className="lg:w-[60%]">
					<h3 className="text-xl font-semibold mb-4">
						Quick Links
					</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<a href="/about" className="hover:underline">
								About Us
							</a>
						</li>
						<li>
							<a
								href="/contact"
								className="hover:underline"
							>
								Contact Us
							</a>
						</li>
						<li>
							<a href="/help" className="hover:underline">
								Help & FAQs
							</a>
						</li>
						<li>
							<a href="/blogs" className="hover:underline">
								Blogs
							</a>
						</li>
						<li>
							<a href="/faqs" className="hover:underline">
								FAQs
							</a>
						</li>
						<li>
							<a
								href="/store-locator"
								className="hover:underline"
							>
								Store Locator
							</a>
						</li>
					</ul>
				</div>

				{/* Right: Logo (60%) */}
				<div className="lg:w-[40%] flex justify-center items-center">
					<img
						src="/assets/img/montoaklynlogo.png"
						alt="Montoaklyn Logo"
						className="max-w-[200px]"
					/>
				</div>
			</div>

			{/* Separator */}
			<div className="my-10 h-px bg-white/30 max-w-7xl mx-auto" />

			{/* Help Desk */}
			<div className="max-w-4xl mx-auto">
				<h3 className="text-xl font-semibold mb-6">Help Desk</h3>

				<div className="grid grid-cols-2 gap-6 text-[0.6rem]">
					<div className="flex items-center gap-3">
						<Phone size={18} />
						<a
							href="tel:+918791676705"
							className="hover:underline"
						>
							+91 8791676705
						</a>
					</div>

					<div className="flex items-center gap-3">
						<Mail size={18} />
						<a
							href="mailto:montoaklyn@gmail.com"
							className="hover:underline"
						>
							montoaklyn@gmail.com
						</a>
					</div>
				</div>
			</div>

			{/* Separator */}
			<div className="my-10 h-px bg-white/30 max-w-7xl mx-auto" />

			{/* Follow Us */}
			<div className="text-center">
				<h3 className="text-xl font-semibold mb-6">Follow Us</h3>

				<div className="flex justify-center gap-4">
					<a
						href="#"
						className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 transition"
					>
						<Facebook size={22} />
					</a>

					<a
						href="https://www.instagram.com/mont_oaklyn"
						target="_blank"
						className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 transition"
					>
						<Instagram size={22} />
					</a>

					<a
						href="#"
						className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 transition"
					>
						<Youtube size={22} />
					</a>
				</div>
			</div>
		</footer>
	);
}
