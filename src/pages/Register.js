import React from "react";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";

export const Register = () => {
  return (
    <div>
      <Header />
      <main>
        {/*  BREADCRUMB SECTION START    */}
        <div className="ul-container">
          <div className="ul-breadcrumb">
            <h2 className="ul-breadcrumb-title">Sign Up</h2>
            <div className="ul-breadcrumb-nav">
              <a href="/">
                <i className="flaticon-home"></i>Home
              </a>
              <i className="flaticon-arrow-point-to-right"></i>
              <span className="current-page">Sign Up</span>
            </div>
          </div>
        </div>
        {/*  BREADCRUMB SECTION END    */}

        <div className="ul-container">
          <div className="ul-inner-page-container">
            <div className="row justify-content-evenly align-items-center flex-column-reverse flex-md-row">
              <div className="col-md-5">
                <div className="ul-login-img text-center">
                  <img src="assets/img/login-img.svg" alt="Login Image" />
                </div>
              </div>

              <div className="col-xl-4 col-md-7">
                <form action="#" className="ul-contact-form">
                  <div className="row">
                    {/*  firstname    */}
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          placeholder="First Name"
                        />
                      </div>
                    </div>

                    {/*  lastname    */}
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    {/*  phone    */}
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type="tel"
                          name="phone-number"
                          id="phone-number"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>

                    {/*  email    */}
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email Address"
                        />
                        <span className="field-icon">
                          <i className="flaticon-email"></i>
                        </span>
                      </div>
                    </div>

                    {/*  password    */}
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter Password"
                        />
                        <span className="field-icon">
                          <i className="flaticon-lock"></i>
                        </span>
                      </div>
                    </div>
                    {/*  */}
                    {/*  CONFIRM PASSWORD    */}
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type="password"
                          name="confirm-password"
                          id="confirm-password"
                          placeholder="Confirm Password"
                        />
                        <span className="field-icon">
                          <i className="flaticon-lock"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/*  submit btn    */}
                  <button type="submit">Sign Up</button>
                </form>

                <p className="text-center mt-4 mb-0">
                  Already have an account? <a href="/login">Log In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
