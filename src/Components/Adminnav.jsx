

import React from "react";

import { IoIosMenu } from "react-icons/io";
import logoimg from "../assets/download.png";

import { Link } from "react-router-dom";

const Adminnav = () => {
  return (
    <>
      <nav className="mainuserpagenavadmin position-sticky top-0 z-3 bg-success text-light text-capitalize justify-content-evenly align-items-center">
        <div className=" w-25">
          <img src={logoimg} className="logoimg " alt="" />
        </div>
        <div className=" w-50 d-flex justify-content-evenly align-items-center ">
          <Link  to="/adminbackend" className="  text-capitalize btn btn-light text-success">
            home
          </Link >
          <Link  to="/viewloanrequest" className="  text-capitalize btn btn-light text-success">
            loan request
          </Link >
          <Link  to="/adminoutstandingloan" className="  text-capitalize btn btn-light text-success">
            loan repayment
          </Link >
          <Link  to="" className="  text-capitalize btn btn-light text-success">
            contact us
          </Link >
          <Link  to="" className="  text-capitalize btn btn-light text-success">
            log out
          </Link >
        </div>

      </nav>

      <nav className="mainuserpagenavadmin2 text-capitalize bg-success text-light">
        <div className="logodiv ms-4 d-flex justify-content-center align-items-center">
          <img src={logoimg} className="logoimg " alt="" />
        </div>

        <div className="dropdown">
          <button
            className="btn btn-light text-success"
            type="button"
            id="triggerId"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <IoIosMenu />
          </button>
          <div className="dropdown-menu " aria-labelledby="triggerId">
          
            <Link  to="/adminbackend" className=" dropdown-item  text-capitalize btn btn-light text-success">
            home
          </Link >
          <Link  to="/viewloanrequest" className=" dropdown-item  text-capitalize btn btn-light text-success">
            loan request
          </Link >
          <Link  to="/adminoutstandingloan" className=" dropdown-item  text-capitalize btn btn-light text-success">
          loan repayment
          </Link >
          <Link  to="" className=" dropdown-item  text-capitalize btn btn-light text-success">
            contact us
          </Link >
          <Link  to="/" className=" dropdown-item  text-capitalize btn btn-light text-success">
            log out
          </Link >
          </div>
        </div>
      </nav>
    </>
  );
};

export default Adminnav;
