import { useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { Input, Radio } from "@material-tailwind/react";
import { sqlDateToJSDate } from "../helper/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validator from "validator";
import { User } from "../services/User.service";
import Loading from "./Loading";
import MyDialog from "./MyDialog";
import { useDispatch } from "react-redux";

function EditInformation({ isOpen, setIsOpen }) {
  const user = useSelector((state) => state.User.currentUser);
  const [name, setName] = useState(user.user.name);
  const [phone, setPhone] = useState(user.user.phone);
  const [email, setEmail] = useState(user.user.email);
  const [gender, setGender] = useState(user.user.gender);
  const [birthday, setBirthday] = useState(sqlDateToJSDate(user.user.birthday));
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({
    header: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  function validateForm() {
    // create an object to store the new errors
    let newErrors = {};
    // validate the name field
    if (name.length === 0) {
      newErrors.name = "You must provide a name";
    }
    if (!/^(03|05|07|08|09)[0-9]{8}$/.test(phone)) {
      newErrors.phone = "Phone is not valid";
    }
    if (!validator.isEmail(email)) {
      newErrors.email = "Email is not valid";
    }
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  const submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const birthdayString =
        birthday.getFullYear() +
        "-" +
        (birthday.getMonth() + 1) +
        "-" +
        birthday.getDate();
      User.updateInformation(name, email, phone, gender, birthdayString).then(
        (res) => {
          console.log(res);
          if (res.status === 201 || res.status === 204 || res.status === 200) {
            setDialog({
              header: "Update Success",
              message: "Your information has been updated",
              isOpen: true,
              isSuccess: true,
            });
            User.getCurrentUser().then((user) => {
              dispatch({
                type: "SET_CURRENT_USER",
                payload: user,
              });
            });
          } else {
            setDialog({
              header: "Update Failed",
              message: "Something went wrong updating, please try again later",
              isOpen: true,
              isSuccess: false,
            });
          }
          setIsLoading(false);
        }
      );
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="bg-white p-6 rounded-md w-5/12">
        <h1 className="pb-2 border-b font-semibold text-lg uppercase">
          Edit Information
        </h1>
        <form
          onSubmit={() => {
            e.preventDefault();
          }}
          noValidate
        >
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/3">
              Full name
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Type your name"
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
            <label htmlFor="" className="text-gray-700 w-1/3">
              Phone number
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Type your phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className=" focus-visible:outline-blue-300 font-semibold"
                error={errors.phone && errors.phone.length.length > 0}
              ></Input>

              {errors.phone && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/3">
              Email
            </label>
            <div className="flex flex-col w-full">
              <Input
                label="Type email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={errors.email && errors.email.length.length > 0}
                className=" focus-visible:outline-blue-300 font-semibold"
              ></Input>

              {errors.email && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="" className="text-gray-700 w-1/3">
              Gender
            </label>
            <div className="flex w-full">
              <div className="flex items-center mr-24">
                <Radio
                  name="gender"
                  color="red"
                  value={1}
                  checked={gender}
                  onChange={() => {
                    setGender(1);
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-semibold">Male</span>
                </div>
              </div>
              <div className="flex items-center">
                <Radio
                  name="gender"
                  color="red"
                  value={0}
                  checked={!gender}
                  onChange={() => {
                    setGender(0);
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-semibold">Female</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/3">
              Birthday
            </label>
            <div className="flex flex-col w-full">
              <DatePicker
                showYearDropdown
                showMonthDropdown
                selected={birthday}
                className="w-full py-2 rounded-md border border-gray-400 px-3 font-semibold text-sm"
                dateFormat="MM - dd - yyyy"
                onChangeRaw={(e) => e.preventDefault()}
                onChange={(date) => setBirthday(date)}
              />
            </div>
          </div>
          {/* button part  */}
          <div className="flex flex-col w-1/2 mx-auto mb-4 mt-8">
            <button
              className="py-2 px-8 bg-red-600 text-white font-semibold rounded-md mb-6 group-invalid:pointer-events-none group-invalid:opacity-30"
              onClick={submit}
            >
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
        }}
        isSuccess={dialog.isSuccess}
      ></MyDialog>
      {isLoading && <Loading></Loading>}
    </Modal>
  );
}

export default EditInformation;
