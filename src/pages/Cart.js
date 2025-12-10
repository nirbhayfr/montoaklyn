import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem, updateQuantity } from "../redux/cartSlice";
import PageHeading from "../common/PageHeading";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdPadding } from "react-icons/md";

// frujhfguruyfgeryufgfhjjerhguijerfhguiojer

// ✅ Use your simple web app URL (script.google.com)
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxDZ-zFcG9L0eeezpyXb1sFBYKoZIXFumtR8b062yvsKSgfpJ5GFRdDJJOL14SlS0R4/exec";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );
  // const selector = useSelector();

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };
  const increaseQuantity = (itemId, currentQuantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: currentQuantity + 1 }));
    dispatch(getCartTotal());
  };
  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id: itemId, quantity: currentQuantity - 1 }));
      dispatch(getCartTotal());
    }
  };

  // -------- user info (no submit button) ----------
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
  });
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    if (!formData.fullName.trim()) return "Please enter full name";
    if (!formData.email.trim()) return "Please enter email";
    if (!formData.phone.trim()) return "Please enter phone number";
    if (!formData.address.trim()) return "Please enter address";
    if (!formData.zip.trim()) return "Please enter pincode/zip";
    if (!cartProducts?.length) return "Your cart is empty";
    return "";
  };

  // ---- BUY: post to Apps Script via hidden iframe (works with script.google.com URL) ----
  const handleBuy = () => {
    setSuccessMsg("");
    setErrorMsg("");

    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setSending(true);

    // cart from localStorage → fallback to Redux
    let items = [];
    try {
      items = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {}
    if (!Array.isArray(items) || items.length === 0) items = cartProducts;

    const subTotal = items.reduce(
      (s, it) => s + Number(it.totalPrice ?? it.price) * (it.quantity || 1),
      0
    );
    const shipping = 10;
    const grandTotal = subTotal + shipping;

    // ensure hidden iframe target exists
    const iframeName = "gasPostSimple";
    let iframe = document.querySelector(`iframe[name="${iframeName}"]`);
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }

    // build a real HTML form and POST it
    const form = document.createElement("form");
    form.action = GAS_URL; // <-- script.google.com/macros/s/.../exec
    form.method = "POST";
    form.enctype = "application/x-www-form-urlencoded";
    form.target = iframeName;

    const add = (k, v) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = String(v);
      form.appendChild(input);
    };

    // payload
    add("fullName", formData.fullName.trim());
    add("email", formData.email.trim());
    add("phone", formData.phone.trim());
    add("address", formData.address.trim());
    add("zip", formData.zip.trim());
    add("subTotal", subTotal);
    add("shipping", shipping);
    add("grandTotal", grandTotal);
    add("itemsJson", JSON.stringify(items)); // full cart array

    document.body.appendChild(form);
    form.submit(); // posts inside hidden iframe (bypasses CORS)
    form.remove();

    setTimeout(() => {
      setSending(false);
      setSuccessMsg(
        "Order received! You’ll get a WhatsApp tracking update shortly."
      );
      // OPTIONAL: clear cart after buy
      // localStorage.removeItem("cart");
      // dispatch(clearCart()) // if you have an action
    }, 700);
  };

  return (
    <>
      <div>
        <PageHeading home={"home"} pagename={"Cart"} />
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="mt-6 md:mt-8">
          {cartProducts.length === 0 ? (
            <div className="text-2xl md:text-3xl font-bold uppercase">
              Your Cart has No Product
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mobile cards */}
              <div className="md:hidden space-y-4">
                {cartProducts.map((item, key) => (
                  <div
                    key={key}
                    className="bg-white rounded-2xl shadow-md border p-3"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-20 w-20 object-contain shrink-0 border rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="font-semibold leading-snug">
                            {item.title}
                          </p>
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove"
                          >
                            <FaTimes />
                          </button>
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          Price: ₹{item.price}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              className="border rounded-lg p-2 active:scale-95"
                              onClick={() =>
                                decreaseQuantity(item.id, item.quantity)
                              }
                              aria-label="Decrease"
                            >
                              <PiMinus className="text-lg" />
                            </button>
                            <span className="min-w-12 text-center border rounded-lg py-2 px-4">
                              {item.quantity || 1}
                            </span>
                            <button
                              className="border rounded-lg p-2 active:scale-95"
                              onClick={() =>
                                increaseQuantity(item.id, item.quantity)
                              }
                              aria-label="Increase"
                            >
                              <PiPlus className="text-lg" />
                            </button>
                          </div>
                          <div className="font-semibold">
                            ₹{Number(item.price) * (item.quantity || 1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* User form + Totals + Buy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
                {/* Form (no submit) */}
                <div className="p-5 rounded-2xl shadow-2xl bg-white padding">
                  <form className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-center text-gray-700">
                      User Information
                    </h2>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-400"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-400"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-400"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-400"
                        placeholder="Enter your address"
                        rows="3"
                        required
                      ></textarea>
                    </div>

                    <div className="sm:max-w-xs">
                      <label className="block text-gray-700 mb-1">
                        Zip / Pincode
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-400"
                        placeholder="Enter zip / pincode"
                        required
                      />
                    </div>
                  </form>
                </div>

                {/* Totals + Buy button + messages */}
                <div className="p-5 rounded-2xl shadow-2xl bg-white h-fit padding">
                  <h1 className="mb-4 text-center text-2xl md:text-3xl font-bold">
                    Cart Total
                  </h1>

                  {errorMsg ? (
                    <div className="mb-3 rounded-lg border border-rose-300 bg-rose-50 text-rose-700 px-3 py-2 text-sm">
                      {errorMsg}
                    </div>
                  ) : null}
                  {successMsg ? (
                    <div className="mb-3 rounded-lg border border-green-300 bg-green-50 text-green-700 px-3 py-2 text-sm">
                      {successMsg}
                    </div>
                  ) : null}

                  <div className="flex justify-between mt-3 text-slate-700">
                    <span>Sub Total :</span>
                    <span className="font-semibold">₹{totalAmount}</span>
                  </div>

                  <div className="flex justify-between mt-3 text-slate-700">
                    <span>Shipping Charge :</span>
                    <span className="font-semibold">₹{10}</span>
                  </div>

                  <div className="flex justify-between mt-3 text-slate-900 text-lg">
                    <span>Grand Total :</span>
                    <span className="font-bold">₹{totalAmount + 10}</span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    We’ll use your phone number to send a WhatsApp tracking
                    update.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-5 padding">
                    <button
                      type="button" // important: keep click, not form submit
                      onClick={handleBuy}
                      disabled={sending}
                      className="text-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-60"
                    >
                      {sending ? "Processing..." : "Buy"}
                    </button>
                    <Link
                      className="text-center px-4 py-2 rounded-lg text-white bg-rose-700 hover:bg-rose-800 transition"
                      to="/shop"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* hidden iframe target for CORS-free post */}
              <iframe
                name="gasPostSimple"
                style={{ display: "none" }}
                title="gasPostSimple"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
