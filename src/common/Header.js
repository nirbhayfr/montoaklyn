import React, { useEffect, useState } from "react";
import { navbar } from "../data/Data";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineHeart, HiOutlineUser } from "react-icons/hi";
import Sidebar from "./Sidebar";
import LoginPage from "../pages/LoginPage";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const { totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Only show login modal if user not logged in
  const handleUserClick = () => {
    if (!user) {
      setShowLogin(true);
    }
  };

  return (
    <>
      <div
        className={`${sticky ? "header py-4 sticky top-0 z-50 shadow-xl" : ""}`}
      >
        <div className="flex flex-wrap justify-between items-center w-10/12 m-auto">
          <div className="logo">UsedStuff</div>

          <li className="flex always-right">
            <Link onClick={toggleSidebar} className="relative mr-5 text-2xl">
              <MdOutlineShoppingBag />
              <div className="items_count">
                <span className="text-white">{totalItems}</span>
              </div>
            </Link>
            {/* User icon or username */}
            <Link
              className="mr-5 text-2xl cursor-pointer"
              onClick={handleUserClick}
            >
              {user ? user.name : <HiOutlineUser />}
            </Link>
          </li>
        </div>
      </div>
      {/* <br /> */}
      <div className=" md:flex flex-wrap text-base py-3 col-span-12 hidden justify-center items-center w-10/12 m-auto">
        {navbar.map((nav, key) => (
          <div key={key} className="mr-5">
            <Link className="active link-hover transition-all" to={nav.path}>
              {nav.nav}
            </Link>
          </div>
        ))}
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => toggleSidebar()}
      />

      {/* Show login modal only when user clicks HiOutlineUser */}
      {showLogin && (
        <LoginPage
          onClose={() => setShowLogin(false)}
          onLogin={(loggedUser) => setUser(loggedUser)}
        />
      )}
    </>
  );
};

export default Header;
