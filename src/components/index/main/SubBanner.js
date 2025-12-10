import React from "react";

const SubBannerSection = () => {
  return (
    <div className="ul-container">
      <section className="ul-sub-banners">
        <div className="ul-inner-container">
          <div className="row ul-bs-row row-cols-md-3 row-cols-sm-2 row-cols-1 justify-content-center">
            <div className="col">
              <div className="ul-sub-banner ul-sub-banner--2">
                <div className="ul-sub-banner-txt">
                  <div className="top">
                    <span className="ul-ad-sub-title">Trending Products</span>
                    <h3 className="ul-sub-banner-title">Men's collections</h3>
                    <p className="ul-sub-banner-descr">Up to 22% off Gimbals</p>
                  </div>
                  <div className="bottom">
                    <a href="/shop" className="ul-sub-banner-btn">
                      Collection <i className="flaticon-up-right-arrow"></i>
                    </a>
                  </div>
                </div>

                <div className="ul-sub-banner-img">
                  <img
                    src="assets/img/sub-banner-2.png"
                    alt="Sub Banner Image"
                  />
                </div>
              </div>
            </div>
            {/* single sub banner */}

            <div className="col">
              <div className="ul-sub-banner">
                <div className="ul-sub-banner-txt">
                  <div className="top">
                    <span className="ul-ad-sub-title">Trending Products</span>
                    <h3 className="ul-sub-banner-title">
                      Fabric's collections
                    </h3>
                    <p className="ul-sub-banner-descr">Up to 22% off Gimbals</p>
                  </div>
                  <div className="bottom">
                    <a href="/shop" className="ul-sub-banner-btn">
                      Collection <i className="flaticon-up-right-arrow"></i>
                    </a>
                  </div>
                </div>

                <div className="ul-sub-banner-img">
                  <img
                    src="assets/img/sub-banner-1.png"
                    alt="Sub Banner Image"
                  />
                </div>
              </div>
            </div>

            {/* single sub banner */}

            {/* single sub banner */}
            {/* <div className="col">
              <div className="ul-sub-banner ul-sub-banner--3">
                <div className="ul-sub-banner-txt">
                  <div className="top">
                    <span className="ul-ad-sub-title">Trending Products</span>
                    <h3 className="ul-sub-banner-title">Kid's collections</h3>
                    <p className="ul-sub-banner-descr">Up to 22% off Gimbals</p>
                  </div>
                  <div className="bottom">
                    <a href="/shop" className="ul-sub-banner-btn">
                      Collection <i className="flaticon-up-right-arrow"></i>
                    </a>
                  </div>
                </div>

                <div className="ul-sub-banner-img">
                  <img
                    src="assets/img/sub-banner-3.png"
                    alt="Sub Banner Image"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubBannerSection;
