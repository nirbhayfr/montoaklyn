import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../../admin.css";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-main">
      {/* HEADER */}
      <header className="admin-header">
        <div className="header-left">
          <button className="sidebar-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>

          <img
            src="/a2.png" // your logo
            alt="logo"
            className="admin-logo"
          />

          <span className="admin-app-name">MontoAklyn</span>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <NavLink to="/admin/home" className="admin-link">
          Dashboard
        </NavLink>

        <NavLink to="/admin/category" className="admin-link">
          Categories
        </NavLink>

        <NavLink to="/admin/products" className="admin-link">
          Products
        </NavLink>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
