import React from "react";

const AdSection = () => {
  return (
    <div className="ul-container">
      <section className="ul-ad">
        <div className="ul-inner-container">
          <div className="ul-ad-content">
            <div className="ul-ad-txt">
              <span className="ul-ad-sub-title">Trending Products</span>
              <h2 className="ul-section-title">
                Get 30% Discount On All Hudis!
              </h2>
              <div className="ul-ad-categories">
                <span className="category">
                  <span>
                    <i className="flaticon-check-mark"></i>
                  </span>
                  Zara
                </span>
                <span className="category">
                  <span>
                    <i className="flaticon-check-mark"></i>
                  </span>
                  Gucie
                </span>
                <span className="category">
                  <span>
                    <i className="flaticon-check-mark"></i>
                  </span>
                  Publo
                </span>
                <span className="category">
                  <span>
                    <i className="flaticon-check-mark"></i>
                  </span>
                  Men's
                </span>
                <span className="category">
                  <span>
                    <i className="flaticon-check-mark"></i>
                  </span>
                  Women's
                </span>
              </div>
            </div>

            <div className="ul-ad-img">
              <img src="assets/img/ad-img.png" alt="Ad Image" />
            </div>

            <a href="/shop" className="ul-btn">
              Check Discount <i className="flaticon-up-right-arrow"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdSection;
