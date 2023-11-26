import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Spinner,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { sqlDateToJSDate } from "../../../helper/helper";
import { toast } from "react-toastify";
import { Sale } from "../../../services/Sale.service";
import MyDialog from "../../../components/MyDialog";
import SaleForm from "./SaleForm";
import SaleUpdateForm from "./SaleUpdateForm";

function SaleTable() {
  const [sales, setSales] = useState([]);
  const [currentSale, setCurrentSale] = useState(null);
  const [currentEditSale, setCurrentEditSale] = useState({});
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function load() {
    setIsLoading(true);
    Promise.all([Sale.getAllSale(currentPage - 1), Sale.getCurrentSale()]).then(
      (res) => {
        setTotalPages(res[0].totalPages);
        console.log(res);
        setSales(res[0]);
        setCurrentSale(res[1][0]);
        setIsLoading(false);
      }
    );
    // Sale.getAllSale(currentPage - 1).then((res) => {
    // });
  }

  useEffect(() => {
    load();
  }, []);

  const TABLE_HEAD = ["Category", "Sale Percent", "End Date", "Action"];

  const endSale = (id) => {
    Sale.endSale(id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast("Successfully end sale", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        load();
      } else {
        toast.error("Failed to end sale", {
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
                  if (currentSale) {
                    setIsOpenDialog(true);
                  } else {
                    setIsOpenAddModal(true);
                  }
                }}
              >
                <AddOutlinedIcon></AddOutlinedIcon> Add new sale
              </button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-auto px-0">
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
                  {sales.content.map((item, index) => {
                    const isLast = index === sales.content.length - 1;
                    const classes = isLast
                      ? "p-4 text-sm"
                      : "p-4 text-sm border-b border-blue-gray-50";

                    return (
                      <tr key={item.id}>
                        <td className={`${classes}`}>
                          <div className="flex items-center justify-center gap-3 break-words">
                            <div className="flex flex-col cursor-pointer">
                              <p color="blue-gray" className="font-normal">
                                {item.category.name}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className={`${classes}`}>
                          <div className="flex items-center justify-center gap-3 break-words">
                            <div className="flex flex-col cursor-pointer">
                              <p color="blue-gray" className="font-normal">
                                {item.salePercent}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <p
                            color="blue-gray"
                            className="font-normal text-center"
                          >
                            {item.endDate !== null &&
                              sqlDateToJSDate(item.endDate).toDateString()}
                          </p>
                        </td>
                        <td className={`${classes} w-24`}>
                          <div className="flex justify-between">
                            <button
                              className="hover:text-orange-700"
                              onClick={() => {
                                setCurrentEditSale(item);
                                setIsOpenEditModal(true);
                              }}
                            >
                              <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                            </button>
                            {item.endDate === null && (
                              <button
                                className="hover:text-red-700"
                                onClick={() => {
                                  endSale(item.id);
                                }}
                              >
                                <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
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
      {isOpenAddModal && (
        <SaleForm
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          load={load}
        ></SaleForm>
      )}
      {isOpenEditModal && (
        <SaleUpdateForm
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          sale={currentEditSale}
          load={load}
        ></SaleUpdateForm>
      )}

      <MyDialog
        header={"Error"}
        message={"Sale must have only one active at a time"}
        isOpen={isOpenDialog}
        handleOpen={() => {
          setIsOpenDialog(false);
        }}
        isSuccess={false}
      ></MyDialog>
    </>
  );
}

export default SaleTable;
