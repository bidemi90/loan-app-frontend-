import React, { useState, useEffect } from "react";
import Userwithlogin from "./Userwithlogin";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedonePersonalLoanRequests } from "./Redux/onepersonalloanrequest";
import { fetchUpdatedonestudentLoanRequests } from "./Redux/onestudentloanrequest";
import { fetchUpdatedoneautoLoanRequests } from "./Redux/oneautoloanrequest";

const Userviewloanrequset = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [oneAutoLoanDetails, setoneAutoLoanDetails] = useState(null); // State to hold user details

  const { oneautoLoanRequests } = useSelector(
    (state) => state.oneautoloanrequest
  );

  useEffect(() => {
    // Find the user details based on the id from allUsers state
    const details = oneautoLoanRequests.find(
      (oneAutoLoan) => oneAutoLoan._id === id
    );

    // Update userDetails state with the found user details
    setoneAutoLoanDetails(details);
  }, [id, oneautoLoanRequests]);

  return (
    <>
      <Userwithlogin />

      <h3 className="text-center text-success mt-4">Loan Requests</h3>
      <div className="">
        {oneAutoLoanDetails ? (
          <div className="card bg-success text-light border-success shadow col-10 m-auto mt-3">
            <div className="card-body">
              <h5 className="card-title text-light">Auto Loan Request</h5>
              <p className="card-text text-light">
                <strong>User ID: </strong>
                {oneAutoLoanDetails.userId}
              </p>
              <p className="card-text text-light">
                <strong>Email: </strong>
                {oneAutoLoanDetails.email}
              </p>
              <p className="card-text text-light">
                <strong>Vehicle Make: </strong>
                {oneAutoLoanDetails.vehicleMake}
              </p>
              <p className="card-text text-light">
                <strong>Vehicle Model: </strong>
                {oneAutoLoanDetails.vehicleModel}
              </p>
              <p className="card-text text-light">
                <strong>Vehicle Year: </strong>
                {oneAutoLoanDetails.vehicleYear}
              </p>
              <p className="card-text text-light">
                <strong>Loan Amount: </strong>
                {oneAutoLoanDetails.loanAmount}
              </p>
              <p className="card-text text-light">
                <strong>Loan Term: </strong>
                {(oneAutoLoanDetails.loanTerm)/30} months
              </p>
              <p className="card-text text-light">
                <strong>Additional Info: </strong>
                {oneAutoLoanDetails.additionalInfo}
              </p>
              <p className="card-text text-light">
                <strong>Account Number: </strong>
                {oneAutoLoanDetails.accountNumber}
              </p>
              <p className="card-text text-light">
                <strong>Account Name: </strong>
                {oneAutoLoanDetails.accountName}
              </p>
              <p className="card-text text-light">
                <strong>Bank Name: </strong>
                {oneAutoLoanDetails.bankName}
              </p>
              <p 
              className={`btn  m-auto mx-2  text-success ${
                oneAutoLoanDetails.status === "processing"
                ? "btn-light btn  m-auto mx-2  text-success"
                : oneAutoLoanDetails.status === "terminated"
                ? "btn-danger btn  m-auto mx-2  text-light"
                : oneAutoLoanDetails .status === "successful"
                ? "btn-primary btn  m-auto mx-2  text-light"
                : ""
              }`}
              >
                <strong>Status: </strong>
                {oneAutoLoanDetails.status}
              </p>

              {oneAutoLoanDetails.status === "terminated" && (
                <p className="bg-danger border-1 border-light card m-2 p-3 text-light text-capitalize">
                  Reason: {oneAutoLoanDetails.terminationreason}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-danger mt-5">
            Loading loan details...
          </div>
        )}
      </div>
    </>
  );
};

export default Userviewloanrequset;
