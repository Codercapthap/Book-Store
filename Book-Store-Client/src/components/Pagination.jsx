import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const [active, setActive] = React.useState(currentPage);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === totalPages) return;
    setCurrentPage(currentPage + 1);
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setCurrentPage(currentPage - 1);
    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-4 justify-center mt-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ChevronLeftOutlinedIcon className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from(Array(totalPages).keys()).map((page) => {
          return (
            <IconButton
              className={`${active === page + 1 && "!bg-red-700"} text-base`}
              {...getItemProps(page + 1)}
              key={page}
              onClick={() => {
                setActive(page + 1);
                setCurrentPage(page + 1);
              }}
            >
              {page + 1}
            </IconButton>
          );
        })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
      >
        Next
        <ChevronRightOutlinedIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
  // return (
  // <div className="flex justify-center items-center mt-8">
  //   <button className="py-2 w-10 rounded-md bg-red-700 text-white">
  //     <ChevronLeftOutlinedIcon></ChevronLeftOutlinedIcon>
  //   </button>
  //   <button
  //     className="py-2 w-10 rounded-md"
  //     onClick={() => {
  //       setCurrentPage;
  //     }}
  //   >
  //   </button>
  //   <button className="py-2 w-10 rounded-md">
  //   </button>
  //   <button className="py-2 w-10 rounded-md">
  //   </button>
  //   <button className="py-2 w-10 rounded-md">
  //     <ChevronRightOutlinedIcon></ChevronRightOutlinedIcon>
  //   </button>
  // </div>
  // );
}

export default Pagination;
