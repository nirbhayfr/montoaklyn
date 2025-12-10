import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../../data/Data";

// export const products2 = [
//   {
//     id: 31,
//     price: "$99.00",
//     discount: "25% Off",
//     img: "assets/img/product-img-sm-1.jpg",
//     title: "Orange Airsuit",
//     category: "best-selling",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//     productdescription:
//       "fherugheruyghuoerhfgvuijfdhguiverhuigyrugherouighjerufhgeruifjghuerhgerhgujerhgu",
//   },
//   {
//     id: 32,
//     price: "$89.00",
//     discount: "10% Off",
//     img: "assets/img/product-img-sm-2.jpg",
//     title: "Blue Backpack",
//     category: "on-selling",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//     productdescription: "kunalsingh",
//   },
//   {
//     id: 33,
//     price: "$120.00",
//     discount: "30% Off",
//     img: "assets/img/product-img-sm-3.jpg",
//     title: "Leather Handbag",
//     category: "top-rating",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//   },
//   {
//     id: 34,
//     price: "$70.00",
//     discount: "15% Off",
//     img: "assets/img/product-img-sm-4.jpg",
//     title: "Stylish Tote",
//     category: "best-selling",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//   },
//   {
//     id: 35,
//     price: "$60.00",
//     discount: "20% Off",
//     img: "assets/img/product-img-sm-5.jpg",
//     title: "Canvas Shopper",
//     category: "on-selling",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//   },
//   {
//     id: 36,
//     price: "$110.00",
//     discount: "18% Off",
//     img: "assets/img/product-img-sm-6.jpg",
//     title: "Compact Purse",
//     category: "top-rating",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//   },
//   {
//     id: 37,
//     price: "$95.00",
//     discount: "12% Off",
//     img: "assets/img/product-img-sm-7.jpg",
//     title: "Classic Satchel",
//     category: "best-selling",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//   },
//   {
//     id: 38,
//     price: "$80.00",
//     discount: "8% Off",
//     img: "assets/img/product-img-sm-8.jpg",
//     title: "Urban Crossbody",
//     category: "on-selling",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//   },
//   {
//     id: 39,
//     price: "$95.00",
//     discount: "10% Off",
//     img: "assets/img/product-img-sm-9.jpg",
//     title: "Slim Laptop Bag",
//     category: "top-rating",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//   },
//   {
//     id: 40,
//     price: "$105.00",
//     discount: "15% Off",
//     img: "assets/img/product-img-sm-10.jpg",
//     title: "Sport Duffel",
//     category: "best-selling",
//     detailsUrl: "/shopdetails",
//     categoryUrl: "/shop",
//     quantity: 1,
//   },
// ];

