import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Favourite as FavouriteService } from "../../services/Favourite.service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FavouriteItem from "./FavouriteItem";
import Pagination from "../../components/Pagination";
import { Spinner } from "@material-tailwind/react";

function Favourite() {
  const [favourites, setFavourites] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.User.currentUser);
  useEffect(() => {
    setIsLoading(true);
    FavouriteService.getAllFavourites(currentPage - 1).then((res) => {
      setFavourites(res);
      setIsLoading(false);
      setTotalPage(res.totalPages);
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      FavouriteService.getAllFavourites(currentPage - 1).then((res) => {
        setFavourites(res);
        setIsLoading(false);
      });
    }
  }, [currentPage]);
  return (
    <div>
      <Header></Header>
      <div className="container mx-auto my-4 bg-white p-4 rounded-md">
        <h1 className="uppercase text-lg font-semibold border-b border-b-gray-400 pb-2">
          My favourites
        </h1>{" "}
        {isLoading ? (
          <div className="opacity-30 w-full flex justify-center items-center my-4">
            <Spinner className="h-16 w-16 " />
          </div>
        ) : (
          <>
            {favourites.content && favourites.content.length > 0 ? (
              <>
                {favourites.content.map((favourite) => {
                  return (
                    <FavouriteItem
                      item={favourite}
                      setFavourites={setFavourites}
                    ></FavouriteItem>
                  );
                })}
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={(newPage) => {
                    setCurrentPage(newPage);
                  }}
                  totalPages={totalPage}
                ></Pagination>
              </>
            ) : (
              <div className="w-full h-20 flex items-center justify-center">
                <span className="text-red-700 italic font-semibold">
                  You have no items in your favourites
                </span>
              </div>
            )}
          </>
        )}
        <div className=" border-t pt-4 w-full mt-4">
          <Link to={"/"} className="text-blue-500 italic">
            <ArrowBackOutlinedIcon></ArrowBackOutlinedIcon> Back to Homepage
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Favourite;
