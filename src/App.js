import React from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// make sure Header has: export default Header
// import Footer from "./common/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/index";
import NotFoundPage from "./pages/NotFoundPage";
import ContactUs from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Sell from "./pages/Sell";

// 👉 Named exports:
import { CartPage } from "./pages/CartPage";
import { ShopPage } from "./pages/ShopPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

// 👉 Default export:
import ShopDetailsPage from "./pages/ShopDetailsPage";

import SearchResults from "./common/SearchResults"; // NEW: search results page
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import StickyOrderBar from "./components/StickyOrderBar";
import { OrderConfirmation } from "./components/OrderConfirmation";

import { TermsPage } from "./pages/Tandc";
import { PrivacyPage } from "./pages/PrivacyPolicy";
import { ContactPage } from "./pages/Contactus";
import { ShippingPage } from "./pages/Shopping";

const App = () => {
  return (
    <Router>
      {/* Header on every page so the search bar is always available */}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/order-confirmed" element={<OrderConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopdetails/:id" element={<ShopDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/sell" element={<Sell />} />

        <Route path="/t&c" element={<TermsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/privacypolicy" element={<PrivacyPage />} />

        {/* 🔎 NEW: search route */}
        <Route path="/search" element={<SearchResults />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      {/* for suggestion we need to hit ctrl + space */}
      {/* WhatsApp bubble (always on top of pages) */}
      <FloatingWhatsApp
        phone="+918791676705" // <-- put your number
        message="Hi! I want to order..."
        position="right" // "left" or "right"
        offsetX={10}
        offsetY={65}
        showLabel={false} // set true to show small label
        zIndex={9999} // above everything
      />

      {/* Sticky “Order Now — COD” bar (bottom center) */}
      <StickyOrderBar
        href="/cart" // or "/checkout"
        ctaText="Order Now – Cash on Delivery"
        subText="15 days money back guarantee"
        bg="linear-gradient(90deg, var(--ul-primary) 0%, var(--ul-secondary) 100%)"
        textColor="#ffffff"
        zIndex={9998} // slightly below WhatsApp
        showOnScroll={false} // set false to always visible
        minScrollPx={120}
        stickyOnMobileOnly={false}
      />
    </Router>
  );
};

export default App;
