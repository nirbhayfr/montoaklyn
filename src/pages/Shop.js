// src/pages/Shop.js
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PageHeading from "../common/PageHeading";
import { products } from "../data/Data";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

// ---------- Portal-based mobile bottom sheet (always full viewport) ----------
function MobileFilterSheet({
  open,
  title,
  onClose,
  onClear,
  onApply,
  children,
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[9998] bg-black/50" onClick={onClose} />
      <div
        className="fixed left-0 right-0 bottom-0 z-[9999] w-screen rounded-t-2xl bg-white border-t shadow-2xl sheet-big"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="text-sm px-3 py-1.5 rounded-lg border hover:bg-slate-50"
            onClick={onClose}
          >
            Done
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>

        <div className="p-4 pt-0 flex items-center justify-between">
          <button
            className="text-sm px-3 py-1.5 rounded-lg border hover:bg-slate-50"
            onClick={onClear}
          >
            Clear All
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
            onClick={onApply || onClose}
          >
            Apply
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

const Shop = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const handleOpen = (productId) => setIsModalOpen(productId);
  const handleClose = () => setIsModalOpen(null);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 20000],
  });

  const categoryList = Array.from(new Set(products.map((p) => p.category)));
  const brandList = Array.from(new Set(products.map((p) => p.brand)));

  const filteredProducts = products.filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    const price = parseFloat(product.price);
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  const handlePriceChange = (value) => {
    setFilters((f) => ({ ...f, priceRange: value }));
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters((f) => {
      const next = new Set(f[filterType]);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return { ...f, [filterType]: Array.from(next) };
    });
  };

  const clearAll = () =>
    setFilters({ categories: [], brands: [], priceRange: [0, 20000] });

  // mobile sheet controller: "price" | "category" | "brand" | null
  const [activeSheet, setActiveSheet] = useState(null);

  return (
    <div>
      <PageHeading home={"home"} pagename={"Shop"} />

      <div className="w-11/12 mx-auto mt-4 md:mt-8">
        {/* Mobile chips row */}
        <div className="md:hidden  top-0  bg-white/90 backdrop-blur border-b border-slate-100 py-2">
          <div className="flex items-center gap-2 overflow-x-auto padding">
            <button
              className="px-3 py-1.5 rounded-full border text-sm shrink-0 padding"
              onClick={() => setActiveSheet("price")}
            >
              Price
            </button>
            <button
              className="px-3 py-1.5 rounded-full border text-sm shrink-0 padding"
              onClick={() => setActiveSheet("category")}
            >
              Category
            </button>
            <button
              className="px-3 py-1.5 rounded-full border text-sm shrink-0 padding"
              onClick={() => setActiveSheet("brand")}
            >
              Brand
            </button>
            <button
              className="ml-auto px-3 py-1.5 rounded-full border text-sm shrink-0 padding"
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          {/* Product grid */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 products-grid ">
              {filteredProducts.map((item) => (
                <div key={item.id}>
                  <div className="overflow-hidden relative md:ml-4 bg-white rounded-3xl border product-card padding">
                    <div className="relative">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="rounded-3xl w-full h-auto object-cover"
                      />
                      <div className="opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity absolute -bottom-3 right-0 bg-white p-4 rounded-s-2xl">
                        <div className="bg-black text-white h-10 w-10 grid place-items-center rounded-3xl">
                          <button
                            className="text-2xl"
                            // onClick={() => handleOpen(item.id)}
                            onClick={() => dispatch(addToCart(item.id))}
                          >
                            <BiCart />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 p-3">
                      <p className="mb-1 font-medium">{item.title}</p>
                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-slate-600">
                  No products match your filter.
                </div>
              )}
            </div>
          </div>
        </div>

        <Modal
          data={products.find((item) => item.id === isModalOpen)}
          isModalOpen={isModalOpen}
          handleClose={handleClose}
        />
      </div>

      {/* Mobile bottom sheet rendered via portal */}
      <MobileFilterSheet
        open={!!activeSheet}
        title={
          activeSheet === "price"
            ? "Filter by Price"
            : activeSheet === "category"
            ? "Filter by Category"
            : activeSheet === "brand"
            ? "Filter by Brand"
            : ""
        }
        onClose={() => setActiveSheet(null)}
        onClear={clearAll}
      >
        {activeSheet === "price" && (
          <>
            <Slider
              min={0}
              max={20000}
              range
              value={filters.priceRange}
              onChange={handlePriceChange}
            />
            <div className="mt-3 flex justify-between text-sm text-slate-700">
              <span>Min: ₹{filters.priceRange[0]}</span>
              <span>Max: ₹{filters.priceRange[1]}</span>
            </div>
          </>
        )}

        {activeSheet === "category" && (
          <div className="space-y-2">
            {categoryList.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 text-slate-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCheckboxChange("categories", category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        )}

        {activeSheet === "brand" && (
          <div className="space-y-2">
            {brandList.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 text-slate-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleCheckboxChange("brands", brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        )}
      </MobileFilterSheet>
    </div>
  );
};

export default Shop;
