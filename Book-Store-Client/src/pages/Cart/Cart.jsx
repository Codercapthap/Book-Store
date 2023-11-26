import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Checkbox } from "@material-tailwind/react";
import { Cart as CartService } from "../../services/Cart.service";
import CartItem from "./CartItem";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    CartService.getCart().then((res) => {
      res.forEach((element) => {
        delete element.user;
      });
      setCartItems(res);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setTotalPrice(
      checkedList.reduce((acc, item) => {
        return Math.round((acc + item.quantity * item.actualPrice) * 100) / 100;
      }, 0)
    );
  }, [checkedList]);

  return (
    <div>
      <Header></Header>

      <Helmet>
        <title>Shopping Cart - Book Store</title>
      </Helmet>
      <div className="container mx-auto my-4 ">
        <p className="uppercase text-xl mb-4">
          Shopping cart <span className="text-lg lowercase"> (11 items)</span>
        </p>
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2">
            <div className="bg-white rounded-md p-4 grid grid-cols-11 mb-4  items-center">
              <div className="col-span-7">
                <Checkbox
                  checked={checkedList.length === cartItems.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedList(cartItems);
                    } else {
                      setCheckedList([]);
                    }
                  }}
                ></Checkbox>
                <span className="ml-4">Select All</span>
              </div>
              <span className="col-span-2">Quantity</span>
              <span className="col-span-1">Subtotal</span>
            </div>

            {isLoading ? (
              <div className="opacity-30 w-full flex justify-center items-center my-4">
                <Spinner className="h-16 w-16 " />
              </div>
            ) : (
              <div className="bg-white rounded-md p-4 ">
                {cartItems.map((cartItem) => {
                  return (
                    <CartItem
                      key={cartItem.id}
                      cartItem={cartItem}
                      checkedList={checkedList}
                      setCheckedList={setCheckedList}
                    ></CartItem>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <div className="bg-white rounded-md p-4">
              <div className="flex justify-between w-full">
                <span className="font-semibold">Grand Total</span>
                <span className="text-lg font-bold text-red-700 ">
                  {totalPrice}$
                </span>
              </div>
              <button
                className={`w-full py-2 uppercase rounded-md bg-red-700 text-white text-lg font-bold my-4 disabled:bg-gray-500 disabled:opacity-40`}
                disabled={checkedList.length === 0}
                onClick={() => {
                  if (checkedList.length > 0) {
                    navigate("/checkout", { state: { itemList: checkedList } });
                  }
                }}
              >
                Proceed to checkout
              </button>
              <span className="text-sm text-red-700">
                (Terms & conditions of sale apply)
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Cart;
