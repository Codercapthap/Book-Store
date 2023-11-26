import React from "react";
import { Spinner } from "@material-tailwind/react";
import { createPortal } from "react-dom";

function Loading() {
  return createPortal(
    <div className="fixed top-0 bottom-0 right-0 left-0 opacity-30 flex justify-center items-center">
      <Spinner className="h-16 w-16 " />
    </div>,
    document.getElementById("loading")
  );
}

export default Loading;
