import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import validator from "validator";
import { Location } from "../../services/Location.service";
import { Input, Select, Option, Radio } from "@material-tailwind/react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Modal from "../../components/Modal";
import { Spinner } from "@material-tailwind/react";
import { Order } from "../../services/Order.service";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

function CheckOut() {
  const { state } = useLocation();
  const { itemList } = state;
  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [ward, setWard] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [address, setAddress] = useState("");
  // const [location, setLocation] = useState("");
  const [currentMethod, setCurrentMethod] = useState({});
  const [deliveryMethod, setDeliveryMethod] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    province: "",
    district: "",
    ward: "",
    address: "",
    location: "",
  });
  const user = useSelector((state) => state.User.currentUser);
  const navigate = useNavigate();

  const getDate = () => {
    const today = new Date();
    let day = today.getDate();
    today.setDate(day + 4);
    return (
      today.toLocaleDateString("en-US", { weekday: "short" }) +
      " - " +
      today.getMonth() +
      "/" +
      today.getDate() +
      "/" +
      today.getFullYear()
    );
  };

  function validateForm() {
    // create an object to store the new errors
    let newErrors = {};
    // validate the name field
    if (Object.keys(province).length === 0) {
      newErrors.province = "You must choose the province";
    }
    if (Object.keys(district).length === 0) {
      newErrors.district = "You must choose the distrcit";
    }
    if (Object.keys(ward).length === 0) {
      newErrors.ward = "You must choose the ward";
    }
    if (validator.isEmpty(address)) {
      newErrors.address = "Address is required";
    }
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    Location.getProvince().then((res) => {
      setProvinceList(res);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(province).length !== 0) {
      Location.getDistrict(province.provinceName).then((res) => {
        setDistrictList(res);
      });
      Location.getDeliveryMethod(province.provinceName).then((res) => {
        setDeliveryMethod(res);
        setCurrentMethod(res[0]);
      });
    }
  }, [province]);

  useEffect(() => {
    if (Object.keys(district).length !== 0) {
      Location.getWard(province.provinceName, district.cityName).then((res) => {
        setWardList(res);
      });
    }
  }, [district]);

  useEffect(() => {
    const sub = itemList.reduce((acc, item) => {
      return (acc += item.actualPrice * item.quantity);
    }, 0);
    setSubTotal(_.round(sub, 2));
    setTotalPrice(_.round(sub + parseFloat(currentMethod.price), 2));
  }, [currentMethod]);

  return (
    <div>
      <Helmet>
        <title>Checkout - Book Store</title>
      </Helmet>
      <Header></Header>
      <div className="container mx-auto my-2">
        <div className="bg-white my-2 rounded-sm p-4">
          <h1 className="uppercase text-lg font-semibold border-b border-b-gray-400 pb-2">
            Shipping address
          </h1>
          <form
            onSubmit={() => {
              e.preventDefault();
            }}
            noValidate
          >
            <div className="w-2/3 flex my-4 items-center">
              <label htmlFor="" className="text-gray-700 w-1/3">
                Full name of recipient
              </label>
              <div className="flex flex-col w-full">
                <Input
                  label="Type recipient name"
                  defaultValue={user.user.name}
                  disabled
                  className=" focus-visible:outline-blue-300 font-semibold"
                ></Input>
              </div>
            </div>
            <div className="w-2/3 flex my-4 items-center">
              <label htmlFor="" className="text-gray-700 w-1/3">
                Phone number
              </label>
              <div className="flex flex-col w-full">
                <Input
                  label="Type phone number"
                  defaultValue={user.user.phone}
                  disabled
                  className=" focus-visible:outline-blue-300 font-semibold"
                ></Input>
              </div>
            </div>
            <>
              <div className="w-2/3 flex my-4 items-center">
                <label htmlFor="" className="text-gray-700 w-1/3">
                  Province/City
                </label>
                <div className="flex flex-col w-full">
                  <Select
                    label={"Choose Province/City"}
                    // value={province.provinceName}
                    onChange={(e) => {
                      setProvince(e);
                      setErrors((prev) => {
                        return { ...prev, province: "" };
                      });
                    }}
                    error={errors.province && errors.province.length > 0}
                  >
                    {provinceList.map((province) => {
                      return (
                        <Option key={province.provinceName} value={province}>
                          {province.provinceName}
                        </Option>
                      );
                    })}
                  </Select>
                  {errors.province && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.province}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-2/3 flex my-4 items-center">
                <label htmlFor="" className="text-gray-700 w-1/3">
                  District
                </label>
                <div className="flex flex-col w-full">
                  <Select
                    label={"Choose District"}
                    onChange={(e) => {
                      setDistrict(e);
                      setErrors((prev) => {
                        return { ...prev, district: "" };
                      });
                    }}
                    disabled={Object.keys(province).length === 0}
                    error={errors.district && errors.district.length > 0}
                  >
                    {districtList.map((district) => {
                      return (
                        <Option key={district.cityName} value={district}>
                          {district.cityName}
                        </Option>
                      );
                    })}
                  </Select>
                  {errors.district && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.district}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-2/3 flex my-4 items-center">
                <label htmlFor="" className="text-gray-700 w-1/3">
                  Ward
                </label>
                <div className="flex flex-col w-full">
                  <Select
                    label={"Choose Ward"}
                    onChange={(e) => {
                      setWard(e);
                      setErrors((prev) => {
                        return { ...prev, ward: "" };
                      });
                    }}
                    disabled={Object.keys(district).length === 0}
                    error={errors.ward && errors.ward.length > 0}
                  >
                    {wardList.map((ward) => {
                      return (
                        <Option key={ward.wardName} value={ward}>
                          {ward.wardName}
                        </Option>
                      );
                    })}
                  </Select>
                  {errors.ward && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.ward}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-2/3 flex my-4 items-center">
                <label htmlFor="" className="text-gray-700 w-1/3">
                  Shipping address
                </label>
                <div className="flex flex-col w-full">
                  <Input
                    label="Type your address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors((prev) => {
                        return { ...prev, address: "" };
                      });
                    }}
                    className=" focus-visible:outline-blue-300 font-semibold"
                    error={errors.address && errors.address.length > 0}
                  ></Input>
                  {errors.address && (
                    <span className="mt-2 text-sm text-red-500">
                      {errors.address}
                    </span>
                  )}
                </div>
              </div>
            </>
          </form>
        </div>
        <div className="bg-white my-2 rounded-sm p-4">
          <h1 className="uppercase text-lg font-semibold border-b border-b-gray-400 mb-4 pb-2">
            SHIPPING METHOD
          </h1>
          {Object.keys(province).length && deliveryMethod.length ? (
            <div className="w-full grid grid-cols-5">
              {/* <div className="flex items-center">
                <Radio name="type" color="red" defaultChecked />
                <div className="flex flex-col">
                  <span className="font-semibold">Standard: 31$</span>
                  <span>{getDate()}</span>
                </div>
              </div> */}
              {deliveryMethod.map((method, index) => {
                return (
                  <div className="flex items-center">
                    <Radio
                      name="method"
                      color="red"
                      value={method}
                      checked={_.isEqual(method, currentMethod)}
                      onChange={() => {
                        setCurrentMethod(method);
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {method.delivery.method}: {method.price}$
                      </span>
                      <span>{getDate()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <span>
              Sorry, no quotes are available for this order at this time.
            </span>
          )}
        </div>
        <div className="bg-white my-2 rounded-sm p-4">
          <h1 className="uppercase text-lg font-semibold mb-2">
            check order again
          </h1>
          {itemList.map((item) => {
            return (
              <div className="grid grid-cols-12 py-4 gap-8 border-t border-t-gray-400">
                <img
                  className="col-span-2"
                  src={
                    import.meta.env.VITE_APP_API + item.images[0].imageLocation
                  }
                  alt=""
                />
                <span className="col-span-5">{item.book.title}</span>
                <div className="col-span-2 flex flex-col items-center">
                  <span>{item.actualPrice} $</span>
                  {item.actualPrice !== item.book.price && (
                    <span className="line-through text-gray-700">
                      {item.price} $
                    </span>
                  )}
                </div>
                <span className="text-center">{item.quantity}</span>
                <span className="col-span-2 font-bold text-orange-700 text-center">
                  {_.round(item.actualPrice * item.quantity, 2)} $
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bg-white py-4 shadow-custom bottom-0 w-full flex items-center">
        <div className="container w-full mx-auto">
          {Object.keys(currentMethod).length !== 0 && (
            <div className="flex justify-end">
              <div className="flex flex-col items-end">
                <span>Subtotal</span>
                <span>Shipping & Handling</span>
                <span className="font-semibold">Grand Total</span>
              </div>
              <div className="flex flex-col w-40 items-end">
                <span>{subTotal}$</span>
                <span>{currentMethod.price}$</span>
                <span className="font-bold text-lg text-orange-700">
                  {totalPrice}$
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between my-auto items-center border-t">
            <button
              className="font-semibold"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <ArrowBackOutlinedIcon></ArrowBackOutlinedIcon>Back to cart
            </button>
            <button
              className={`py-2 px-8 uppercase rounded-md bg-red-700 text-white text-lg font-bold my-4 disabled:bg-gray-500 disabled:opacity-40`}
              onClick={() => {
                const isValid = validateForm();
                if (isValid) {
                  setIsLoading(true);
                  Order.order(
                    currentMethod.delivery.id,
                    ward.wardName,
                    ward.cityName,
                    ward.provinceName,
                    address,
                    JSON.stringify(itemList.map((item) => item.book.id))
                  ).then((res) => {
                    console.log(res);
                    setIsLoading(false);
                    if (
                      res.status === 204 ||
                      res.status === 201 ||
                      res.status === 200
                    ) {
                      navigate("/order/success", {
                        state: {
                          itemList: itemList,
                          method: currentMethod,
                          totalPrice: totalPrice,
                          subTotal: subTotal,
                        },
                      });
                    } else {
                      toast.error(
                        "There is something wrong, please try again later",
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
                  });
                }
              }}
            >
              Order Confirmation
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <Modal isOpen={isLoading}>
        <div className="opacity-30 flex justify-center items-center my-4">
          <Spinner className="h-16 w-16 " />
        </div>
      </Modal>
    </div>
  );
}

export default CheckOut;
