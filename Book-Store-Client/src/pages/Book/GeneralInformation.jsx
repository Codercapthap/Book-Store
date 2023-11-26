import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Gallery from "../../components/Gallery";
import { Cart } from "../../services/Cart.service";
import { toast } from "react-toastify";
import Login from "../../components/Login";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Book } from "../../services/Book.service";

function GeneralInformation({ book, count, setCount }) {
  const navigate = useNavigate();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isInWishList, setIsInWishList] = useState(false);
  const [active, setActive] = useState("signIn");
  const user = useSelector((state) => state.User.currentUser);
  const addToCart = (type = "add") => {
    if (!user) {
      setIsOpenLoginModal(true);
    } else {
      Cart.addBookToCart(book.id, count).then((response) => {
        if (response.status === 201 || response.status === 204) {
          toast("Successfully added to cart", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Failed to add book to cart", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (type === "buy") {
          navigate("/cart");
        }
      });
    }
  };

  const wishListHandle = () => {
    if (isInWishList) {
      Book.removeFromFavourite(book.id).then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          toast("Successfully removed from favourites", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsInWishList(!isInWishList);
        } else {
          toast.error("Failed to remove book from favourites", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    } else {
      Book.addToFavourite(book.id).then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          toast("Successfully added to favourites", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsInWishList(!isInWishList);
        } else {
          toast.error("Failed to add book to favourites", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    }
  };

  useEffect(() => {
    Book.isInWishList(book.id).then((res) => {
      setIsInWishList(res);
    });
  }, [book]);

  return (
    <div className="bg-white p-4 rounded-md flex mb-4">
      {/* left */}
      <div className=" w-5/12">
        {/* image */}
        <div className="flex">
          <div className="w-1/2 flex flex-col">
            <Gallery images={book.images} title={book.title}></Gallery>
          </div>
          <div>
            {book?.images[0]?.imageLocation && (
              <img
                src={
                  import.meta.env.VITE_APP_API + book.images[0].imageLocation
                }
                alt=""
                className="w-9/12 p-8"
              />
            )}
          </div>
        </div>
        {/* button */}
        <div className="w-full flex justify-center items-center">
          <button
            className="border border-red-700 text-red-700 font-bold w-5/12 leading-10 mr-4 rounded-md"
            onClick={addToCart}
          >
            <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to cart
          </button>
          <button
            className="bg-red-700 text-white w-5/12 leading-10 font-bold border border-red-700 rounded-md"
            onClick={() => {
              addToCart("buy");
            }}
          >
            Buy now
          </button>
        </div>
      </div>

      {/* right */}
      <div className="w-6/12">
        {/* title  */}
        <h1 className="text-2xl mb-4">{book.title}</h1>
        {/* info */}
        <p className="text-sm mb-2">
          Author: <strong>{book.author}</strong>
        </p>
        {/* rating  */}
        <div className="flex items-center">
          <ReactStars
            count={5}
            size={24}
            value={book.averageRating}
            edit={false}
            color2={"#ffd700"}
            className="inline-block cursor-pointer"
          />
          <span className="text-sm text-orange-600">{`(${book.totalRate} ratings)`}</span>
        </div>
        {/* price  */}
        <div className="flex items-center">
          <span className="text-red-700 font-semibold text-4xl mr-4 my-4">
            {book.actualPrice.toString()} $
          </span>
          {book.actualPrice !== book.price && (
            <span className="text-gray-700 text-lg line-through">
              {book.price.toString()} $
            </span>
          )}
        </div>
        {/* privacy */}
        <div>
          <div className="flex text-sm text-gray-700">
            <span className="w-1/3">Return-exchange policy </span>
            <span>Return and exchange product in 30 day </span>
          </div>
        </div>
        {/* count */}
        <div className="flex items-center my-2">
          <span className=" text-lg font-semibold text-gray-700 w-1/3">
            Quantity:{" "}
          </span>
          <div className="border border-gray-500 rounded-md w-1/5 flex">
            <span
              onClick={() => {
                if (count > 1) setCount(count - 1);
              }}
              className="py-1 px-4 cursor-pointer"
            >
              -
            </span>
            <input
              type="number"
              className="py-1 px-2 box-border w-full focus-visible:outline-none font-semibold text-center"
              value={count}
              readOnly
            ></input>
            <span
              onClick={() => {
                setCount(count + 1);
              }}
              className="py-1 px-4  cursor-pointer"
            >
              +
            </span>
          </div>
        </div>
        <div>
          <button
            className="font-semibold text-red-700 border border-red-700 rounded-md px-8 py-1 mt-4"
            onClick={wishListHandle}
          >
            {isInWishList ? (
              <>
                <FavoriteOutlinedIcon></FavoriteOutlinedIcon> Remove from
                favourites
              </>
            ) : (
              <>
                <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon> Add to
                favourites
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal  */}
      <Login
        activeTab={active}
        isOpen={isOpenLoginModal}
        setIsOpen={(isOpen) => {
          setIsOpenLoginModal(isOpen);
        }}
        active={active}
        setActive={(active) => {
          setActive(active);
        }}
      ></Login>
    </div>
  );
}

export default GeneralInformation;
