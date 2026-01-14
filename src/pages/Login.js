import React from "react";
import { Header } from "../components/index/Header";
import Footer from "../components/index/Footer";
import { loginUser } from "../api/auth";
import { toast } from "sonner";
import { encryptData } from "../crypto";

export const Login = () => {
	// handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = e.target.email.value.trim();
		const password = e.target.password.value.trim();

		if (!email || !password) {
			toast.warning("⚠️ Please enter both email and password.");
			return;
		}

		try {
			const data = { email, password };
			const res = await loginUser(data);

			if (res.statusCode === 200) {
				localStorage.setItem("user", encryptData(res.data));

				toast.success("🎉 Login Successful!");
				if (res.data.role === "ADMIN") {
					window.location.href = "/admin";
				} else {
					window.location.href = "/profile";
				}
			} else if (res.statusCode === 404) {
				toast.error("❌ User not found. Please register first.");
			} else if (res.statusCode === 400) {
				toast.error("❌ Invalid credentials. Please try again.");
			} else {
				toast.error("⚠️ Something went wrong! Please try again.");
			}
		} catch (err) {
			console.error("Login error:", err);
			toast.error("❌ Server is down or unreachable.");
		}
	};

	return (
		<div>
			<Header />
			<main>
				{/* BREADCRUMB SECTION START */}
				<div className="ul-container">
					<div className="ul-breadcrumb">
						<h2 className="ul-breadcrumb-title">Log In</h2>
						<div className="ul-breadcrumb-nav">
							<a href="/">
								<i className="flaticon-home"></i> Home
							</a>
							<i className="flaticon-arrow-point-to-right"></i>
							<span className="current-page">Log In</span>
						</div>
					</div>
				</div>
				{/* BREADCRUMB SECTION END */}

				<div className="ul-container">
					<div className="ul-login">
						<div className="ul-inner-page-container">
							<div className="row justify-content-evenly align-items-center flex-column-reverse flex-md-row">
								{/* Left image */}
								<div className="col-md-5">
									<div className="ul-login-img text-center">
										<img
											src="assets/img/login-img.svg"
											alt="Login"
										/>
									</div>
								</div>

								{/* Login form */}
								<div className="col-xl-4 col-md-7">
									<form
										onSubmit={handleSubmit}
										className="ul-contact-form"
									>
										<div className="row">
											{/* Email input */}
											<div className="form-group">
												<div className="position-relative">
													<input
														type="email"
														name="email"
														id="email"
														placeholder="Enter Email Address"
													/>
												</div>
											</div>

											{/* Password input */}
											<div className="form-group">
												<div className="position-relative">
													<input
														type="password"
														name="password"
														id="password"
														placeholder="Enter Password"
													/>
												</div>
											</div>
										</div>

										{/* Submit button */}
										<button type="submit">
											Log In
										</button>
									</form>

									<p className="text-center mt-4 mb-0">
										Don’t have an account?{" "}
										<a href="/register">
											Sign Up
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
