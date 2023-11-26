import React, { useState } from "react";
import Modal from "./Modal";
import { Textarea } from "@material-tailwind/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ReactStars from "react-stars";
import { Review } from "../services/Review.service";
import { toast } from "react-toastify";

function WriteReview({ isOpen, setIsOpen, book }) {
  const [stars, setStars] = useState(1);
  const [comment, setComment] = useState("");

  const submitReview = (e) => {
    e.preventDefault();
    Review.createReview(book.id, comment, stars).then((response) => {
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        toast("Your review has been recorded", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsOpen(false);
      } else if (response.status === 400) {
        toast.error("You have already review this product", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsOpen(false);
      } else {
        toast.error("There's something go wrong, please try again later", {
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
    <Modal
      isOpen={isOpen}
      handleClose={() => {
        setIsOpen(false);
      }}
      setIsOpen={setIsOpen}
    >
      <form
        className="bg-white rounded-md w-1/2 h-2/3 flex items-center flex-col relative p-4 group"
        onSubmit={submitReview}
        noValidate
      >
        <h1 className="uppercase font-bold text-lg">Write review product</h1>
        <CloseOutlinedIcon
          className="text-gray-500 absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            setIsOpen(false);
          }}
        ></CloseOutlinedIcon>

        <ReactStars
          count={5}
          size={42}
          value={stars}
          color2={"#ffd700"}
          className="inline-block mb-8"
          half={false}
          onChange={(newStar) => {
            setStars(newStar);
          }}
        />
        <div className="w-full">
          <Textarea
            label="Enter your review, review must be at least 10 characters and at most 1000 characters long"
            maxLength={1000}
            minLength={10}
            size="lg"
            color="gray"
            rows={8}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            required
            className="peer"
          />
        </div>
        <p className="text-orange-900 text-sm italic mt-2">
          You can't change the review later, so please be careful.
        </p>
        <div className="self-end mt-auto">
          <button
            className="m-4 text-sm font-semibold text-gray-700"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className="py-2 px-14 text-sm text-white rounded-md font-semibold !bg-red-700 group-invalid:pointer-events-none group-invalid:opacity-30"
            type="submit"
          >
            Send Review
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default WriteReview;