const MostSellingSection = () => {
	const [activeFilter, setActiveFilter] = useState("all");
	const navigate = useNavigate();

	const filteredProducts =
		activeFilter === "all"
			? products
			: products.filter(
					(p) => p.productSellingCategory === activeFilter
			  );

	const handleFilterChange = (filter) => {
		setActiveFilter(filter);
	};

	return (
		<div className="ul-container">
			<section className="ul-products ul-most-selling-products">
				<div className="ul-inner-container">
					{/* Heading */}
					<div className="ul-section-heading flex-lg-row flex-column text-md-start text-center">
						<div className="left">
							<span className="ul-section-sub-title">
								most selling items
							</span>
							<h2 className="ul-section-title">
								Top selling Categories This Week
							</h2>
						</div>

						{/* Filter Tabs */}
						<div className="right">
							<div className="ul-most-sell-filter-navs">
								{[
									{
										label: "All Products",
										value: "all",
									},
									{
										label: "Best Selling",
										value: "best-selling",
									},
									{
										label: "On Selling",
										value: "on-selling",
									},
									{
										label: "Top Rating",
										value: "top-rating",
									},
								].map((tab) => (
									<button
										key={tab.value}
										type="button"
										className={
											activeFilter ===
											tab.value
												? "active"
												: ""
										}
										onClick={() =>
											handleFilterChange(
												tab.value
											)
										}
									>
										{tab.label}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Product Grid */}
					<div className="ul-bs-row row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-2 ul-filter-products-wrapper">
						{/* {filteredProducts.map((product, index) => (
              <div
                onClick={() => {
                  console.log(`/shopdetails/${product.id}`);
                  navigate(`/shopdetails/${product.id}`);
                }}
                key={product.id}
                className={`mix col ${product.productSellingCategory} fade-in-up `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
               
                <div className="ul-product-horizontal h-48">
                  <div className="ul-product-horizontal-img ">
                    <img
                      src={`${product.images[0]}`}
                      alt="Product"
                      loading="lazy"
                      style={{
                        objectFit: "fill",
                        width: "100px",
                        height: "101px",
                        // height: "px",
                      }}
                    />
                  </div>

                  <div className="ul-product-horizontal-txt">
                    <span className="ul-product-price">{product.price}</span>
                    <h4 className="ul-product-title">
                      <a href={`/shopdetails/${product.id}`}>{product.title}</a>
                    </h4>
                    <h5 className="ul-product-category">
                      <a href="/shop">Fashion Bag</a>
                    </h5>
                    <div className="ul-product-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">
                          <i className="flaticon-star"></i>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))} */}

						{filteredProducts.map((product, index) => (
							<TopSellingProductCard
								product={product}
								key={index}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default MostSellingSection;

export const TopSellingProductCard = ({ product, onAddClick, onQuickAdd }) => {
	const {
		id,
		price,
		oldPrice,
		images,
		title,
		category,
		detailsUrl,
		categoryUrl,
	} = product;

	const navigate = useNavigate();

	return (
		<div className="col">
			<div
				className="top-selling-card relative"
				onClick={() => navigate(`/shopdetails/${id}`)}
				style={{
					cursor: "pointer",
					width: "100%",
					borderRadius: "6px",
					overflow: "hidden",
					background: "#fff",
					boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
					transition: "transform 0.15s ease",
				}}
			>
				{/* IMAGE */}
				<div
					className="top-selling-image"
					style={{
						position: "relative",
						width: "100%",
						height: "320px", // Desktop default
					}}
				>
					{/* NEW TAG */}
					<span
						style={{
							position: "absolute",
							top: "10px",
							left: "10px",
							background: "#FFA500",
							color: "#000",
							padding: "3px 6px",
							fontSize: "9px",
							fontWeight: "bold",
							borderRadius: "4px",
							textTransform: "uppercase",
							zIndex: 2,
						}}
					>
						New In
					</span>

					<img
						src={images[0]}
						alt={title}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectFit: "cover",
							objectPosition: "top center",
						}}
					/>
				</div>

				{/* CENTERED SEPARATOR */}
				<div
					style={{
						width: "40px",
						height: "2px",
						background: "#ef2853",
						margin: "10px auto",
					}}
				/>

				{/* PRODUCT NAME */}
				<div className="px-3">
					<h4
						className="text-sm font-semibold"
						style={{ lineHeight: "1.2" }}
					>
						{title.length > 15
							? title.substring(0, 15) + "..."
							: title}
					</h4>
				</div>

				{/* PRICE + DISCOUNT */}
				<div className="px-3 pb-3 mt-2">
					{(() => {
						const numericPrice = Number(
							price?.toString().replace(/\D/g, "")
						);
						const numericOldPrice = Number(
							oldPrice?.toString().replace(/\D/g, "")
						);

						const discount =
							numericOldPrice && numericPrice
								? Math.round(
										((numericOldPrice -
											numericPrice) /
											numericOldPrice) *
											100
								  )
								: 0;

						return (
							<div className="flex items-center gap-2 text-sm font-medium">
								<span className="text-black font-semibold text-base">
									Rs {numericPrice}
								</span>

								{numericOldPrice > numericPrice && (
									<span className="text-gray-400 line-through text-xs">
										Rs {numericOldPrice}
									</span>
								)}

								{discount > 0 && (
									<span
										style={{
											background: "#f5f5f5",
											color: "#333",
											padding: "2px 5px",
											fontSize: "9px",
											fontWeight: 600,
											borderRadius: "10px",
											border: "1px solid #dedede",
											whiteSpace: "nowrap",
										}}
									>
										{discount}% OFF
									</span>
								)}
							</div>
						);
					})()}
				</div>
			</div>
		</div>
	);
};
