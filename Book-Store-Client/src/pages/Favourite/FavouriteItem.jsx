import React from "react";
import { useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import { Cart } from "../../services/Cart.service";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import _, { isEqual, round } from "lodash";
import { Book } from "../../services/Book.service";
import { useNavigate } from "react-router-dom";

function FavouriteItem({ item, setFavourites }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRemove = () => {
    setIsLoading(false);
    Book.removeFromFavourite(item.id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        setIsLoading(false);
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
        setFavourites((prev) => {
          const currentList = prev.content;
          const currentListMinus = currentList.filter((currentItem) => {
            return !isEqual(item, currentItem);
          });
          return { ...prev, content: currentListMinus };
        });
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
  };

  return (
    <>
      <div className="grid grid-cols-11 items-center">
        <div className="col-span-2 flex items-center">
          <img
            src={import.meta.env.VITE_APP_API + item.images[0].imageLocation}
            alt=""
            className="w-2/3 m-4 p-2 border border-gray-400 cursor-pointer"
            onClick={() => {
              navigate("/book/" + item.id);
            }}
          />
        </div>
        <div className="my-4 col-span-5">
          <span
            className="font-semibold text-gray-700 cursor-pointer"
            onClick={() => {
              navigate("/book/" + item.id);
            }}
          >
            {item.title}
          </span>
        </div>
        <div className="my-4 col-span-2">
          <span className=" text-gray-700">{item.author}</span>
        </div>
        <div className="my-4">
          <span>{item.actualPrice}$</span>

          {item.price !== item.actualPrice && (
            <span className="text-sm text-gray-700 line-through ml-2">
              {item.price}$
            </span>
          )}
        </div>
        <span
          className="col-span-1 text-center cursor-pointer hover:text-red-700 transition-colors"
          onClick={handleRemove}
        >
          <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
        </span>
      </div>

      <Modal isOpen={isLoading}>
        <Spinner className="h-16 w-16 " />
      </Modal>
    </>
  );
}

export default FavouriteItem;
