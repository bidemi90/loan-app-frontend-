import React, { useEffect, useState } from "react";
import Userwithlogin from "./Userwithlogin";
import landingimg5 from "../assets/9889615.jpg";
import { Link } from "react-router-dom";


import profileimg from "../assets/profileimg.png";

import { useDispatch, useSelector } from "react-redux";
import {
  featchinguser,
  featchinguserSuccessful,
  featchinguserfailed,
} from "./Redux/userdata";



const Usereditprofilepage = () => {



  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

 

  return (
    <>
      <Userwithlogin />

      <section>
        <h3 className="text-center text-capitalize mt-2 text-success">
          user profile page
        </h3>
        <div className="card mb-3 border-2 border-success col-10 mt-5 m-auto profileholderbox">
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img
                src={profileimg}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                {userdata && (
                  <>
                    <h4 className="text-capitalize text-success card-title">
                      name: {userdata.firstName} {userdata.lastName} {userdata.surname}
                    </h4>
                    <p className="text-capitalize text-success card-text">
                      phone number: {userdata.phoneNumber}
                    </p>
                    <p className="text-capitalize text-success card-text">
                      email: {userdata.email}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card profileholderbox col-10 mt-3 m-auto border-2 border-success">
          <div className="card-body">
            {userdata && (
              <>
                <p className="card-text text-capitalize text-success">address: {userdata.address}</p>
                <p className="card-text text-capitalize text-success">date of birth: {userdata.dateOfBirth}</p>
                <p className="card-text text-capitalize text-success">
                  employment Status: {userdata.employmentStatus}
                </p>
                <p className="card-text text-capitalize text-success">annual Income: ₦{userdata.annualIncome}</p>
              </>
            )}
            <div className="text-center text-capitalize">
              {userdata && userdata.address === "" ? (
                <Link
                  to="/addaddresspage"
                  className="btn btn-success text-capitalize"
                >
                  edit
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="card profileholderbox col-10 mt-3 m-auto border-2 border-success mb-5">
          <div className="card-body">
            {userdata && (
              <>
                <div className=" d-flex justify-content-between align-items-center">
                <p className="card-text text-capitalize text-success">NIN: {userdata.nin || "************"}</p>
                {  !userdata.bvn ? (
                <Link
                  to="/addninninpage"
                  className="btn btn-success text-capitalize"
                >
                  edit
                </Link>
              ) : null}
                </div>
               <div className=" d-flex justify-content-between align-items-center">
               <p className="card-text text-capitalize text-success">BVN: {userdata.bvn || "************"}</p>
               { !userdata.bvn ? (
                <Link
                  to="/addninbvnpage"
                  className="btn btn-success text-capitalize"
                >
                  edit
                </Link>
              ) : null}

               </div>
              </>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Usereditprofilepage;
