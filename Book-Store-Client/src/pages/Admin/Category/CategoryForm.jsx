import { useState, useEffect } from "react";
import { Category } from "../../../services/Category.service";
import { Input, Select, Option } from "@material-tailwind/react";
import MyDialog from "../../../components/MyDialog";
import Modal from "../../../components/Modal";

function CategoryForm({ isOpen, setIsOpen }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [parent, setParent] = useState({});
  const [parents, setParents] = useState([]);
  const [dialog, setDialog] = useState({
    header: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    Category.getAllParentCategoryAdmin().then((res) => {
      console.log(res);
      setParents([...res, { name: "None" }]);
    });
  }, []);

  function handleFileChange(e) {
    let selectedFile = e.target.files[0];
    // Update the state with the files
    setImage(selectedFile);
    let fileURL = URL.createObjectURL(selectedFile);
    // Update the state with the file and the URL
    setImageUrl(fileURL);
  }

  function validateForm() {
    // create an object to store the new errors
    let newErrors = {};
    // validate the name field
    if (name.length === 0) {
      newErrors.name = "You must provide a name";
    }
    if (image === null) {
      newErrors.image = "You must choose an image";
    }
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  const submit = () => {
    if (validateForm()) {
      Category.createCategory(name, image, parent)
        .then((res) => {
          if (res.status === 200 || res.status === 201 || res.status === 204) {
            setDialog({
              header: "Success",
              message: "Created success",
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
      <div className="bg-white p-6 rounded-md w-8/12 max-h-screen">
        <h1 className="pb-2 border-b font-semibold text-lg uppercase">
          Add Category
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
                <span className="mt-2 text-sm text-red-500">{errors.name}</span>
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
                // value={province.provinceName}
                onChange={(e) => {
                  setParent(e);
                }}
              >
                {parents.map((cate) => {
                  return (
                    <Option key={cate.id} value={cate}>
                      {cate.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Image
            </label>
            <div className="flex flex-col w-full">
              <input
                class="block w-full mb-2 text-sm text-gray-900 !border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:py-2 file:bg-black file:text-white file:rounded-md"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              ></input>
              <div className="flex">
                <img src={imageUrl} alt="" className="mr-4 w-20" />
              </div>

              {errors.image && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.image}
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

export default CategoryForm;
