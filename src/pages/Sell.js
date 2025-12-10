import React, { useState, useRef } from "react";
import PageHeading from "../common/PageHeading";

const GAS_URL = "https://script.google.com/macros/s/AKfycbxEO0XyT6ckJ1IxwCbuSyMsOU4ykr43oKGT6UFtki2Y1mm5mc5pHY9TL8knQXxg3CBL/exec"; // <-- paste your Web App URL

const initialState = {
  name: "",
  phone: "",
  productName: "",
  address: "",
  productAge: "",
  amount: "",
  honey: "", // honeypot anti-spam
};

const Sell = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" }); // <-- no TS here
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const v = value.replace(/[^\d+]/g, "").slice(0, 15);
      setForm((s) => ({ ...s, [name]: v }));
      return;
    }
    if (name === "amount") {
      const v = value.replace(/[^\d.]/g, "");
      setForm((s) => ({ ...s, [name]: v }));
      return;
    }
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      return "Please enter a valid phone number.";
    if (!form.productName.trim()) return "Please enter product name.";
    if (!form.address.trim()) return "Please enter address.";
    if (!form.productAge.trim()) return "Please enter product age.";
    if (!form.amount.trim() || isNaN(Number(form.amount)))
      return "Please enter a valid amount.";
    return "";
  };

  const onFilesPicked = (e) => {
    const selected = Array.from(e.target.files || []);
    const MAX_FILES = 5;
    const MAX_MB = 5;

    const valid = selected.filter((f) => {
      const okType = (f.type || "").startsWith("image/");
      const okSize = f.size <= MAX_MB * 1024 * 1024;
      return okType && okSize;
    });

    const combined = [...files, ...valid].slice(0, MAX_FILES);
    setFiles(combined);

    const readers = combined.map((f) => URL.createObjectURL(f));
    setPreviewUrls(readers);
  };

  const removeFile = (idx) => {
    const nextFiles = files.filter((_, i) => i !== idx);
    setFiles(nextFiles);
    const nextPreviews = previewUrls.filter((_, i) => i !== idx);
    setPreviewUrls(nextPreviews);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    // block bots (honeypot filled => likely spam)
    if (form.honey) return;

    const error = validate();
    if (error) {
      setMsg({ type: "err", text: error });
      return;
    }

    try {
      setLoading(true);

      // Use FormData to avoid CORS preflight with Apps Script
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("phone", form.phone.trim());
      fd.append("productName", form.productName.trim());
      fd.append("address", form.address.trim());
      fd.append("productAge", form.productAge.trim());
      fd.append("amount", form.amount.trim());
      files.forEach((f, i) => fd.append("photos[]", f, f.name || `photo_${i}.jpg`));

      const res = await fetch(GAS_URL, {
        method: "POST",
        body: fd,
      });

      let data = {};
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { result: res.ok, raw: text };
      }

      if (data && data.result) {
        setMsg({ type: "ok", text: "Submitted successfully! 🎉" });
        setShowModal(true);
        setForm(initialState);
        setFiles([]);
        setPreviewUrls([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        throw new Error((data && data.message) || "Submission failed.");
      }
    } catch (err) {
      setMsg({
        type: "err",
        text: (err && err.message) || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeading home={"home"} pagename={"Sell"} />

      <div className="w-11/12 md:w-10/12 m-auto">
        <div className="my-6 text-2xl md:text-3xl font-bold">Sell Now</div>

        <div className="rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 bg-white max-w-2xl">
          {msg.text ? (
            <div
              className={`mb-4 text-sm rounded-md px-3 py-2 ${
                msg.type === "ok"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {msg.text}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Honeypot (hidden) */}
            <input
              type="text"
              name="honey"
              value={form.honey}
              onChange={handleChange}
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Name<span className="text-rose-600">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Phone Number<span className="text-rose-600">*</span>
                </label>
                <input
                  name="phone"
                  inputMode="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Product Name<span className="text-rose-600">*</span>
                </label>
                <input
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  placeholder="e.g., iPhone 13, Wooden Chair"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Product Age<span className="text-rose-600">*</span>
                </label>
                <input
                  name="productAge"
                  value={form.productAge}
                  onChange={handleChange}
                  placeholder="e.g., 6 months, 2 years"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Amount (₹)<span className="text-rose-600">*</span>
                </label>
                <input
                  name="amount"
                  inputMode="decimal"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="e.g., 4999"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Address<span className="text-rose-600">*</span>
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Flat/House, Street, City, Pincode"
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Photos */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Product Photos (up to 5){" "}
                  <span className="text-slate-400 font-normal">
                    (JPEG/PNG, ≤5MB each)
                  </span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFilesPicked}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                />

                {previewUrls.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {previewUrls.map((url, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={url}
                          alt={`preview-${i}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="absolute -top-2 -right-2 bg-white border rounded-full px-2 py-0.5 text-xs shadow hover:bg-slate-50"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

           {/* --- SUBMIT BUTTON --- */}
<div style={{ paddingTop: 8 }}>
  <input
    type="submit"
    value={loading ? "Submitting..." : "Submit"}
    disabled={loading}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 18px",
      fontWeight: 700,
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      background: loading ? "#cbd5e1" : "#dd991bff",
      color: "#fff",
      cursor: loading ? "not-allowed" : "pointer",
    }}
  />
</div>



          </form>

          <p className="text-xs text-slate-500 mt-3">
            Your details are used only to contact you about this listing.
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold">Thanks! 🎉</h3>
            <p className="mt-2 text-slate-600">
              Your item has been submitted. We’ll reach out soon.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sell;
