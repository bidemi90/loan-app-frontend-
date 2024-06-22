import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { BsCartPlusFill } from "react-icons/bs";
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import logoimg from "../assets/download.png";

const Userwithoulog = () => {
  return (
    <>
      <nav className="usernav bg-success text-light text-capitalize justify-content-evenly align-items-center">
        <div className=" w-25">
          <img src={logoimg} className="logoimg " alt="" />
        </div>
        <div className=" w-50 d-flex justify-content-evenly align-items-center ">
          <Link to="/" className="  text-capitalize btn btn-light text-success">
            Home
          </Link>

          <Link
            to="/aboutus"
            className="  text-capitalize btn btn-light text-success"
          >
            about us
          </Link>
          <Link
            to="/contactus"
            className="  text-capitalize btn btn-light text-success"
          >
            contact us
          </Link>
          <Link
            to="/login"
            className="  text-capitalize btn btn-light text-success"
          >
            log in
          </Link>
          <Link
            to="/signup"
            className="  text-capitalize btn btn-light text-success"
          >
            sign up
          </Link>
        </div>
      </nav>

      <nav className="usernav2 text-success bg-success text-light">
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


          <Link to="/" className="  text-capitalize d-block text-start btn btn-light text-success">
            Home
          </Link>

          <Link
            to="/aboutus"
            className="  text-capitalize d-block text-start btn btn-light text-success"
          >
            about us
          </Link>
          <Link
            to="/contactus"
            className="  text-capitalize d-block text-start btn btn-light text-success"
          >
            contact us
          </Link>
          <Link
            to="/login"
            className="  text-capitalize d-block text-start btn btn-light text-success"
          >
            log in
          </Link>
          <Link
            to="/signup"
            className="  text-capitalize d-block text-start btn btn-light text-success"
          >
            sign up
          </Link>
            
           
          </div>
        </div>
      </nav>
    </>
  );
};

export default Userwithoulog;
