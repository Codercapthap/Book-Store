import React from "react";
import {
  LogoCongThuong,
  LogoInsta,
  LogoPinterest,
  LogoTumblr,
  LogoTwitter,
  LogoYoutube,
  LogoFacebook,
} from "../assets/images";

function Footer() {
  return (
    <div className="container bg-white mx-auto">
      <div className="grid grid-cols-3">
        <div className="w-1/2 mx-auto">
          <img src="/logo.png" alt="" />
        </div>
        <div className="w-2/3 mx-auto my-auto">
          <p>
            <strong>Street:</strong> 303 Hoang Hoa Tham Street
          </p>
          <p>
            <strong>City:</strong> Ba Dinh District
          </p>
          <p>
            <strong>State/province/area:</strong> Hanoi
          </p>
          <p>
            <strong>Phone number:</strong> (84-4) 38 472 562
          </p>
        </div>
        <div className=" mx-auto my-auto">
          <p>Get online orders and delivery</p>
          <img src={LogoCongThuong} alt="" className="w-40" />
          <div className="flex">
            <img src={LogoFacebook} alt="" />
            <img src={LogoInsta} alt="" />
            <img src={LogoYoutube} alt="" />
            <img src={LogoTumblr} alt="" />
            <img src={LogoTwitter} alt="" />
            <img src={LogoPinterest} alt="" />
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 pb-4">
        Business Registration Certificate No. 0304132047 issued by the
        Department of Planning and Investment of Ho Chi Minh City on December
        20, 2005, registered for the 10th change on May 20, 2022.
      </p>
    </div>
  );
}

export default Footer;
