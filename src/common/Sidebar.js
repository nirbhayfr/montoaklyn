import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  // const isM
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );
  const cartSelector = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartSelector, dispatch]);

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };

  return (
    <div>
      {/* BACKDROP */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        style={{
          transform: ` translateX(${isSidebarOpen ? "0%" : "100%"})`,
        }}
        className="fixed top-0 right-0 h-full  w-16 lg:w-48 bg-red-500 shadow-2xl 
          transition-transform duration-300 ease-in-out overflow-y-auto z-50 rounded-l-2xl"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h1 className="text-2xl font-semibold">Your Cart</h1>
          <button
            onClick={closeSidebar}
            className="text-2xl text-gray-600 hover:text-black"
          >
            <FaTimes />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4">
          {cartProducts.length === 0 ? (
            <div className="text-lg font-semibold text-gray-600 mt-10 text-center">
              Your Cart is Empty
            </div>
          ) : (
            <div>
              {cartProducts.map((item, key) => (
                <div
                  className="flex justify-between items-center mb-4 border-b pb-3"
                  key={key}
                >
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <button
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full p-1 hover:bg-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>

                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{item.price}</p>
                  </div>
                </div>
              ))}

              {/* FOOTER */}
              <div className="sticky bottom-0 left-0 right-0 bg-black text-white font-semibold flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-6 rounded-t-2xl">
                <h2 className="text-lg">
                  Subtotal: <span>₹{totalAmount}</span>
                </h2>
                <Link
                  to="/cart"
                  onClick={closeSidebar}
                  className="bg-rose-200 text-black px-6 py-2 rounded-md font-semibold hover:bg-rose-300 transition"
                >
                  View Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
