import { round } from "lodash";
import React from "react";
import { Card, Typography, CardHeader } from "@material-tailwind/react";
import { sqlDateToJSDate } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const TABLE_HEAD = ["", "Title", "Price", "Quantity", "Total"];

function OrderTable({ order }) {
  const navigate = useNavigate();
  return (
    <Card className="h-full w-full mt-4">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center mb-4">
          <div className="w-full text-center">
            {sqlDateToJSDate(order.orderDate).toDateString()}
          </div>
        </div>
      </CardHeader>
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
          {order.orderInfo.map((item, index) => {
            const classes = "p-4 text-center";

            return (
              <tr key={item.book.id}>
                <td className={`${classes} w-40`}>
                  <img
                    src={
                      import.meta.env.VITE_APP_API +
                      item.book.images[0].imageLocation
                    }
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/book/" + item.book.id);
                    }}
                  />
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Typography color="blue-gray" className="font-normal">
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
                    {item.actualPrice !== item.price && (
                      <Typography
                        color="blue-gray"
                        variant="small"
                        className="font-normal opacity-70 line-through"
                      >
                        {item.price}
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
                  <Typography color="blue-gray" className="font-normal">
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
                {round(order.totalPrice - order.deliveryPrice, 2)} $
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
                {order.deliveryPrice} $
              </Typography>
            </td>
          </tr>
          <tr>
            <td className={`p-2 w-40 text-right`} colSpan={4}>
              <Typography color="blue-gray" className="font-normal text-lg">
                Total Grand
              </Typography>
            </td>

            <td className={`p-2 w-40 text-center`}>
              <Typography color="blue-gray" className="font-bold text-red-700">
                {order.totalPrice} $
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
      {/* </CardBody> */}
    </Card>
  );
}

export default OrderTable;
