import React, { useState, useEffect } from "react";
import Adminnav from "./Adminnav";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedPersonalLoanRequests } from "./Redux/personalloanrequest";
import { fetchUpdatedStudentLoanRequests } from "./Redux/studentloanrequest";
import { fetchUpdatedAutoLoanRequests } from "./Redux/autoloanrequest";
import axios from "axios";
import Loadinicon from "./Loadinicon";
import { current } from "@reduxjs/toolkit";

const Adminverifyloanrequest2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the user ID from the URL params

  console.log(id);
  const {
    isFetchingPersonalLoanRequests,
    personalLoanRequests,
    isFetchingPersonalLoanRequestsFailed,
  } = useSelector((state) => state.personalloanrequest);
  const {
    isFetchingStudentLoanRequests,
    studentLoanRequests,
    isFetchingStudentLoanRequestsFailed,
  } = useSelector((state) => state.studentloanrequest);
  const {
    isFetchingAutoLoanRequests,
    autoLoanRequests,
    isFetchingAutoLoanRequestsFailed,
  } = useSelector((state) => state.autoloanrequest);

  const [currentPersonalLoanRequests, setcurrentPersonalLoanRequests] =
    useState([]);
  const [AutoLoanRequests, setAutoLoanRequests] = useState([]);
  const [currentstudentLoanRequests, setcurrentstudentLoanRequests] = useState(
    []
  );
  const [terminationReason, setTerminationReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading
  const [isLoading, setIsLoading] = useState(false); // New state for form submission loading


  useEffect(() => {
    dispatch(fetchUpdatedPersonalLoanRequests());
    dispatch(fetchUpdatedAutoLoanRequests());
    dispatch(fetchUpdatedStudentLoanRequests());
  }, [dispatch]);

  useEffect(() => {
    if (
      !isFetchingStudentLoanRequests &&
      !isFetchingStudentLoanRequestsFailed
    ) {
      const user = studentLoanRequests.find((user) => user._id === id);
      setcurrentstudentLoanRequests(user);
    }
  }, [
    id,
    studentLoanRequests,
    isFetchingStudentLoanRequests,
    isFetchingStudentLoanRequestsFailed,
  ]);

  const handleSave = () => {
    setIsSubmitting(true); // Set submission loading to true

    const updatedLoanRequest = {
      terminationreason: terminationReason,
      status: "terminated",
    };

    console.log(updatedLoanRequest);

    axios
      .put(
        `https://loan-app-backend-siin.onrender.com/loanapp/editStudentLoanStatus/${id}`,
        updatedLoanRequest
      ) // Replace with your actual API endpoint
      .then((response) => {
        console.log("Loan request updated:", response.data);
        setcurrentstudentLoanRequests((prev) => ({
          ...prev,
          ...updatedLoanRequest,
        }));
        setIsSubmitting(false); // Set submission loading to false
        document.querySelector('[data-bs-dismiss="modal"]').click();
        alert("Loan request updated");
        dispatch(fetchUpdatedStudentLoanRequests());
        navigate("/viewloanrequest");
      })
      .catch((error) => {
        console.error("Error updating loan request:", error);
        alert("Error updating loan request");
        setIsSubmitting(false); // Set submission loading to false
      });
  };

  const handleSubmit = (userdata) => {
    console.log(userdata);
  
    setIsLoading(true);
  
    const formData = {
      _id: userdata._id,
      userId: userdata.userId,
      email: userdata.email,
      loanAmount: userdata.loanAmount,
      loanPurpose: userdata.loanPurpose,
      loanTerm: userdata.loanTerm,
      schoolName: userdata.schoolName,
      matricNumber: userdata.matricNumber,
      jambNumber: userdata.jambNumber,
      department: userdata.department,
      currentLevel: userdata.currentLevel,
      additionalInfo: userdata.additionalInfo,
      accountNumber: userdata.accountNumber,
      accountName: userdata.accountName,
      bankName: userdata.bankName,
      status: "successful",
      terminationreason: userdata.terminationreason,
    };
    console.log(formData);
  
    axios
      .post(
        "https://loan-app-backend-siin.onrender.com/loanapp/submitpaidStudentLoanApplication",
        formData
      )
      .then((response) => {
        console.log(
          "Student loan application payment sent successfully:",
          response.data
        );
        alert("Student loan application payment sent successfully");
        setIsLoading(false);
  
        navigate("/viewloanrequest");
      })
      .catch((error) => {
        console.error("Error sending Student loan application payment:", error);
        alert("Error sending Student loan application payment");
        setIsLoading(false);
      });
  };
  
  return (
    <>
      <Adminnav />

      <h3 className="text-center text-success mt-4">Loan Requests</h3>
      <div className="">
        {currentstudentLoanRequests ? (
          <div className="card bg-success text-light border-success shadow col-10  m-auto mt-3">
            <div className="card-body">
              <h5 className="card-title text-light">Student Loan Request</h5>
              <p className="card-text text-capitalize text-light">
                <strong>User ID: </strong>
                {currentstudentLoanRequests.userId}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Email: </strong>
                {currentstudentLoanRequests.email}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Loan Amount: ₦</strong>
                {currentstudentLoanRequests.loanAmount}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Loan Purpose: </strong>
                {currentstudentLoanRequests.loanPurpose}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Loan Term: </strong>
                {currentstudentLoanRequests.loanTerm / 30} month
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>School Name: </strong>
                {currentstudentLoanRequests.schoolName}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Matric Number: </strong>
                {currentstudentLoanRequests.matricNumber}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>JAMB Number: </strong>
                {currentstudentLoanRequests.jambNumber}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Department: </strong>
                {currentstudentLoanRequests.department}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Current Level: </strong>
                {currentstudentLoanRequests.currentLevel}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Additional Info: </strong>
                {currentstudentLoanRequests.additionalInfo}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Account Number: </strong>
                {currentstudentLoanRequests.accountNumber}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Account Name: </strong>
                {currentstudentLoanRequests.accountName}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Bank Name: </strong>
                {currentstudentLoanRequests.bankName}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Status Name: </strong>
                {currentstudentLoanRequests.status}
              </p>
              {currentstudentLoanRequests.status !== "terminated" &&
                currentstudentLoanRequests.status !== "successful" && (
                  <div className="text-center">
                    <button
                      className="btn text-capitalize btn-primary m-auto mx-2"
                      onClick={() => handleSubmit(currentstudentLoanRequests)}
                      disabled={isLoading} // Disable button when loading
                    >
                      {isLoading ? <Loadinicon /> : "Verify"}{" "}
                      {/* Display loading icon when loading */}
                    </button>
                   
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#modalId"
                      className="btn text-capitalize btn-danger m-auto mx-2"
                    >
                      Terminate
                    </button>
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div className="text-center text-danger mt-5">
            Loading user details...
          </div>
        )}
      </div>

      {/* modal termination */}

      <div
        className="modal fade"
        id="modalId"
        tabindex="-1"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
          role="document"
        >
          <div className="modal-content bg-success text-light text-capitalize">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                reason for termination
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-3">
              <textarea
                className="w-100 border-success border-2 card form-control-color"
                placeholder="Reason should be written here"
                value={terminationReason}
                onChange={(e) => setTerminationReason(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleSave}
                disabled={isSubmitting} // Disable button when submitting
              >
                {isSubmitting ? <Loadinicon /> : "Save"}{" "}
                {/* Display loading icon when submitting */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminverifyloanrequest2;
