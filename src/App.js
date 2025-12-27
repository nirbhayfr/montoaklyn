import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
	return (
		<BrowserRouter>
			<Toaster position="bottom-right" />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/shop" element={<NewShopPage />} />
				<Route
					path="/order-confirmed"
					element={<OrderConfirmation />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/details/:id" element={<DetailsPage />} />
				<Route path="/*" element={<NotFoundPage />} />

				<Route path="/admin" element={<AdminLayout />}>
					<Route path="home" element={<AdminHome />} />
					<Route path="category" element={<AdminCategory />} />
					<Route path="products" element={<AdminProducts />} />
					<Route
						path="products/create"
						element={<AdminCreateProduct />}
					/>
					<Route
						path="products/edit/:id"
						element={<EditProduct />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
