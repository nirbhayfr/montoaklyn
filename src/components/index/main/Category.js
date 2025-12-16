import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../api/productService";

const CategorySection = () => {
	const [apiCategories, setApiCategories] = useState([]);

	// ⭐ Fetch categories
	useEffect(() => {
		fetchCategories()
			.then((res) => {
				console.log("CATEGORIES:", res.data);
				setApiCategories(res.data);
			})
			.catch((err) => console.error("Category API error:", err));
	}, []);

	return (
		<>
			{/* CATEGORY SECTION START */}
			<div className="ul-container">
				<section className="ul-categories">
					<div className="ul-inner-container">
						<div className="row row-cols-lg-4 row-cols-md-3 row-cols-2 row-cols-xxs-1 ul-bs-row justify-content-center">
							{/* single category */}

							{apiCategories.map((cat) => (
								<div className="col ">
									<a
										className="ul-category"
										href="/shop"
									>
										<div className="ul-category-img">
											<img
												src={cat.image}
												alt="Category"
											/>
										</div>
										<div className="ul-category-txt">
											<span>{cat.name}</span>
										</div>
										<div className="ul-category-btn">
											<span>
												<i className="flaticon-arrow-point-to-right"></i>
											</span>
										</div>
									</a>
								</div>
							))}

							{/* single category */}
							{/* <div className="col">
                <a className="ul-category" href="/shop">
                  <div className="ul-category-img">
                    <img src="assets/img/category-1.jpg" alt="Category" />
                  </div>
                  <div className="ul-category-txt">
                    <span>Men</span>
                  </div>
                  <div className="ul-category-btn">
                    <span>
                      <i className="flaticon-arrow-point-to-right"></i>
                    </span>
                  </div>
                </a>
              </div> */}

							{/* single category
              <div className="col">
                <a className="ul-category" href="/shop">
                  <div className="ul-category-img">
                    <img src="assets/img/category-2.jpg" alt="Category" />
                  </div>
                  <div className="ul-category-txt">
                    <span>Kids</span>
                  </div>
                  <div className="ul-category-btn">
                    <span>
                      <i className="flaticon-arrow-point-to-right"></i>
                    </span>
                  </div>
                </a>
              </div>

              {/* single category */}

							{/* single category */}
							{/* <div className="col">
                <a className="ul-category" href="/shop">
                  <div className="ul-category-img">
                    <img src="assets/img/category-4.jpg" alt="Category" />
                  </div>
                  <div className="ul-category-txt">
                    <span>Women</span>
                  </div>
                  <div className="ul-category-btn">
                    <span>
                      <i className="flaticon-arrow-point-to-right"></i>
                    </span>
                  </div>
                </a>
              </div> */}

							{/* single category */}
							{/* <div className="col">
                <a className="ul-category" href="/shop">
                  <div className="ul-category-img">
                    <img src="assets/img/category-5.jpg" alt="Category" />
                  </div>
                  <div className="ul-category-txt">
                    <span>Jeans</span>
                  </div>
                  <div className="ul-category-btn">
                    <span>
                      <i className="flaticon-arrow-point-to-right"></i>
                    </span>
                  </div>
                </a>
              </div> */}

							{/* single category */}
							{/* <div className="col">
                <a className="ul-category" href="/shop">
                  <div className="ul-category-img">
                    <img src="assets/img/category-6.jpg" alt="Category" />
                  </div>
                  <div className="ul-category-txt">
                    <span>Sweater</span>
                  </div>
                  <div className="ul-category-btn">
                    <span>
                      <i className="flaticon-arrow-point-to-right"></i>
                    </span>
                  </div>
                </a>
              </div> */}

							{/* single category */}
							{/* <div className="col">
                <a className="ul-category" href="/shop">
                  <div className="ul-category-img">
                    <img src="assets/img/category-7.jpg" alt="Category" />
                  </div>
                  <div className="ul-category-txt">
                    <span>Shoe</span>
                  </div>
                  <div className="ul-category-btn">
                    <span>
                      <i className="flaticon-arrow-point-to-right"></i>
                    </span>
                  </div>
                </a>
              </div>  */}
						</div>
					</div>
				</section>
			</div>
			{/* CATEGORY SECTION END */}
		</>
	);
};

export default CategorySection;
