import { useEffect, useState } from "react";
import { Location } from "../../../services/Location.service";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Spinner,
} from "@material-tailwind/react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import { sqlDateToJSDate } from "../../../helper/helper";
import { toast } from "react-toastify";
import DeliveryForm from "./DeliveryForm";
import DeliveryUpdateForm from "./DeliveryUpdateForm";

function DeliveryTable() {
  const [deliveries, setDeliveries] = useState([]);
  const [currentDelivery, setCurrentDelivery] = useState({});
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function load() {
    setIsLoading(true);
    Location.getAllDeliveryMethod().then((res) => {
      setDeliveries(res);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    load();
  }, []);

  const TABLE_HEAD = [
    "Method Name",
    "Base",
    "Coefficient",
    "Deleted Date",
    "Action",
  ];

  const deleteDelivery = (id) => {
    Location.deleteDelivery(id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast("Successfully removed delivery", {
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
        toast.error("Failed to remove delivery", {
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
    Location.restoreDelivery(id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast("Successfully restored delivery", {
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
        toast.error("Failed to restore delivery", {
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
                <AddOutlinedIcon></AddOutlinedIcon> Add new delivery
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
                  {deliveries.map((item, index) => {
                    const isLast = index === deliveries.length - 1;
                    const classes = isLast
                      ? "p-4 text-sm"
                      : "p-4 text-sm border-b border-blue-gray-50";

                    return (
                      <tr key={item.id}>
                        <td className={`${classes}`}>
                          <div className="flex items-center justify-center gap-3 break-words">
                            <div className="flex flex-col cursor-pointer">
                              <p color="blue-gray" className="font-normal">
                                {item.method}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className={`${classes}`}>
                          <div className="flex items-center justify-center gap-3 break-words">
                            <div className="flex flex-col cursor-pointer">
                              <p color="blue-gray" className="font-normal">
                                {item.base}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3 justify-center">
                            <div className="flex flex-col">
                              <p color="blue-gray" className="font-normal">
                                {item.coefficient}
                              </p>
                            </div>
                          </div>
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
                                setCurrentDelivery(item);
                                setIsOpenEditModal(true);
                              }}
                            >
                              <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                            </button>
                            {item.deletedAt === null ? (
                              <button
                                className="hover:text-red-700"
                                onClick={() => {
                                  deleteDelivery(item.id);
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
      </Card>
      {isOpenAddModal && (
        <DeliveryForm
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          load={load}
        ></DeliveryForm>
      )}
      {isOpenEditModal && (
        <DeliveryUpdateForm
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          currentDelivery={currentDelivery}
          load={load}
        ></DeliveryUpdateForm>
      )}
    </>
  );
}

export default DeliveryTable;
