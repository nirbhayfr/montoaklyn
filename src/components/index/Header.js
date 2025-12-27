import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SiderBar from "./SiderBar";

export const Header = () => {
	const state = useSelector((state) => state.cart.data);
	const [items, setItem] = useState(0);
	const [open, setOpen] = useState(false);

	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("all");
	const navigate = useNavigate();

	useEffect(() => {
		setItem(state.length);

		const opener = document.querySelector(
			".ul-header-mobile-search-opener"
		);
		const closer = document.querySelector(
			".ul-header-mobile-search-closer"
		);
		const searchWrapper = document.querySelector(
			".ul-header-search-form-wrapper"
		);

		const openSearch = () => searchWrapper?.classList.add("active");
		const closeSearch = () => searchWrapper?.classList.remove("active");

		if (opener && searchWrapper)
			opener.addEventListener("click", openSearch);
		if (closer && searchWrapper)
			closer.addEventListener("click", closeSearch);

		return () => {
			if (opener) opener.removeEventListener("click", openSearch);
			if (closer) closer.removeEventListener("click", closeSearch);
		};
	}, [state]);
	const onSubmit = (e) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (query.trim()) params.set("q", query.trim());
		if (category && category !== "all") params.set("cat", category);
		navigate(`/search?${params.toString()}`);
	};

	return (
		<div className="ul-header ">
			{/* header top */}
			<div className="cursor-default h-8 bg-black ul-header-top overflow-hidden whitespace-nowrap text-white flex items-center">
				<p className="mx-auto text-[.7rem] py-1 flex items-center gap-1 font-roboto-slab">
					Enjoy extra 10% off on your first purchase{" "}
					<span className="size-4">
						<img src="/assets/newimg/sparkle.png" alt="" />
					</span>
				</p>
			</div>

			{/* header bottom */}

			{/* logo alignmenr margin */}

			<div className="ul-header-bottom  -mt-12">
				<div className="ul-container">
					<div className="ul-header-bottom-wrapper">
						{/* header left */}
						<div className="header-bottom-left">
							<div className="d-inline-flex">
								<button
									className="ul-header-sidebar-opener"
									onClick={() => setOpen(!open)}
								>
									<i className="flaticon-hamburger"></i>
								</button>
							</div>

							<div className="logo-container relative mx-auto">
								{/* Black background below logo */}
								<div className="absolute right-0 top-8 rounded-md left-0  -z-10 h-[30px] lg:h-[65px]" />

								<a href="/" className="d-inline-block">
									<img
										src="/assets/img/montoaklyn.png"
										alt="logo"
										className="logo scale-150 relative z-10"
									/>
								</a>
							</div>

							{/* search form */}
							<div className="ul-header-search-form-wrapper flex-grow-1 flex-shrink-0">
								<form
									className="ul-header-search-form"
									onSubmit={onSubmit}
								>
									<div className="dropdown-wrapper">
										<select
											name="search-category"
											id="ul-header-search-category"
											value={category}
											onChange={(e) =>
												setCategory(
													e.target.value
												)
											}
										>
											<option
												value="all"
												data-placeholder="true"
											>
												All Categories
											</option>
											<option value="clothing">
												Clothing
											</option>
											<option value="clothing">
												Fabric
											</option>
											{/* <option value="watches">Watches</option>
                      <option value="jewellery">Jewellery</option>
                      <option value="glasses">Glasses</option> */}
											{/* map your app categories as needed */}
										</select>
									</div>

									<div className="ul-header-search-form-right">
										<input
											type="search"
											name="header-search"
											id="ul-header-search"
											placeholder="Search Here"
											value={query}
											onChange={(e) =>
												setQuery(
													e.target.value
												)
											}
										/>
										<button type="submit">
											<span className="icon">
												<i className="flaticon-search-interface-symbol"></i>
											</span>
										</button>
									</div>
								</form>

								<button className="ul-header-mobile-search-closer d-xxl-none">
									<i className="flaticon-close"></i>
								</button>
							</div>
						</div>

						{/* header nav */}
						<div className="ul-header-nav-wrapper">
							<div className="to-go-to-sidebar-in-mobile">
								<nav className="ul-header-nav">
									<a href="/">Home</a>
									<a href="/shop">Shop</a>
									<a href="/shop">Men's</a>
									<a href="/shop">Fabric's</a>
								</nav>
							</div>
						</div>

						{/* actions */}
						<div className="ul-header-actions">
							<button className="ul-header-mobile-search-opener d-xxl-none">
								<i className="flaticon-search-interface-symbol"></i>
							</button>
							{/* <a href="/login"><i className="flaticon-user"></i></a> */}
							{/* <a href="/wishlist">
								<i className="flaticon-heart"></i>
							</a> */}
							<a href="/cart">
								<i className="flaticon-shopping-bag relative">
									<span className="text-[8px] font-semibold absolute -top-2 -right-1.5 bg-red-500 text-white rounded-full size-3 text-center items-center">
										{items}
									</span>
								</i>
							</a>
						</div>

						{/* sidebar opener */}
					</div>
				</div>
			</div>

			{open && <SiderBar onClose={() => setOpen(false)} />}
		</div>
	);
};
