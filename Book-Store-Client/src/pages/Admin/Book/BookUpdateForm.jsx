import { useState, useEffect } from "react";
import { Category } from "../../../services/Category.service";
import { Textarea, Input, Select, Option } from "@material-tailwind/react";
import MyDialog from "../../../components/MyDialog";
import Modal from "../../../components/Modal";
import Loading from "../../../components/Loading";
import { Book } from "../../../services/Book.service";
import { Spinner } from "@material-tailwind/react";

function BookUpdateForm({ isOpen, setIsOpen, book }) {
  const [title, setTitle] = useState(book.title);
  const [category, setCategory] = useState(book.category);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [price, setPrice] = useState(book.price);
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
  });

  useEffect(() => {
    Category.getSubCategory().then((res) => {
      setCategories(res);
    });
    if (Object.keys(book).length > 0) {
      setTitle(book.title);
      setDescription(book.description);
      setPrice(book.price);
      setAuthor(book.author);
      setCategory(book.category);
    }
  }, [book]);

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
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  const submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      Book.updateBook(
        book.id,
        title,
        description.replace(/(?:\r\n|\r|\n)/g, "<>"),
        category.id,
        price,
        author
      )
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
              message: res.response.message,
              isOpen: true,
              isSuccess: false,
            });
          }
          setIsLoading(false);
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
      {!category ? (
        <div className="opacity-30 flex justify-center items-center my-4">
          <Spinner className="h-16 w-16 " />
        </div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-md w-8/12 max-h-screen overflow-y-scroll">
            <h1 className="pb-2 border-b font-semibold text-lg uppercase">
              Update book
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
                    value={category.name}
                    onChange={(e) => {
                      setCategory(categories.find((c) => c.name === e));
                      setErrors((prev) => {
                        return { ...prev, category: "" };
                      });
                    }}
                    error={errors.category && errors.category.length > 0}
                  >
                    {categories.map((cate) => {
                      return (
                        <Option key={cate.id} value={cate.name}>
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
                        errors.description &&
                        errors.description.length.length > 0
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
        </>
      )}
    </Modal>
  );
}

export default BookUpdateForm;
