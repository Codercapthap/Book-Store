import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  CardFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { toast } from "react-toastify";
import { User } from "../../../services/User.service";
import { sqlDateToJSDate } from "../../../helper/helper";

export default function AccountTable() {
  const [accountPage, setAccountPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");

  const searching = () => {
    setIsLoading(true);
    User.getAllAccount(query, sort, currentPage - 1).then((res) => {
      setAccountPage(res);
      setTotalPages(res.totalPages);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    searching();
  }, [currentPage, sort]);

  const TABLE_HEAD = [
    <div
      onClick={() => {
        if (sort === "named") {
          setSort("namea");
        } else setSort("named");
      }}
    >
      Name <SortOutlinedIcon></SortOutlinedIcon>
    </div>,
    "Email",
    "Phone",
    "Gender",
    <div
      onClick={() => {
        if (sort === "birthdayd") {
          setSort("birthdaya");
        } else setSort("birthdayd");
      }}
    >
      Birthday <SortOutlinedIcon></SortOutlinedIcon>
    </div>,
    "Role",
    "Status",
    "Action",
  ];

  const block = (account) => {
    let mes = account.status === "active" ? "block" : "restore";
    console.log(account);
    User.blockAccount(account.id).then((res) => {
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast(`Successfully ${mes} account`, {
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
        toast.error(`Failed to ${mes} account`, {
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
          <div className="flex flex-col items-center justify-end gap-4 md:flex-row pt-2 relative">
            <div className="w-full md:w-72 mr-8">
              <Input
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    setCurrentPage(1);
                    searching();
                  }
                }}
                label="Search"
              />
              <SearchOutlinedIcon
                className="absolute top-4 right-12 cursor-pointer"
                onClick={() => {
                  setCurrentPage(1);
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
                  {accountPage.content.map((item, index) => {
                    const isLast = index === accountPage.content.length - 1;
                    const classes = isLast
                      ? "p-4 text-sm"
                      : "p-4 text-sm border-b border-blue-gray-50";

                    return (
                      <tr key={item.user.id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3 break-words">
                            <div>
                              <p color="blue-gray" className="font-normal">
                                {item.user.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p color="blue-gray" className="font-normal">
                                {item.user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="flex items-center gap-3 w-16">
                            <div className="flex flex-col">
                              <p color="blue-gray" className="font-normal">
                                {item.user.phone}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="flex items-center gap-3 w-16">
                            <div className="flex flex-col">
                              <p color="blue-gray" className="font-normal">
                                {item.user.gender ? "Male" : "Female"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="flex items-center gap-3 w-16">
                            <div className="flex flex-col">
                              <p color="blue-gray" className="font-normal">
                                {sqlDateToJSDate(
                                  item.user.birthday
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={`${classes} w-28`}>
                          <p
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item.detail.role}
                          </p>
                        </td>
                        <td className={classes}>
                          <p color="blue-gray" className="font-normal">
                            {item.detail.status}
                          </p>
                        </td>
                        <td className={`${classes} w-24`}>
                          {!(item.detail.role === "ADMIN") && (
                            <div className="flex justify-between">
                              <button
                                className="hover:text-red-700"
                                onClick={() => {
                                  block(item.detail);
                                }}
                              >
                                {item.detail.status === "active" ? (
                                  <BlockOutlinedIcon></BlockOutlinedIcon>
                                ) : (
                                  <LockOpenIcon></LockOpenIcon>
                                )}
                              </button>
                            </div>
                          )}
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
    </>
  );
}
