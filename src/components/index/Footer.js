import React from "react";

export default function Footer() {
  return (
    <div className="ul-footer ">
      <div className="ul-inner-container">
        <div className="ul-footer-middle">
          {/* <!-- single widget --> */}
          <div className="ul-footer-middle-widget">
            <div className="ul-footer-middle-widget-content"></div>
          </div>

          {/* <!-- single widget --> */}
          <div className="ul-footer-middle-widget">
            <h3 className="ul-footer-middle-widget-title">Follow us</h3>
            <div className="ul-footer-middle-widget-content">
              <div className="social-links">
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

          {/* <!-- single widget --> */}
          <div className="ul-footer-middle-widget">
            <h3 className="ul-footer-middle-widget-title">
              Need help? Call now!
            </h3>
            <div className="ul-footer-middle-widget-content">
              <div className="contact-nums">
                <a href="tel:+918791676705">+91 8791676705</a>,{" "}
                <a href="mailto:montoaklyn@gmail.com">montoaklyn@gmail.com</a>
              </div>
            </div>
          </div>

          {/* <!-- single widget --> */}
          <div className="ul-footer-middle-widget align-self-center">
            <a href="/">
              <img
                src="assets/img/montoaklynlogo.png"
                alt="logo"
                className="logo scale-150 pb-5"
              />
            </a>
          </div>
        </div>

        <div className="ul-footer-bottom">
          <p className="copyright-txt">
            Copyright 2024 ©{" "}
            <a href="https://temptics.com/" className="ul-footer-bottom-link">
              Temptics
            </a>
          </p>
          <img
            src="assets/img/payment-methods.png"
            alt="payment methods logos"
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
