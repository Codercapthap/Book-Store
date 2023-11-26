import { useState } from "react";
import Modal from "./Modal";
import { Input } from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import { User } from "../services/User.service";
import Loading from "./Loading";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import MyDialog from "./MyDialog";

function ChangePassword({ isOpen, setIsOpen }) {
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState({
    header: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function validateForm() {
    // create an object to store the new errors
    let newErrors = {};
    // validate the name field
    if (oldPassword.length < 8) {
      newErrors.oldPassword = "Password must be at least 8 characters";
    }
    if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword =
        "Confirm password and password does not match";
    }
    setErrors(newErrors);
    // return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  }

  const submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      User.updatePassword(oldPassword, newPassword).then((res) => {
        if (res.status === 201 || res.status === 204 || res.status === 200) {
          setDialog({
            header: "Update Success",
            message: "Your password has been updated",
            isOpen: true,
            isSuccess: true,
          });
        } else if (res.response && res.response.status === 400) {
          setDialog({
            header: "Update Failed",
            message: "Your current password is incorrect",
            isOpen: true,
            isSuccess: false,
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
      <div className="bg-white p-6 rounded-md w-5/12">
        <h1 className="pb-2 border-b font-semibold text-lg uppercase">
          Change Password
        </h1>
        <form
          onSubmit={() => {
            e.preventDefault();
          }}
          noValidate
        >
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/3">
              Current Password
            </label>
            <div className="flex flex-col w-full relative">
              <Input
                label="Your current password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                type={oldPasswordVisible ? "text" : "password"}
                className=" focus-visible:outline-blue-300 font-semibold"
                error={
                  errors.oldPassword && errors.oldPassword.length.length > 0
                }
              ></Input>
              <div
                className="absolute right-4 top-2 text-gray-700 cursor-pointer"
                onClick={() => {
                  setOldPasswordVisible(!oldPasswordVisible);
                }}
              >
                {oldPasswordVisible ? (
                  <VisibilityOffOutlinedIcon></VisibilityOffOutlinedIcon>
                ) : (
                  <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                )}
              </div>
              {errors.oldPassword && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.oldPassword}
                </span>
              )}
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/3">
              New Password
            </label>
            <div className="flex flex-col w-full relative">
              <Input
                label="Your new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                type={newPasswordVisible ? "text" : "password"}
                className=" focus-visible:outline-blue-300 font-semibold"
                error={
                  errors.newPassword && errors.newPassword.length.length > 0
                }
              ></Input>

              <div
                className="absolute right-4 top-2 text-gray-700 cursor-pointer"
                onClick={() => {
                  setNewPasswordVisible(!newPasswordVisible);
                }}
              >
                {newPasswordVisible ? (
                  <VisibilityOffOutlinedIcon></VisibilityOffOutlinedIcon>
                ) : (
                  <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                )}
              </div>
              {errors.newPassword && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.newPassword}
                </span>
              )}
            </div>
          </div>
          <div className="flex my-4 items-center">
            <label htmlFor="" className="text-gray-700 w-1/3">
              Confirm new password
            </label>
            <div className="flex flex-col w-full relative">
              <Input
                label="Confirm your new password"
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
                type={confirmNewPasswordVisible ? "text" : "password"}
                error={
                  errors.confirmNewPassword &&
                  errors.confirmNewPassword.length.length > 0
                }
                className=" focus-visible:outline-blue-300 font-semibold"
              ></Input>

              <div
                className="absolute right-4 top-2 text-gray-700 cursor-pointer"
                onClick={() => {
                  setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
                }}
              >
                {confirmNewPasswordVisible ? (
                  <VisibilityOffOutlinedIcon></VisibilityOffOutlinedIcon>
                ) : (
                  <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                )}
              </div>
              {errors.confirmNewPassword && (
                <span className="mt-2 text-sm text-red-500">
                  {errors.confirmNewPassword}
                </span>
              )}
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

export default ChangePassword;
