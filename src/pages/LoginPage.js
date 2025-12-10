import React, { useState } from "react";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // stops form reload
    console.log("Form submitted");

    if (!name || !password) {
      alert("Please enter name and password");
      return;
    }

    const user = { name, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("✅ User saved in localStorage!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {/* Form WITHOUT page reload */}
        <form onSubmit={handleSubmit} action="javascript:void(0)">
          <input
            type="text"
            placeholder="Email or Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            required
          />

          {/* using type="button" instead of submit also works */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg w-full"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
