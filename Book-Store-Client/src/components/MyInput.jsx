import React, { useState } from "react";

function MyInput({
  label,
  isRequired,
  pattern,
  errorMessage,
  type = "text",
  placeholder,
  isPasswordInput,
  value,
  setValue,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  return (
    <div>
      {!isPasswordInput && (
        <div className="flex flex-col mb-6">
          <label htmlFor="" className="mb-2 text-gray-700">
            {label}:{" "}
          </label>
          <input
            type={type}
            className="rounded-sm border border-gray-500 py-2 px-6 focus-visible:outline-blue-300 focus-visible:outline-8 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
            placeholder={placeholder}
            required={isRequired}
            pattern={pattern}
            value={value}
            onChange={(e) => {
              if (setValue) {
                setValue(e.target.value);
              }
            }}
          />
          <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            {errorMessage}
          </span>
        </div>
      )}
      {isPasswordInput && (
        <div className="flex flex-col relative">
          <label htmlFor="" className="mb-2 text-gray-700">
            Password:{" "}
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="rounded-sm border border-gray-500 py-2 px-6 focus-visible:outline-blue-300 focus-visible:outline-8 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
            placeholder="Type password"
            required
            pattern=".{8,}"
            value={value}
            onChange={(e) => {
              if (setValue) {
                setValue(e.target.value);
              }
            }}
          />
          <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Password must at least 8 characters
          </span>
          <span
            className="text-sm text-blue-500 absolute top-11 right-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </span>
        </div>
      )}
    </div>
  );
}

export default MyInput;
