import React from "react";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import { registerUser } from "../api/auth";

export const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstname = e.target.firstname.value.trim();
    const lastname = e.target.lastname.value.trim();
    const phone = e.target["phone-number"].value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target["confirm-password"].value.trim();

    // ⭐ BASIC VALIDATION
    if (!firstname || !email || !password) {
      alert("⚠️ First name, Email & Password are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    // ⭐ BACKEND EXPECTS: name, email, password
    const payload = {
      name: firstname + " " + lastname,
      email,
      password,
    };

    try {
      const res = await registerUser(payload);
      console.log("Register Response:", res);

      if (res.statusCode === 201) {
        alert("🎉 Account created successfully!");
        window.location.href = "/login";
      } else if (res.statusCode === 400) {
        alert("❌ User already exists.");
      } else {
        alert("⚠️ Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("❌ Server error. Please try again later.");
    }
  };

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
                {/* ⭐ ADDED onSubmit */}
                <form onSubmit={handleSubmit} className="ul-contact-form">
                  <div className="row">
                    {/* Firstname */}
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

                    {/* Lastname */}
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

                    {/* Phone */}
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

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Confirm Password */}
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

                  {/* Submit button */}
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
