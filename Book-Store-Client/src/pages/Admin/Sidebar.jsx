import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router-dom";

function Sidebar({ currentPanel, setCurrentPanel }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-black flex flex-col items-center">
      <div className="flex flex-col items-center mb-20">
        <img
          src="/logo.png"
          alt=""
          className="w-40 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <span className="mt-4 text-lg font-semibold">Admin</span>
      </div>
      <div className="flex flex-col w-full">
        <div
          className={
            "grid items-center grid-cols-5 py-4 cursor-pointer " +
            (currentPanel == "home" && "bg-red-700 text-white rounded-l-full")
          }
          onClick={() => {
            setCurrentPanel("home");
          }}
        >
          <HomeOutlinedIcon className="col-start-2"></HomeOutlinedIcon>{" "}
          <span className="col-span-2">Dashboard</span>
        </div>
        <div
          className={
            "grid items-center grid-cols-5 py-4 cursor-pointer " +
            (currentPanel == "book" && "bg-red-700 text-white rounded-l-full")
          }
          onClick={() => {
            setCurrentPanel("book");
          }}
        >
          <MenuBookOutlinedIcon className="col-start-2"></MenuBookOutlinedIcon>
          <span className="col-span-2">Books</span>
        </div>
        <div
          className={
            "grid items-center grid-cols-5 py-4 cursor-pointer " +
            (currentPanel == "account" &&
              "bg-red-700 text-white rounded-l-full")
          }
          onClick={() => {
            setCurrentPanel("account");
          }}
        >
          <AccountCircleOutlinedIcon className="col-start-2 "></AccountCircleOutlinedIcon>{" "}
          <span className="col-span-2">Account</span>
        </div>
        <div
          className={
            "grid items-center grid-cols-5 py-4 cursor-pointer " +
            (currentPanel == "category" &&
              "bg-red-700 text-white rounded-l-full")
          }
          onClick={() => {
            setCurrentPanel("category");
          }}
        >
          <LocalShippingOutlinedIcon className="col-start-2"></LocalShippingOutlinedIcon>{" "}
          <span className="col-span-2">Category</span>
        </div>
        <div
          className={
            "grid items-center grid-cols-5 py-4 cursor-pointer " +
            (currentPanel == "other" && "bg-red-700 text-white rounded-l-full")
          }
          onClick={() => {
            setCurrentPanel("other");
          }}
        >
          <CategoryOutlinedIcon className="col-start-2"></CategoryOutlinedIcon>{" "}
          <span className="col-span-2">Delivery & Sale</span>
        </div>
        <div
          className={"grid items-center grid-cols-5 py-4 cursor-pointer "}
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackOutlinedIcon className="col-start-2"></ArrowBackOutlinedIcon>{" "}
          <span className="col-span-2">Back to Home</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
