import { useState, useEffect } from "react";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import { User } from "../../services/User.service";
import { Book } from "../../services/Book.service";
import { Order } from "../../services/Order.service";
import { Spinner } from "@material-tailwind/react";

function HomePanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      User.getUserTotal(),
      Book.getBookTotal(),
      Order.getOrderTotal(),
    ]).then((res) => {
      console.log(res);
      setUserCount(res[0]);
      setBookCount(res[1]);
      setOrderCount(res[2]);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="opacity-30 flex justify-center items-center my-4">
          <Spinner className="h-16 w-16 " />
        </div>
      ) : (
        <div className="h-full">
          <div className="bg-red-700 flex items-center justify-center h-1/6">
            <h1 className="text-white font-bold text-2xl">
              Welcome back to admin panel, Admin
            </h1>
          </div>
          <div className="bg-white flex justify-evenly w-full h-5/6 items-center">
            <div className="bg-gradient-to-r from-red-400 to-red-700 w-48 h-32 p-4 rounded-3xl text-white">
              <h1>Books</h1>
              <span className="w-full flex justify-around items-center h-2/3 text-lg font-bold">
                <MenuBookOutlinedIcon fontSize="large"></MenuBookOutlinedIcon>{" "}
                {bookCount}
              </span>
            </div>
            <div className="bg-gradient-to-r from-red-400 to-red-700 w-48 h-32 p-4 rounded-3xl text-white">
              <h1>Users</h1>
              <span className="w-full flex justify-around items-center h-2/3 text-lg font-bold">
                <AccountCircleOutlinedIcon fontSize="large"></AccountCircleOutlinedIcon>
                {userCount}
              </span>
            </div>
            <div className="bg-gradient-to-r from-red-400 to-red-700 w-48 h-32 p-4 rounded-3xl text-white">
              <h1>Orders</h1>
              <span className="w-full flex justify-around items-center h-2/3 text-lg font-bold">
                <GradingOutlinedIcon fontSize="large"></GradingOutlinedIcon>{" "}
                {orderCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePanel;
