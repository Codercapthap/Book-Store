import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { success } from "../assets/images";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { round } from "lodash";
import { Helmet } from "react-helmet";

const TABLE_HEAD = ["", "Title", "Price", "Quantity", "Total"];

function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  useEffect(() => {
    if (!state) {
      console.log("here");
      navigate("/cart");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Success - Book Store</title>
      </Helmet>
      {state && (
        <div>
          <Header></Header>
          <div className="container mx-auto my-4">
            <div className="flex flex-col mx-auto w-1/3 items-center uppercase text-green-700">
              <img src={success} alt="" />
              <span className="text-2xl font-bold my-4">Thank you</span>
              <span className="text-3xl font-bold">
                Your order is confirmed
              </span>
              <Link
                to={"/"}
                className="text-white bg-red-700 rounded-xl uppercase px-12 py-2 mt-4 font-bold"
              >
                Continue shopping
              </Link>
            </div>
            <div>
              <Card className="h-full w-full mt-8">
                {/* <CardBody className="overflow scroll px-0"> */}
                <table className="w-full min-w-max table-auto text-left rounded-md overflow-y-scroll">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head, index) => (
                        <th
                          key={head}
                          className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                        >
                          <Typography
                            color="blue-gray"
                            className="flex items-center justify-center gap-2 font-normal leading-none opacity-70"
                          >
                            {head}{" "}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {state.itemList.map((item, index) => {
                      const classes = "p-4 text-center";

                      return (
                        <tr key={item.book.id}>
                          <td className={`${classes} w-40`}>
                            <img
                              src={
                                import.meta.env.VITE_APP_API +
                                item.images[0].imageLocation
                              }
                              alt=""
                              className=""
                            />
                          </td>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.book.title}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="paragraph"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item.actualPrice}
                              </Typography>
                              {item.actualPrice !== item.book.price && (
                                <Typography
                                  color="blue-gray"
                                  variant="small"
                                  className="font-normal opacity-70 line-through"
                                >
                                  {item.book.price}
                                </Typography>
                              )}
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {item.quantity}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              color="blue-gray"
                              className="font-normal"
                            >
                              {round(item.quantity * item.actualPrice, 2)}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className={`p-2 w-40 text-right`} colSpan={4}>
                        <Typography color="blue-gray" className="font-normal">
                          Subtotal
                        </Typography>
                      </td>

                      <td className={`p-2 w-40 text-center`}>
                        <Typography color="blue-gray" className="font-normal">
                          {state.subTotal} $
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td className={`p-2 w-40 text-right`} colSpan={4}>
                        <Typography color="blue-gray" className="font-normal">
                          Delivery Price
                        </Typography>
                      </td>

                      <td className={`p-2 w-40 text-center`}>
                        <Typography color="blue-gray" className="font-normal">
                          {state.method.price} $
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td className={`p-2 w-40 text-right`} colSpan={4}>
                        <Typography
                          color="blue-gray"
                          className="font-normal text-lg"
                        >
                          Total Grand
                        </Typography>
                      </td>

                      <td className={`p-2 w-40 text-center`}>
                        <Typography
                          color="blue-gray"
                          className="font-bold text-red-700"
                        >
                          {state.totalPrice} $
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* </CardBody> */}
              </Card>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
}

export default OrderSuccess;
