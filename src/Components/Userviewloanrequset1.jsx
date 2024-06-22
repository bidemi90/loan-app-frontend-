import React, { useState, useEffect } from "react";
import Userwithlogin from "./Userwithlogin";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedonePersonalLoanRequests } from "./Redux/onepersonalloanrequest";
import { fetchUpdatedonestudentLoanRequests } from "./Redux/onestudentloanrequest";
import { fetchUpdatedoneautoLoanRequests } from "./Redux/oneautoloanrequest";

const Userviewloanrequset1 = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [onePersonalDetails, setonePersonalDetails] = useState(null); // State to hold user details

  const { onePersonalLoanRequests } = useSelector(
    (state) => state.onepersonalloanrequest
  );

  useEffect(() => {
    // Find the user details based on the id from allUsers state
    const details = onePersonalLoanRequests.find(
      (onePersonal) => onePersonal._id === id
    );

    // Update userDetails state with the found user details
    setonePersonalDetails(details);
  }, [id, onePersonalLoanRequests]);

  return (
    <>
      <Userwithlogin />

      <h3 className="text-center text-success mt-4">Loan Requests</h3>
      <div className="">
        {onePersonalDetails ? (
          <div className="card bg-success text-light border-success shadow col-10  m-auto mt-3">
            <div className="card-body">
              <h5 className="card-title text-light">Loan Request</h5>
              <p className="card-text text-light">
                <strong>User ID: </strong>
                {onePersonalDetails.userId}
              </p>
              <p className="card-text text-light">
                <strong>Email: </strong>
                {onePersonalDetails.email}
              </p>
              <p className="card-text text-light">
                <strong>Loan Amount: </strong>
                {onePersonalDetails.loanAmount}
              </p>
              <p className="card-text text-light">
                <strong>Loan Purpose: </strong>
                {onePersonalDetails.loanPurpose}
              </p>
              <p className="card-text text-light">
                <strong>Loan Term: </strong>
                {(onePersonalDetails.loanTerm)/30} months
              </p>
              <p className="card-text text-light">
                <strong>Additional Info: </strong>
                {onePersonalDetails.additionalInfo}
              </p>
              <p className="card-text text-light">
                <strong>Account Number: </strong>
                {onePersonalDetails.accountNumber}
              </p>
              <p className="card-text text-light">
                <strong>Account Name: </strong>
                {onePersonalDetails.accountName}
              </p>
              <p className="card-text text-light">
                <strong>Bank Name: </strong>
                {onePersonalDetails.bankName}
              </p>
              <p
                className={`
                   ${
                    onePersonalDetails.status === "processing"
                    ? "btn-light btn  m-auto mx-2  text-success"
                    : onePersonalDetails.status === "terminated"
                    ? "btn-danger btn  m-auto mx-2  text-light"
                    : onePersonalDetails.status === "successful"
                    ? "btn-primary btn  m-auto mx-2  text-light"
                    : ""
                }`}
              >
                <strong>Status: </strong>
                {onePersonalDetails.status}
              </p>

              {onePersonalDetails.status === "terminated" && (
                <p className="bg-danger border-1 border-light card m-2 p-3 text-light text-capitalize">
                  Reason: {onePersonalDetails.terminationreason}
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

export default Userviewloanrequset1;
