import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { Book } from "../../../services/Book.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import BookForm from "./BookForm";
import { toast } from "react-toastify";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import { sqlDateToJSDate } from "../../../helper/helper";
import BookUpdateForm from "./BookUpdateForm";
import Loading from "../../../components/Loading";
import MyDialog from "../../../components/MyDialog";

export default function BookTable() {
  const [bookPage, setBookPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [currentEditBook, setCurrentEditBook] = useState({});
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isHandling, setIsHandling] = useState(false);
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    Book.getAllBookAdmin(query, sort, currentPage - 1, 3).then((res) => {
      setBookPage(res);
      setTotalPages(res.totalPages);
      setIsLoading(false);
    });
  }, [currentPage, sort]);

  const TABLE_HEAD = [
    <div
      onClick={() => {
        if (sort === "titled") {
          setSort("titlea");
        } else setSort("titled");
      }}
    >
      Title <SortOutlinedIcon></SortOutlinedIcon>
    </div>,
    "Author",
    "Description",
    "Images",
    <div
      onClick={() => {
        if (sort === "priced") {
          setSort("pricea");
        } else setSort("priced");
      }}
    >
      Price <SortOutlinedIcon></SortOutlinedIcon>
    </div>,
    "Category",
    <div
      onClick={() => {
        if (sort === "deletedAtd") {
          setSort("deletedAta");
        } else setSort("deletedAtd");
      }}
    >
      Delete Date <SortOutlinedIcon></SortOutlinedIcon>
    </div>,
    "Action",
  ];
  // useEffect(() => {
  //   setIsLoading(true);
  //   setCurrentPage(1);
  //   Book.getAllBook(query, null, 0, 3).then((res) => {
  //     setBookPage(res);
  //     setTotalPages(res.totalPages);
  //     setIsLoading(false);
  //   });
  // }, [query]);

  const searching = () => {
    setIsLoading(true);
    setCurrentPage(1);
    Book.getAllBookAdmin(query, sort, 0, 3).then((res) => {
      setBookPage(res);
      setTotalPages(res.totalPages);
      setIsLoading(false);
    });
  };

  const deleteBook = (id) => {
    Book.deleteBook(id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast("Successfully removed book", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Failed to remove book", {
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

  const restore = (id) => {
    Book.restoreBook(id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast("Successfully restored book", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Failed to restore book", {
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
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row pt-2 relative">
            <div>
              <button
                className="bg-red-700 py-2 px-8 rounded-md text-white font-semibold flex items-center"
                onClick={() => {
                  setIsOpenAddModal(true);
                }}
              >
                <AddOutlinedIcon></AddOutlinedIcon> Add new book
              </button>
            </div>
            <div className="w-full md:w-72 mr-8">
              <Input
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    searching();
                  }
                }}
                label="Search"
              />
              <SearchOutlinedIcon
                className="absolute top-4 right-12 cursor-pointer"
                onClick={() => {
                  searching();
                }}
              ></SearchOutlinedIcon>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-center gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {/* {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )} */}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8}>
                    <div className="opacity-30 w-full flex justify-center items-center my-4">
                      <Spinner className="h-16 w-16 " />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {bookPage.content.map((item, index) => {
                    const isLast = index === bookPage.content.length - 1;
                    const classes = isLast
                      ? "p-4 text-sm"
                      : "p-4 text-sm border-b border-blue-gray-50";

                    return (
                      <tr key={item.id}>
                        {console.log(item)}
                        <td className={classes}>
                          <div className="flex items-center gap-3 break-words w-32">
                            <div
                              className="flex flex-col cursor-pointer"
                              onClick={() => {
                                navigate("/book/" + item.id);
                              }}
                            >
                              <p color="blue-gray" className="font-normal">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3 w-16">
                            <div className="flex flex-col">
                              <p color="blue-gray" className="font-normal">
                                {item.author}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col text-start break-words w-60">
                              {/* <p
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.description}
                            </p> */}
                              {item.description.split("<>").map((text) => {
                                return (
                                  <>
                                    <p
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {text}
                                    </p>{" "}
                                    <br />
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                        <td className={`${classes} w-40 `}>
                          {item.images.map((image) => {
                            return (
                              <div className="relative">
                                <span
                                  className="absolute top-0 right-0 cursor-pointer bg-red-700 text-white rounded-full"
                                  onClick={(e) => {
                                    if (item.images.length === 1) {
                                      setIsOpenDialog(true);
                                    } else {
                                      setIsHandling(true);
                                      Book.deleteImage(image.id).then((res) => {
                                        if (
                                          res.status === 200 ||
                                          res.status === 201 ||
                                          res.status === 204
                                        ) {
                                          searching();
                                          toast("Successfully delete image", {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light",
                                          });
                                        } else {
                                          toast.error(
                                            "Failed to delete image",
                                            {
                                              position: "top-right",
                                              autoClose: 5000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                              theme: "light",
                                            }
                                          );
                                        }
                                        setIsHandling(false);
                                      });
                                    }
                                  }}
                                >
                                  <CloseOutlinedIcon></CloseOutlinedIcon>
                                </span>
                                <img
                                  src={
                                    import.meta.env.VITE_APP_API +
                                    image.imageLocation
                                  }
                                  alt=""
                                  className="mb-4"
                                />
                              </div>
                            );
                          })}
                          {item.images.length < 3 && (
                            <div>
                              <label
                                className="border-red-700 border px-2 py-2 rounded-md text-red-700 cursor-pointer"
                                htmlFor={item.id}
                              >
                                <AddOutlinedIcon></AddOutlinedIcon> Add image
                              </label>
                              <input
                                type="file"
                                id={item.id}
                                name={item.id}
                                className="hidden"
                                onChange={(e) => {
                                  setIsHandling(true);
                                  Book.addImage(
                                    item.id,
                                    e.target.files[0]
                                  ).then((res) => {
                                    if (
                                      res.status === 200 ||
                                      res.status === 201 ||
                                      res.status === 204
                                    ) {
                                      searching();
                                      toast("Successfully add image", {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                      });
                                    } else {
                                      toast.error("Failed to add image", {
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
                                    setIsHandling(false);
                                  });
                                }}
                              />
                            </div>
                          )}
                        </td>
                        <td className={`${classes} w-18 text-center`}>
                          <div className="flex flex-col">
                            <p
                              variant="paragraph"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.actualPrice}
                            </p>
                            {item.actualPrice !== item.price && (
                              <p
                                color="blue-gray"
                                variant="small"
                                className="font-normal opacity-70 line-through"
                              >
                                {item.price}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className={`${classes} w-28`}>
                          <p
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item.category.name}
                          </p>
                        </td>
                        <td className={classes}>
                          <p color="blue-gray" className="font-normal">
                            {item.deletedAt !== null &&
                              sqlDateToJSDate(item.deletedAt).toDateString()}
                          </p>
                        </td>
                        <td className={`${classes} w-24`}>
                          <div className="flex justify-between">
                            <button
                              className="hover:text-orange-700"
                              onClick={() => {
                                setCurrentEditBook(item);
                                setIsOpenEditModal(true);
                              }}
                            >
                              <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                            </button>
                            {item.deletedAt === null ? (
                              <button
                                className="hover:text-red-700"
                                onClick={() => {
                                  deleteBook(item.id);
                                }}
                              >
                                <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                              </button>
                            ) : (
                              <button
                                className="hover:text-red-700"
                                onClick={() => {
                                  restore(item.id);
                                }}
                              >
                                <RestoreOutlinedIcon></RestoreOutlinedIcon>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                if (currentPage === 1) return;
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                if (currentPage === totalPages) return;
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <BookForm
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
      ></BookForm>
      <BookUpdateForm
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        book={currentEditBook}
      ></BookUpdateForm>
      <MyDialog
        header="Can't delete this image"
        message="Book must has at least one image"
        isOpen={isOpenDialog}
        handleOpen={() => {
          setIsOpenDialog(false);
        }}
        isSuccess={false}
      ></MyDialog>
      {isHandling && <Loading></Loading>}
    </>
  );
}
