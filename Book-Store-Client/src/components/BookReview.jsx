import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import { sqlDateToJSDate } from "../helper/helper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Progress } from "@material-tailwind/react";
import ReactStars from "react-stars";
import { Spinner } from "@material-tailwind/react";
import { Book as BookService } from "../services/Book.service";
import WriteReview from "../components/WriteReview";
import { useSelector } from "react-redux";

function BookReview({
  id,
  isOpenLoginModal,
  setIsOpenLoginModal,
  setActive,
  book,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [ratings, setRatings] = useState([]);
  const [ratingStat, setRatingStat] = useState({});
  const [isOpenReviewModal, setisOpenReviewModal] = useState(false);
  const user = useSelector((state) => state.User.currentUser);
  useEffect(() => {
    Promise.all([
      BookService.getRatingByBookId(id, currentPage - 1),
      BookService.getRatingStatByBookId(id),
    ]).then((result) => {
      setTotalPage(result[0].totalPages);
      setRatings(result[0].content);
      setRatingStat(result[1]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="opacity-30 flex justify-center items-center my-4">
          <Spinner className="h-16 w-16 " />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md">
          {/* reviews */}
          <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
          {/* general */}
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-1/6 justify-center items-center">
              <div>
                <span className="font-bold text-6xl">
                  {ratingStat.averageStar}
                </span>
                <span className="font-semibold text-4xl">/5</span>
              </div>

              <ReactStars
                count={5}
                size={24}
                value={book.averageRating}
                edit={false}
                color2={"#ffd700"}
                className="inline-block cursor-pointer"
              />

              <span className="text-sm text-gray-700">{`(${book.totalRate} ratings)`}</span>
            </div>
            {/* star from 5 to 1 stat */}
            <div className="w-1/4">
              <div className="grid grid-cols-10 gap-6 items-center">
                <span className="col-span-2">5 star</span>
                <Progress
                  size="sm"
                  className="col-span-7"
                  color="amber"
                  value={
                    ratingStat.ratingCount["5"]
                      ? (ratingStat.ratingCount["5"] * 100) /
                        ratingStat.totalRate
                      : 0
                  }
                />
                <span>
                  {ratingStat.ratingCount["5"]
                    ? (ratingStat.ratingCount["5"] * 100) /
                        ratingStat.totalRate +
                      "%"
                    : "0%"}
                </span>
              </div>
              <div className="grid grid-cols-10 gap-6 items-center">
                <span className="col-span-2">4 star</span>
                <Progress
                  size="sm"
                  className="col-span-7"
                  color="amber"
                  value={
                    ratingStat.ratingCount["4"]
                      ? (ratingStat.ratingCount["4"] * 100) /
                        ratingStat.totalRate
                      : 0
                  }
                />
                <span>
                  {ratingStat.ratingCount["4"]
                    ? (ratingStat.ratingCount["4"] * 100) /
                        ratingStat.totalRate +
                      "%"
                    : "0%"}
                </span>
              </div>
              <div className="grid grid-cols-10 gap-6 items-center">
                <span className="col-span-2">3 star</span>
                <Progress
                  size="sm"
                  className="col-span-7"
                  color="amber"
                  value={
                    ratingStat.ratingCount["3"]
                      ? (ratingStat.ratingCount["3"] * 100) /
                        ratingStat.totalRate
                      : 0
                  }
                />
                <span>
                  {ratingStat.ratingCount["3"]
                    ? (ratingStat.ratingCount["3"] * 100) /
                        ratingStat.totalRate +
                      "%"
                    : "0%"}
                </span>
              </div>
              <div className="grid grid-cols-10 gap-6 items-center">
                <span className="col-span-2">2 star</span>
                <Progress
                  size="sm"
                  className="col-span-7"
                  color="amber"
                  value={
                    ratingStat.ratingCount["2"]
                      ? (ratingStat.ratingCount["2"] * 100) /
                        ratingStat.totalRate
                      : 0
                  }
                />
                <span>
                  {ratingStat.ratingCount["2"]
                    ? (ratingStat.ratingCount["2"] * 100) /
                        ratingStat.totalRate +
                      "%"
                    : "0%"}
                </span>
              </div>
              <div className="grid grid-cols-10 gap-6 items-center">
                <span className="col-span-2">0 star</span>
                <Progress
                  size="sm"
                  className="col-span-7"
                  color="amber"
                  value={
                    ratingStat.ratingCount["1"]
                      ? (ratingStat.ratingCount["1"] * 100) /
                        ratingStat.totalRate
                      : 0
                  }
                />
                <span>
                  {ratingStat.ratingCount["1"]
                    ? (ratingStat.ratingCount["1"] * 100) /
                        ratingStat.totalRate +
                      "%"
                    : "0%"}
                </span>
              </div>
            </div>
            {/* write review */}
            <div className="w-1/2 flex justify-center items-center">
              {user ? (
                <button
                  className="py-2 px-32 border-2 border-red-700 text-red-700 font-semibold rounded-md"
                  onClick={() => {
                    setisOpenReviewModal(true);
                  }}
                >
                  <EditOutlinedIcon></EditOutlinedIcon>
                  Write review
                </button>
              ) : (
                <span>
                  Only registered users can write reviews. Please,{" "}
                  <span
                    onClick={() => {
                      setIsOpenLoginModal(true);
                      setActive("signIn");
                    }}
                    className="text-blue-500 cursor-pointer"
                  >
                    log in
                  </span>{" "}
                  or{" "}
                  <span
                    onClick={() => {
                      setIsOpenLoginModal(true);
                      setActive("register");
                    }}
                    className="text-blue-500 cursor-pointer"
                  >
                    register
                  </span>
                </span>
              )}
            </div>
          </div>
          {/* detail  */}
          {totalPage != 0 && (
            <div className="border-t border-t-gray-500 mt-4">
              {ratings.map((rating) => {
                return (
                  <div className=" flex mt-4" key={rating.user.id}>
                    <div className="w-2/12 flex flex-col mt-2">
                      <span className="font-semibold">{rating.user.name}</span>
                      <span className="text-sm text-gray-700">
                        {sqlDateToJSDate(rating.createdAt).toDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col w-10/12">
                      <ReactStars
                        count={5}
                        size={24}
                        value={rating.stars}
                        color2={"#ffd700"}
                        className="inline-block"
                      />
                      <span>{rating.comment}</span>
                    </div>
                  </div>
                );
              })}

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPage}
              ></Pagination>
            </div>
          )}
          <WriteReview
            isOpen={isOpenReviewModal}
            setIsOpen={setisOpenReviewModal}
            book={book}
          ></WriteReview>
        </div>
      )}
    </div>
  );
}

export default BookReview;
