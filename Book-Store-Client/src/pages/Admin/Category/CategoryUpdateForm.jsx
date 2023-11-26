import { useState, useEffect } from "react";
import { Category } from "../../../services/Category.service";
import { Textarea, Input, Select, Option } from "@material-tailwind/react";
import MyDialog from "../../../components/MyDialog";
import Modal from "../../../components/Modal";
import Loading from "../../../components/Loading";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Book } from "../../../services/Book.service";
import { Spinner } from "@material-tailwind/react";

function CategoryUpdateForm({ isOpen, setIsOpen, category, load }) {
  const [name, setName] = useState(category.category.name);
  const [parent, setParent] = useState(category.parent);
  const [parents, setParents] = useState([]);
  const [dialog, setDialog] = useState({
    header: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    parent: "",
  });

  useEffect(() => {
    Category.getAllParentCategoryAdmin().then((res) => {
      setParents([...res, { id: 0, name: "None" }]);
    });
  }, []);

  function validateForm() {
    // create an object to store the new errors
    let newErrors = {};
    // validate the name field
    if (name.length === 0) {
      newErrors.name = "You must provide a name";
    }
    if (
      category.category.subCategory.length !== 0 &&
      parent !== null &&
      parent?.name !== "None"
    ) {
      newErrors.parent = "The sub category must not have any sub categories";
    }
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  const submit = () => {
    if (validateForm()) {
      Category.updateCategory(category.category.id, name, parent?.id)
        .then((res) => {
          if (res.status === 200 || res.status === 201 || res.status === 204) {
            setDialog({
              header: "Success",
              message: "Update success",
              isOpen: true,
              isSuccess: true,
            });
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
      {parents.length == 0 ? (
        <div className="opacity-30 flex justify-center items-center my-4">
          <Spinner className="h-16 w-16 " />
        </div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-md w-8/12 max-h-screen">
            <h1 className="pb-2 border-b font-semibold text-lg uppercase">
              Update Category
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
                  Name
                </label>
                <div className="flex flex-col w-full">
                  <Input
                    label="Category Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className=" focus-visible:outline-blue-300 font-semibold"
                    error={errors.name && errors.name.length.length > 0}
                  ></Input>

                  {errors.name && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex my-4 items-center">
                <label htmlFor="" className="text-gray-700 w-1/4">
                  Parent
                </label>
                <div className="flex flex-col w-full">
                  <Select
                    label={"Choose Parent"}
                    // selected={category.parent.name}
                    value={parent?.name}
                    onChange={(e) => {
                      setParent(parents.find((c) => c.name === e));
                      setErrors((prev) => {
                        return { ...prev, parent: "" };
                      });
                    }}
                    error={errors.parent && errors.parent.length > 0}
                  >
                    {parents.map((cate) => {
                      return (
                        <Option key={cate.id} value={cate.name}>
                          {cate.name}
                        </Option>
                      );
                    })}
                  </Select>
                  {errors.parent && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.parent}
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
                if (load) {
                  load();
                }
              }
            }}
            isSuccess={dialog.isSuccess}
          ></MyDialog>
        </>
      )}
    </Modal>
  );
}

export default CategoryUpdateForm;
