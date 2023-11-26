import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Loading from "../../components/Loading";
import { Category } from "../../services/Category.service";
import { useNavigate } from "react-router-dom";
import Sale from "./Sale";
import { Helmet } from "react-helmet";

function Home() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    Category.getSubCategory().then((res) => {
      setSubCategories(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading></Loading>;
  else
    return (
      <>
        <Helmet>
          <title>Home Page - Book Store</title>
        </Helmet>
        <Header></Header>
        <div className="container mx-auto">
          <div className="bg-white my-6 p-6 rounded-md">
            <div className="flex items-center border-b border-b-gray-300 pb-4 mb-4">
              <CategoryOutlinedIcon className="scale-150 pr-1 cursor-pointer text-red-500"></CategoryOutlinedIcon>
              <h2 className="font-bold text-xl ml-4">Category</h2>
            </div>
            <div className="grid grid-cols-8">
              {subCategories.slice(0, 8).map((subCategory) => {
                return (
                  <div
                    className=" flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      navigate("/category/" + subCategory.id);
                    }}
                  >
                    <img
                      src={import.meta.env.VITE_APP_API + subCategory.image}
                      alt=""
                      className="w-24 pb-2 h-36"
                    />
                    <span className="text-gray-500 text-center w-10/12">
                      {subCategory.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <Sale></Sale>
        </div>
        <Footer></Footer>
      </>
    );
}

export default Home;
