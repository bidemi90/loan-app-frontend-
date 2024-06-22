import React, { useState, useEffect } from "react";
import Userwithlogin from "./Userwithlogin";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedonePersonalLoanRequests } from "./Redux/onepersonalloanrequest";
import { fetchUpdatedonestudentLoanRequests } from "./Redux/onestudentloanrequest";
import { fetchUpdatedoneautoLoanRequests } from "./Redux/oneautoloanrequest";

const Userviewloanrequset2 = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [oneStudentDetails, setoneStudentDetails] = useState(null); // State to hold user details

  const { onestudentLoanRequests } = useSelector(
    (state) => state.onestudentloanrequest
  );

  useEffect(() => {
    // Find the user details based on the id from allUsers state
    const details = onestudentLoanRequests.find(
      (oneStudent) => oneStudent._id === id
    );

    // Update userDetails state with the found user details
    setoneStudentDetails(details);
  }, [id, onestudentLoanRequests]);




  return (
    <>
      <Userwithlogin />

      <h3 className="text-center text-success mt-4">Loan Requests</h3>
      <div className="">
        {oneStudentDetails ? (
          <div className="card bg-success text-light border-success shadow col-10  m-auto mt-3">
            <div className="card-body">
              <h5 className="card-title text-light">Student Loan Request</h5>
              <p className="card-text text-light">
                <strong>User ID: </strong>
                {oneStudentDetails.userId}
              </p>
              <p className="card-text text-light">
                <strong>Email: </strong>
                {oneStudentDetails.email}
              </p>
              <p className="card-text text-light">
                <strong>Loan Amount: </strong>
                {oneStudentDetails.loanAmount}
              </p>
              <p className="card-text text-light">
                <strong>Loan Purpose: </strong>
                {oneStudentDetails.loanPurpose}
              </p>
              <p className="card-text text-light">
                <strong>Loan Term: </strong>
                {(oneStudentDetails.loanTerm)/30} months
              </p>
              <p className="card-text text-light">
                <strong>School Name: </strong>
                {oneStudentDetails.schoolName}
              </p>
              <p className="card-text text-light">
                <strong>Matric Number: </strong>
                {oneStudentDetails.matricNumber}
              </p>
              <p className="card-text text-light">
                <strong>JAMB Number: </strong>
                {oneStudentDetails.jambNumber}
              </p>
              <p className="card-text text-light">
                <strong>Department: </strong>
                {oneStudentDetails.department}
              </p>
              <p className="card-text text-light">
                <strong>Current Level: </strong>
                {oneStudentDetails.currentLevel} level
              </p>
              <p className="card-text text-light">
                <strong>Additional Info: </strong>
                {oneStudentDetails.additionalInfo}
              </p>
              <p className="card-text text-light">
                <strong>Account Number: </strong>
                {oneStudentDetails.accountNumber}
              </p>
              <p className="card-text text-light">
                <strong>Account Name: </strong>
                {oneStudentDetails.accountName}
              </p>
              <p className="card-text text-light">
                <strong>Bank Name: </strong>
                {oneStudentDetails.bankName}
              </p>
              <p
                className={`btn  m-auto mx-2  text-success ${
                  oneStudentDetails.status === "processing"
                  ? "btn-light btn  m-auto mx-2  text-success"
                  : oneStudentDetails.status === "terminated"
                  ? "btn-danger btn  m-auto mx-2  text-light"
                  : oneStudentDetails.status === "successful"
                  ? "btn-primary btn  m-auto mx-2  text-light"
                  : ""
                }`}
              >
                <strong>Status: </strong>
                {oneStudentDetails.status}
              </p>

              {oneStudentDetails.status === "terminated" && (
                <p className="bg-danger border-1 border-light card m-2 p-3 text-light text-capitalize">
                  Reason: {oneStudentDetails.terminationreason}
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

export default Userviewloanrequset2;
