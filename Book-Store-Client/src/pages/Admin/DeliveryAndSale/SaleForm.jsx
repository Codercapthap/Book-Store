import { useState, useEffect } from "react";
import { Category } from "../../../services/Category.service";
import { Input, Select, Option } from "@material-tailwind/react";
import MyDialog from "../../../components/MyDialog";
import Modal from "../../../components/Modal";
import { Location } from "../../../services/Location.service";
import { Sale } from "../../../services/Sale.service";

function SaleForm({ isOpen, setIsOpen, load }) {
  const [category, setCategory] = useState({});
  const [percent, setPercent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [dialog, setDialog] = useState({
    header: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const [errors, setErrors] = useState({
    category: "",
    percent: "",
  });

  useEffect(() => {
    Category.getSubCategory().then((res) => {
      setCategories(res);
    });
  }, []);

  function validateForm() {
    // create an object to store the new errors
    let newErrors = {};
    // validate the name field
    if (Object.keys(category).length === 0) {
      newErrors.category = "You must choose a category";
    }
    if (percent <= 0) {
      newErrors.percent = "Sale Percent must be greater than 0";
    }
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  const submit = () => {
    if (validateForm()) {
      Sale.createSale(category.id, percent)
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
          Create Sale
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
              Category
            </label>
            <div className="flex flex-col w-full">
              <Select
                label={"Choose Category"}
                // value={province.provinceName}
                onChange={(e) => {
                  setCategory(e);
                  setErrors((prev) => {
                    return { ...prev, category: "" };
                  });
                }}
                error={errors.category && errors.category.length > 0}
              >
                {categories.map((cate) => {
                  return (
                    <Option key={cate.id} value={cate}>
                      {cate.name}
                    </Option>
                  );
                })}
              </Select>
              {errors.category && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.category}
                </span>
              )}
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Percent
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Percent"
                value={percent}
                type="number"
                onChange={(e) => {
                  setPercent(e.target.value);
                }}
                className=" focus-visible:outline-blue-300 font-semibold"
                error={errors.percent && errors.percent.length.length > 0}
              ></Input>

              {errors.percent && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.percent}
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

export default SaleForm;
