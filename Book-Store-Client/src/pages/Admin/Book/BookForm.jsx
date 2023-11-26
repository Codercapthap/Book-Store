import { useState, useEffect } from "react";
import { Category } from "../../../services/Category.service";
import { Textarea, Input, Select, Option } from "@material-tailwind/react";
import MyDialog from "../../../components/MyDialog";
import Modal from "../../../components/Modal";
import Loading from "../../../components/Loading";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Book } from "../../../services/Book.service";

function BookForm({ isOpen, setIsOpen }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState({});
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState({
    header: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    author: "",
    description: "",
    price: "",
    images: "",
  });

  useEffect(() => {
    Category.getSubCategory().then((res) => {
      setCategories(res);
    });
  }, []);

  function handleFileChange(e) {
    // Get the selected files from the event object
    if (e.target.files.length + images.length > 3) {
      setDialog({
        header: "Warning",
        message: "You can only upload at most 3 files",
        isOpen: true,
        isSuccess: false,
      });
    } else {
      let selectedFiles = e.target.files;
      // Update the state with the files
      setImages([...images, ...selectedFiles]);
      let selectedFilesArray = [...selectedFiles];
      let selectedFilesUrlArray = [];
      selectedFilesArray.forEach((image) => {
        let fileURL = URL.createObjectURL(image);
        // Update the state with the file and the URL
        selectedFilesUrlArray = [...selectedFilesUrlArray, fileURL];
      });
      setImagesUrl([...imagesUrl, ...selectedFilesUrlArray]);
    }
  }

  function handleRemoveFile(imageUrl) {
    // Create a new array that does not contain the image URL
    let newImagesUrl = imagesUrl.filter((url) => url !== imageUrl);
    // Update the state with the new array
    setImagesUrl(newImagesUrl);
    // Find the index of the file object that corresponds to the image URL
    let fileIndex = images.findIndex(
      (file) => URL.createObjectURL(file) === imageUrl
    );
    // Remove the file object from the array at the given index
    images.splice(fileIndex, 1);
    // Update the state with the modified array
    setImages(images);
  }

  function validateForm() {
    // create an object to store the new errors
    let newErrors = {};
    // validate the name field
    if (title.length === 0) {
      newErrors.title = "You must provide a title";
    }
    if (Object.keys(category).length === 0) {
      newErrors.category = "You must choose a category";
    }
    if (author.length === 0) {
      newErrors.author = "You must provide an author";
    }
    if (description.length === 0) {
      newErrors.description = "You must provide an description";
    }
    if (price <= 0) {
      newErrors.price = "Price must be larger than 0";
    }
    if (images.length <= 0) {
      newErrors.images = "You must provide at least 1 image";
    }
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  const submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Book.createBook(
        title,
        description.replace(/(?:\r\n|\r|\n)/g, "<>"),
        category.id,
        price,
        author,
        images
      )
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
              message: res.response.message,
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
      <div className="bg-white p-6 rounded-md w-8/12 max-h-screen overflow-y-scroll">
        <h1 className="pb-2 border-b font-semibold text-lg uppercase">
          Add book
        </h1>
        <form noValidate onSubmit={submit} className="">
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Title
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Book Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className=" focus-visible:outline-blue-300 font-semibold"
                error={errors.title && errors.title.length.length > 0}
              ></Input>

              {errors.title && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.title}
                </span>
              )}
            </div>
          </div>
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
              Author
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Type Author"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                error={errors.author && errors.author.length.length > 0}
                className=" focus-visible:outline-blue-300 font-semibold"
              ></Input>

              {errors.author && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.author}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Description
            </label>
            <div className="flex w-full">
              <div className="flex flex-col w-full">
                <Textarea
                  label="Type Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  size="lg"
                  color="gray"
                  rows={6}
                  error={
                    errors.description && errors.description.length.length > 0
                  }
                  className=" focus:shadow-none font-semibold"
                ></Textarea>

                {errors.description && (
                  <span className="mt-2 text-sm text-red-500">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Price
            </label>
            <div className="flex flex-col w-full">
              <Input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                error={errors.price && errors.price.length.length > 0}
                className="font-semibold focus:shadow-none !rounded-md"
              ></Input>

              {errors.price && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.price}
                </span>
              )}
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/4">
              Images
            </label>
            <div className="flex flex-col w-full">
              {/* <Input
                onChange={handleFileChange}
                type="file"
                multiple
                className=" focus-visible:outline-blue-300 font-semibold"
              ></Input> */}
              <input
                class="block w-full mb-2 text-sm text-gray-900 !border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:py-2 file:bg-black file:text-white file:rounded-md"
                id="file_input"
                type="file"
                onChange={handleFileChange}
                multiple
              ></input>
              <div className="flex">
                {imagesUrl.length > 0 &&
                  imagesUrl.map((image) => {
                    return (
                      <div className="relative">
                        <img
                          key={image}
                          src={image}
                          alt=""
                          className="mr-4 w-20"
                        />
                        <span
                          className="absolute -top-2 right-2 bg-red-700 rounded-full text-white cursor-pointer"
                          onClick={() => {
                            handleRemoveFile(image);
                          }}
                        >
                          <CloseOutlinedIcon></CloseOutlinedIcon>
                        </span>
                      </div>
                    );
                  })}
              </div>

              {errors.images && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.images}
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
      {isLoading && <Loading></Loading>}
    </Modal>
  );
}

export default BookForm;
