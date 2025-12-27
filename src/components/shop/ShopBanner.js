function ShopBanner() {
	return (
		<section className="-mt-10">
			<div
				className="relative overflow-hidden"
				style={{
					background:
						"linear-gradient(90deg, #000000 0%, #1a1a1a 35%, #3a3a3a 65%, #4a4a4a 85%, #3a3a3a 100%)",
				}}
			>
				<div className="max-w-7xl mx-auto grid grid-cols-2 items-center gap-6 px-2 py-12">
					{/* LEFT CONTENT */}
					<div className="text-white">
						<p className="text-sm tracking-wide mb-2 text-amber-400">
							Upto
						</p>

						<h2 className="text-7xl leading-none font-bold font-bodoni">
							50% OFF
						</h2>

						<span className="inline-block mt-6 uppercase px-1 py-1 font-semibold bg-amber-400 text-black text-xs ">
							On almost everything
						</span>
					</div>

					{/* RIGHT IMAGE */}
					<div className="relative">
						<img
							src="/assets/newimg/hanger.png"
							alt="Offer"
							className="w-[120%] max-w-none ml-auto"
						/>
					</div>
				</div>

				{/* Dark vignette on right (top & bottom never white) */}
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(0,0,0,0)_20%,rgba(0,0,0,0.5)_80%)]" />
			</div>
		</section>
	);
}

export default ShopBanner;
