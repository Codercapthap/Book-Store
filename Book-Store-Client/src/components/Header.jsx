import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { Category } from "../services/Category.service";
import { User } from "../services/User.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditInformation from "./EditInformation";
import ChangePassword from "./ChangePassword";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditInfo, setIsOpenEditInfo] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [active, setActive] = useState("signIn");
  const [categories, setCategories] = useState(null);
  const [searchString, setSearchString] = useState("");
  const user = useSelector((state) => state.User.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    Category.getAllParentCategory().then((response) => {
      setCategories(response);
    });
  }, []);

  const logOut = () => {
    User.logout().then(() => {
      localStorage.clear();
      window.location.reload();
    });
  };

  const search = () => {
    navigate(`/search?query=${searchString}`);
  };

  return (
    <div className="bg-white w-full flex justify-center min-h-24">
      <div className="container mx-auto flex items-center">
        {/* logo */}
        <img
          src="/logo.png"
          alt=""
          className="w-36 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        {/* category */}
        <div className="px-10 group">
          <CategoryOutlinedIcon className="scale-150 pr-1 cursor-pointer"></CategoryOutlinedIcon>
          <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-12 overflow-hidden inline-block absolute top-16 left-64 ">
              <div className=" h-9 w-8  rotate-45 transform origin-bottom-left"></div>
            </div>
            <div className="grid bg-white grid-cols-4 absolute top-24 left-40 p-3 rounded-md gap-8 border-gray-400 border z-10">
              {categories &&
                categories.map((category, index) => {
                  return (
                    <div key={index}>
                      <h3 className="text-xl font-semibold">
                        {category.category.name}
                      </h3>
                      {category.subCategory.map((subCate) => {
                        return (
                          <p
                            className="cursor-pointer hover:text-orange-700 transition-colors"
                            onClick={() => {
                              navigate("/category/" + subCate.id);
                            }}
                            key={subCate.id}
                          >
                            {subCate.name}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {/* search */}
        <div className="w-7/12 flex items-center h-11 relative mr-10">
          <input
            type="text"
            className="border w-full h-full rounded-md border-gray-300 pr-24 pl-8 focus-visible:outline-none"
            placeholder="Find book..."
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                search();
              }
            }}
          />
          <div
            className="px-5 py-1 bg-red-700 absolute right-1 rounded-md cursor-pointer"
            onClick={search}
          >
            <SearchOutlinedIcon className="h-full text-white"></SearchOutlinedIcon>
          </div>
        </div>
        {/* cart */}
        <div
          className="flex flex-col items-center cursor-pointer mr-6"
          onClick={() => {
            if (!user) {
              setIsOpen(true);
            } else {
              navigate("/cart");
            }
          }}
        >
          <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
          <span>Cart</span>
        </div>
        {/* info */}
        <div className="flex flex-col items-center cursor-pointer group relative">
          <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>
          <span>Account</span>
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-500 cursor-auto z-10">
            <div className="w-12 overflow-hidden inline-block absolute top-8 right-2">
              <div className=" h-9 w-8  rotate-45 transform origin-bottom-left"></div>
            </div>
            {!user ? (
              <div className="w-60 flex flex-col absolute top-16 -right-20 p-4 rounded-md border-gray-400 border bg-white">
                <button
                  className="bg-red-500 rounded-md mb-3 p-2 text-white font-semibold"
                  onClick={() => {
                    setIsOpen(true);
                    setActive("signIn");
                  }}
                >
                  Sign in
                </button>
                <button
                  className="border-red-500 rounded-md border p-2 text-red-500 font-semibold"
                  onClick={() => {
                    setIsOpen(true);
                    setActive("register");
                  }}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="min-w-max flex flex-col absolute top-16 -right-20 rounded-md border-gray-400 border bg-white cursor-pointer">
                <div
                  className="flex items-center border-b border-b-gray-300 py-2 px-4 hover:bg-gray-300"
                  onClick={() => {
                    setIsOpenEditInfo(true);
                  }}
                >
                  {/* <img
                    src={import.meta.env.VITE_APP_API + user.user.avatar}
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  /> */}
                  <PersonOutlinedIcon fontSize="large"></PersonOutlinedIcon>
                  <h2 className="ml-auto w-9/12 font-semibold text-xl">
                    {user.user.name}
                  </h2>
                </div>
                <div
                  className="flex items-center border-b border-b-gray-300 py-2 px-4 hover:bg-gray-300"
                  onClick={() => {
                    navigate("/order");
                  }}
                >
                  <GradingOutlinedIcon></GradingOutlinedIcon>
                  <span className="ml-auto w-9/12">My Orders</span>
                </div>
                <div
                  className="flex items-center border-b border-b-gray-300 py-2 px-4 hover:bg-gray-300"
                  onClick={() => {
                    navigate("/favourites");
                  }}
                >
                  <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                  <span className="ml-auto w-9/12">Favourites</span>
                </div>
                <div
                  className="flex items-center border-b border-b-gray-300 py-2 px-4 hover:bg-gray-300"
                  onClick={() => {
                    setIsOpenChangePassword(true);
                  }}
                >
                  <KeyOutlinedIcon></KeyOutlinedIcon>
                  <span className="ml-auto w-9/12">Change Password</span>
                </div>
                {/* <div className="flex items-center border-b border-b-gray-300 py-2 px-4 hover:bg-gray-300">
                  <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                  <span className="ml-auto w-9/12">My Addresses</span>
                </div> */}
                {user.role === "ADMIN" && (
                  <div
                    className="flex items-center border-b border-b-gray-300 py-2 px-4 hover:bg-gray-300"
                    onClick={() => {
                      navigate("/admin");
                    }}
                  >
                    <AdminPanelSettingsOutlinedIcon></AdminPanelSettingsOutlinedIcon>
                    <span className="ml-auto w-9/12">Admin Panel</span>
                  </div>
                )}

                <div
                  className="flex items-center border-b border-b-gray-300 py-2 px-4 hover:bg-gray-300"
                  onClick={logOut}
                >
                  <LogoutOutlinedIcon></LogoutOutlinedIcon>
                  <span className="ml-auto w-9/12">Sign out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Login
        activeTab={active}
        isOpen={isOpen}
        setIsOpen={(isOpen) => {
          setIsOpen(isOpen);
        }}
        active={active}
        setActive={(active) => {
          setActive(active);
        }}
      ></Login>
      {user && (
        <>
          <EditInformation
            isOpen={isOpenEditInfo}
            setIsOpen={setIsOpenEditInfo}
          ></EditInformation>
          <ChangePassword
            isOpen={isOpenChangePassword}
            setIsOpen={setIsOpenChangePassword}
          ></ChangePassword>
        </>
      )}
    </div>
  );
}

export default Header;
