import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Order as OrderService } from "../../services/Order.service";
import OrderTable from "./OrderTable";
import { Spinner } from "@material-tailwind/react";
import Pagination from "../../components/Pagination";
import { Helmet } from "react-helmet";

function Order() {
  const [orderPage, setOrderPage] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    OrderService.getOrder(currentPage - 1).then((res) => {
      console.log(res);
      setOrderPage(res);
      setTotalPage(res.totalPages);
      setIsLoading(false);
    });
  }, [currentPage]);

  return (
    <div>
      <Helmet>
        <title>My Orders - Book Store</title>
      </Helmet>
      <Header></Header>
      <div className="container mx-auto mb-4">
        {!orderPage.content || orderPage.content.length == 0 ? (
          <div className="w-full h-20 flex items-center justify-center">
            <span className="text-red-700 italic font-semibold">
              You have no items in your favourites
            </span>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="opacity-30 w-full flex justify-center items-center my-4">
                <Spinner className="h-16 w-16 " />
              </div>
            ) : (
              orderPage.content.map((order) => {
                return <OrderTable order={order}></OrderTable>;
              })
            )}
            <Pagination
              currentPage={currentPage}
              setCurrentPage={(newPage) => {
                setCurrentPage(newPage);
              }}
              totalPages={totalPage}
            ></Pagination>
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Order;
