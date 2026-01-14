import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import NotFoundPage from "./pages/NotFoundPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCreateProduct from "./pages/admin/AdminCreateProduct";
import EditProduct from "./pages/admin/EditProduct";

import { CheckoutPage } from "./pages/CheckoutPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { OrderConfirmation } from "./components/ui/OrderConfirmation";

import DetailsPage from "./pages/DetailsPage";
import Home from "./pages/Home";
import NewShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminOrders from "./pages/admin/AdminOrders";
import ScrollToTop from "./components/ui/ScrollToTop";

const App = () => {
	return (
		<BrowserRouter>
			<Toaster position="bottom-right" />
			<ScrollToTop />

			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/shop" element={<NewShopPage />} />
				<Route path="/details/:id" element={<DetailsPage />} />
				<Route path="/*" element={<NotFoundPage />} />

				<Route
					element={
						<ProtectedRoutes roles={["CUSTOMER", "ADMIN"]} />
					}
				>
					<Route
						path="/order-confirmed"
						element={<OrderConfirmation />}
					/>
					<Route path="/cart" element={<CartPage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/checkout" element={<CheckoutPage />} />
				</Route>

				<Route element={<ProtectedRoutes roles={["ADMIN"]} />}>
					import {Navigate} from "react-router-dom";
					<Route path="/admin" element={<AdminLayout />}>
						<Route
							index
							element={<Navigate to="home" replace />}
						/>

						<Route path="home" element={<AdminHome />} />
						<Route
							path="category"
							element={<AdminCategory />}
						/>
						<Route
							path="products"
							element={<AdminProducts />}
						/>
						<Route
							path="products/create"
							element={<AdminCreateProduct />}
						/>
						<Route
							path="products/edit/:id"
							element={<EditProduct />}
						/>
						<Route path="orders" element={<AdminOrders />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
