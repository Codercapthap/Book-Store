import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { success, danger } from "../assets/images";

export default function MyDialog({
  header,
  message,
  isOpen,
  handleOpen,
  isSuccess,
}) {
  return (
    <>
      <Dialog
        open={isOpen}
        handler={handleOpen}
        className="flex flex-col items-center"
      >
        <DialogHeader>{header}</DialogHeader>
        {isSuccess ? (
          <img src={success} className="w-72" alt="" />
        ) : (
          <img src={danger} className="w-72" alt="" />
        )}
        <DialogBody>{message}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            className="!bg-green-500"
            onClick={handleOpen}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
