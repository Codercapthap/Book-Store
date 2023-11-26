import React from "react";
import { useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import { Cart } from "../../services/Cart.service";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import _, { round } from "lodash";

function CartItem({ cartItem, checkedList, setCheckedList }) {
  const [count, setCount] = useState(cartItem.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(
    cartItem.quantity * cartItem.actualPrice
  );

  const checkContainAndPosition = () => {
    return _.findIndex(checkedList, (item) => _.isEqual(item, cartItem));
  };

  const modifyCount = (count) => {
    setIsLoading(true);
    Cart.modifyQuantityCart(cartItem.book.id, count).then((res) => {
      if (res.status === 200 || res.status === 204) {
        setCount(count);
        setSubtotal(count * cartItem.actualPrice);
        const position = checkContainAndPosition();
        if (position !== -1) {
          const newArr = checkedList.map((item, index) => {
            if (position === index) {
              return { ...item, quantity: count };
            }
            return item;
          });
          setCheckedList(newArr);
        }
        cartItem.quantity = count;
        setIsLoading(false);
      } else {
        toast.error("There is something wrong, please try again later", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="grid grid-cols-11 items-center">
      <div className="col-span-7 flex items-center">
        <Checkbox
          checked={checkContainAndPosition() !== -1}
          onChange={(e) => {
            if (e.target.checked) {
              setCheckedList((prev) => [...prev, cartItem]);
            } else {
              setCheckedList((prev) => {
                const index = checkContainAndPosition();
                console.log(index, checkedList);
                if (index !== -1) {
                  const newArray = prev.slice();
                  newArray.splice(index, 1);
                  return newArray;
                }
                return prev;
              });
            }
          }}
        ></Checkbox>
        <img
          src={import.meta.env.VITE_APP_API + cartItem.images[0].imageLocation}
          alt=""
          className="w-1/6 m-4 p-2 border border-gray-400"
        />
        <div className="flex flex-col justify-between self-stretch my-4">
          <span className="text-sm text-gray-700">{cartItem.book.title}</span>
          <div>
            <span>{cartItem.actualPrice}$</span>

            {cartItem.book.price !== cartItem.actualPrice && (
              <span>{cartItem.book.price}$</span>
            )}
          </div>
        </div>
      </div>
      <span className="col-span-2">
        <div className="border border-gray-500 rounded-md mr-8 flex">
          <span
            onClick={() => {
              if (count > 1) {
                modifyCount(count - 1);
              }
            }}
            className="py-1 px-2 cursor-pointer"
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
              modifyCount(count + 1);
            }}
            className="py-1 px-2  cursor-pointer"
          >
            +
          </span>
        </div>
      </span>
      <span className="col-span-1">{round(subtotal, 2)} $</span>
      <span className="col-span-1 text-center cursor-pointer hover:text-red-700 transition-colors">
        <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
      </span>
      <Modal isOpen={isLoading}>
        <Spinner className="h-16 w-16 " />
      </Modal>
    </div>
  );
}

export default CartItem;
