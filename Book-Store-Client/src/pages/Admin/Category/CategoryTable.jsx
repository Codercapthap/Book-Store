import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Spinner,
} from "@material-tailwind/react";
import { Category } from "../../../services/Category.service";
import { useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { toast } from "react-toastify";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import { sqlDateToJSDate } from "../../../helper/helper";
import Loading from "../../../components/Loading";
import CategoryForm from "./CategoryForm";
import CategoryUpdateForm from "./CategoryUpdateForm";

export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [currentEditCategory, setCurrentEditCategory] = useState({});
  const [isHandling, setIsHandling] = useState(false);
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setIsLoading(true);
    Category.getAllCategoryAdmin().then((res) => {
      setCategories(res);
      setIsLoading(false);
    });
  };

  const TABLE_HEAD = ["Name", "Image", "Parent", "Deleted Date", "Action"];

  const deleteCategory = (id) => {
    Category.deleteCategoryById(id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast("Successfully removed category", {
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
        toast.error("Failed to remove category", {
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
    Category.restoreCategoryById(id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast("Successfully restored category", {
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
        toast.error("Failed to restore category", {
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
          <div className="flex flex-col items-center gap-4 md:flex-row pt-2 relative">
            <div>
              <button
                className="bg-red-700 py-2 px-8 rounded-md text-white font-semibold flex items-center"
                onClick={() => {
                  setIsOpenAddModal(true);
                }}
              >
                <AddOutlinedIcon></AddOutlinedIcon> Add new category
              </button>
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
                  {categories.map((item, index) => {
                    const isLast = index === categories.length - 1;
                    const classes = isLast
                      ? "p-4 text-sm"
                      : "p-4 text-sm border-b border-blue-gray-50";

                    return (
                      <tr key={item.category.id}>
                        <td className={`${classes}`}>
                          <div className="flex items-center justify-center gap-3 break-words">
                            <div className="flex flex-col cursor-pointer">
                              <p color="blue-gray" className="font-normal">
                                {item.category.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={`${classes} w-40 `}>
                          <div className="relative group">
                            <img
                              src={
                                import.meta.env.VITE_APP_API +
                                item.category.image
                              }
                              alt=""
                              className="mb-4 group-hover:opacity-30 peer"
                            />
                            <input
                              type="file"
                              className="hidden"
                              name="image"
                              id={item.category.id}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                Category.changeImage(item.category.id, file)
                                  .then((res) => {
                                    if (
                                      res.status === 200 ||
                                      res.status === 201 ||
                                      res.status === 204
                                    ) {
                                      load();
                                      toast("Change image success", {
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
                                      toast.error("Failed to change image", {
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
                                  })
                                  .catch(() => {
                                    toast.error("Failed to change image", {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                                  });
                              }}
                            />
                            <label
                              htmlFor={item.category.id}
                              className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black rounded-md py-1 px-4 cursor-pointer"
                            >
                              Change
                            </label>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3 justify-center">
                            <div className="flex flex-col">
                              <p color="blue-gray" className="font-normal">
                                {item.parent && item.parent.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <p color="blue-gray" className="font-normal">
                            {item.category.deletedAt !== null &&
                              sqlDateToJSDate(
                                item.category.deletedAt
                              ).toDateString()}
                          </p>
                        </td>
                        <td className={`${classes} w-24`}>
                          <div className="flex justify-between">
                            <button
                              className="hover:text-orange-700"
                              onClick={() => {
                                setCurrentEditCategory(item);
                                setIsOpenEditModal(true);
                              }}
                            >
                              <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                            </button>
                            {item.category.deletedAt === null ? (
                              <button
                                className="hover:text-red-700"
                                onClick={() => {
                                  deleteCategory(item.category.id);
                                }}
                              >
                                <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                              </button>
                            ) : (
                              <button
                                className="hover:text-red-700"
                                onClick={() => {
                                  restore(item.category.id);
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
      </Card>
      {isOpenAddModal && (
        <CategoryForm
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
        ></CategoryForm>
      )}
      {isOpenEditModal && (
        <CategoryUpdateForm
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          category={currentEditCategory}
          load={load}
        ></CategoryUpdateForm>
      )}
      {isHandling && <Loading></Loading>}
    </>
  );
}
