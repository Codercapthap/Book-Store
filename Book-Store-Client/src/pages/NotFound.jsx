import React from "react";
import { notfound } from "../assets/images";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <div>
      <Helmet>
        <title>NOT FOUND - Book Store</title>
      </Helmet>
      <Header></Header>
      <div className="my-20 h-full w-full flex items-center justify-center flex-col text-gray-700">
        <img src={notfound} alt="" className="w-1/3" />
        <p className="text-4xl mb-4 mt-8">Sorry! we couldn't find that page</p>
        <p className="text-3xl font-semibold">
          Try searching or{" "}
          <Link to={"/"} className="text-red-700">
            {" "}
            go to home page
          </Link>
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default NotFound;
