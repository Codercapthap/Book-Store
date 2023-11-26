import React, { useState } from "react";
import Modal from "./Modal";
import MyInput from "./MyInput";
import MyDialog from "../components/MyDialog";
import Loading from "./Loading";
import { User } from "../services/User.service.js";
import { setCurrentUser } from "../store/Actions/UserAction.js";
import { useDispatch } from "react-redux";

function Login({ isOpen, setIsOpen, active, setActive }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(isOpen);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState(
    "Your register was success. Please sign in to continue."
  );
  const [headerDialog, setHeaderDialog] = useState("Register Success");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);
  const submitLoginFunction = (e) => {
    setIsLoading(true);
    User.signIn(username, password).then((response) => {
      if (response.status === 200) {
        dispatch(setCurrentUser(response.data.accessToken));
        setIsLoading(false);
        setOpenDialog(true);
        setIsSuccess(true);
        setMessage("");
        setHeaderDialog("Login success");
        // window.location.reload();
      } else {
        setIsLoading(false);
        setOpenDialog(true);
        setIsSuccess(false);
        setMessage(
          "Username or password incorrect or your account has been blocked"
        );
        setHeaderDialog("Login failed");
      }
    });
    e.preventDefault();
  };
  const submitRegisterFunction = (e) => {
    setIsLoading(true);
    User.register(username, email, password, name, phone).then((response) => {
      console.log(response);
      if (response.status === 204 || response.status === 201) {
        setIsLoading(false);
        setOpenDialog(true);
        setIsSuccess(true);
        setMessage("Your register was success. Please sign in to continue.");
        setHeaderDialog("Register success");
      } else {
        setIsLoading(false);
        setOpenDialog(true);
        setIsSuccess(false);
        setMessage(
          response
            ? response.response.data.message
            : "There is something wrong, please try again later."
        );
        setHeaderDialog("Register failed");
      }
    });
    e.preventDefault();
  };
  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="bg-white p-6 w-1/3 rounded-md">
        {/* selection part */}
        <div className="grid grid-cols-2 gap-8 mt-2">
          <span
            className={`text-center border-b-2 content-normal-2 pb-2 cursor-pointer ${
              active === "signIn"
                ? "border-b-red-500 text-red-700"
                : "text-gray-700 border-b-white hover:border-b-red-500 hover:text-red-700 transition-colors"
            }`}
            onClick={() => {
              setActive("signIn");
            }}
          >
            Sign in
          </span>
          <span
            className={`text-center border-b-2 content-normal-2 cursor-pointer ${
              active === "register"
                ? "border-b-red-500 text-red-700"
                : "text-gray-700 border-b-white hover:border-b-red-500 hover:text-red-700 transition-colors"
            }`}
            onClick={() => {
              setActive("register");
            }}
          >
            Register
          </span>
        </div>
        {/* form part */}
        <form
          className={`${active === "signIn" ? "block" : "hidden"} group`}
          onSubmit={submitLoginFunction}
          noValidate
        >
          {/* input part */}
          <div className="my-8 mx-4">
            <MyInput
              label={"Username:"}
              isRequired={true}
              errorMessage={"Please enter username"}
              type="text"
              placeholder={"Type your username"}
              value={username}
              setValue={setUsername}
            ></MyInput>
            <MyInput
              value={password}
              setValue={setPassword}
              isPasswordInput={true}
            ></MyInput>
          </div>
          {/* button part  */}
          <div className="flex flex-col w-1/2 mx-auto my-4">
            <button className="py-2 px-8 bg-red-600 text-white font-semibold rounded-md mb-6 group-invalid:pointer-events-none group-invalid:opacity-30">
              Sign In
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
        {/* form part */}
        <form
          className={`${active === "register" ? "block" : "hidden"} group`}
          onSubmit={submitRegisterFunction}
          noValidate
        >
          {/* input part */}
          <div className="my-8 mx-4">
            <MyInput
              label={"Email:"}
              isRequired={true}
              errorMessage={"Please enter a valid email address"}
              type="email"
              placeholder={"Type your email"}
              value={email}
              setValue={setEmail}
            ></MyInput>

            <MyInput
              label={"Username:"}
              isRequired={true}
              errorMessage={"Please enter username"}
              type="text"
              placeholder={"Type your username"}
              value={username}
              setValue={setUsername}
            ></MyInput>

            <MyInput
              label={"Name:"}
              isRequired={true}
              errorMessage={"Please enter your name"}
              type="text"
              placeholder={"Type your name"}
              value={name}
              setValue={setName}
            ></MyInput>

            <MyInput
              label={"Phone Number:"}
              isRequired={true}
              errorMessage={"Please enter phone number"}
              type="text"
              placeholder={"Type your phone number"}
              value={phone}
              setValue={setPhone}
              pattern="0[35789][0-9]{8}"
            ></MyInput>
            {/* <div className="flex flex-col mb-6">
              <label htmlFor="" className="mb-2 text-gray-700">
                Phone number:{" "}
              </label>
              <input
                type="text"
                className="rounded-sm border border-gray-500 py-2 px-6 focus-visible:outline-blue-300 focus-visible:outline-8 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                placeholder="Type phone number"
                required
                // pattern=".{(84|0[3|5|7|8|9])+([0-9]{8})}"
                pattern="0[35789][0-9]{8}"
              />
              <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid phone number
              </span>
            </div> */}
            <MyInput
              value={password}
              setValue={setPassword}
              isPasswordInput={true}
            ></MyInput>
          </div>
          {/* button part  */}
          <div className="flex flex-col w-1/2 mx-auto my-4">
            <button className="py-2 px-8 bg-red-600 text-white font-semibold rounded-md mb-6 group-invalid:pointer-events-none group-invalid:opacity-30">
              Register
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
        header={headerDialog}
        message={message}
        isOpen={openDialog}
        handleOpen={() => {
          handleOpenDialog();
          if (isSuccess) {
            setIsOpen(false);
          }
        }}
        isSuccess={isSuccess}
      ></MyDialog>
      {isLoading && <Loading></Loading>}
    </Modal>
  );
}

export default Login;
