import { useState, useEffect } from "react";
import { Category } from "../../../services/Category.service";
import { Input, Select, Option } from "@material-tailwind/react";
import MyDialog from "../../../components/MyDialog";
import Modal from "../../../components/Modal";
import { Location } from "../../../services/Location.service";

function DeliveryForm({ isOpen, setIsOpen, load }) {
  const [method, setMethod] = useState("");
  const [base, setBase] = useState(0);
  const [coefficient, setCoefficient] = useState(0);
  const [dialog, setDialog] = useState({
    header: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const [errors, setErrors] = useState({
    method: "",
    base: "",
    coefficient: "",
  });

  function validateForm() {
    // create an object to store the new errors
    let newErrors = {};
    // validate the name field
    if (method.length === 0) {
      newErrors.method = "You must provide a method name";
    }
    if (base <= 0) {
      newErrors.base = "Base must be greater than 0";
    }
    if (coefficient <= 0) {
      newErrors.coefficient = "Coefficient must be greater than 0";
    }
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  const submit = () => {
    if (validateForm()) {
      Location.createDelivery(method, base, coefficient)
        .then((res) => {
          if (res.status === 200 || res.status === 201 || res.status === 204) {
            setDialog({
              header: "Success",
              message: "Created success",
              isOpen: true,
              isSuccess: true,
            });
            load();
          } else {
            setDialog({
              header: "Failed",
              message: res.message,
              isOpen: true,
              isSuccess: false,
            });
          }
        })
        .catch(() => {
          setDialog({
            header: "Failed",
            message: "There is something wrong, please try again later",
            isOpen: true,
            isSuccess: false,
          });
        });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="bg-white p-6 rounded-md w-8/12 max-h-screen">
        <h1 className="pb-2 border-b font-semibold text-lg uppercase">
          Add Delivery
        </h1>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className=""
        >
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Method Name
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Method Name"
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                }}
                className=" focus-visible:outline-blue-300 font-semibold"
                error={errors.method && errors.method.length.length > 0}
              ></Input>

              {errors.method && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.method}
                </span>
              )}
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Base
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Base"
                value={base}
                type="number"
                onChange={(e) => {
                  setBase(e.target.value);
                }}
                className=" focus-visible:outline-blue-300 font-semibold"
                error={errors.base && errors.base.length.length > 0}
              ></Input>

              {errors.base && (
                <span className="mt-2 text-sm text-red-500">{errors.base}</span>
              )}
            </div>
          </div>

          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Coefficient
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Coefficient"
                value={coefficient}
                type="number"
                onChange={(e) => {
                  setCoefficient(e.target.value);
                }}
                className=" focus-visible:outline-blue-300 font-semibold"
                error={
                  errors.coefficient && errors.coefficient.length.length > 0
                }
              ></Input>

              {errors.coefficient && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.coefficient}
                </span>
              )}
            </div>
          </div>
          {/* button part  */}
          <div className="flex mx-auto mb-4 mt-8 justify-center">
            <button className="py-2 px-8 bg-red-600 text-white font-semibold rounded-md mr-4">
              Save changed
            </button>
            <button
              className="py-2 px-8 border border-red-600 font-semibold text-red-600 rounded-md"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <MyDialog
        header={dialog.header}
        message={dialog.message}
        isOpen={dialog.isOpen}
        handleOpen={() => {
          setDialog((prev) => {
            return { ...prev, isOpen: false };
          });
          if (dialog.isSuccess) {
            setIsOpen(false);
          }
        }}
        isSuccess={dialog.isSuccess}
      ></MyDialog>
    </Modal>
  );
}

export default DeliveryForm;
