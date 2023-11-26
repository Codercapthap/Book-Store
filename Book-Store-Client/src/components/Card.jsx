import React from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";

function Card({ book }) {
  const navigate = useNavigate();
  const navigateFunc = () => {
    navigate(`/book/${book.id}`);
  };
  return (
    <div className="flex flex-col max-h-96 hover:shadow-md py-2 px-6">
      <img
        src={import.meta.env.VITE_APP_API + book.images[0].imageLocation}
        alt=""
        className="w-full h-3/5 object-contain cursor-pointer"
        onClick={navigateFunc}
      />
      <p
        className="text-ellipsis line-clamp-2 cursor-pointer"
        onClick={navigateFunc}
      >
        {book.title}
      </p>
      <div className="mt-auto">
        <p className="text-red-500 text-xl font-bold">{book.actualPrice}$</p>
        {book.actualPrice !== book.price && (
          <p className="text-gray-500 line-through">{book.price}$</p>
        )}
        <div className="flex items-center">
          <ReactStars
            count={5}
            size={24}
            value={book.averageRating}
            color2={"#ffd700"}
            className="inline-block"
            edit={false}
          />
          <span className=" text-red-400">({book.totalRate})</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
