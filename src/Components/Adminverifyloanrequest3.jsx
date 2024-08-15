import React, { useState, useEffect } from "react";
import Adminnav from "./Adminnav";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedPersonalLoanRequests } from "./Redux/personalloanrequest";
import { fetchUpdatedStudentLoanRequests } from "./Redux/studentloanrequest";
import { fetchUpdatedAutoLoanRequests } from "./Redux/autoloanrequest";
import axios from "axios";
import Loadinicon from "./Loadinicon";

const Adminverifyloanrequest3 = () => {
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
  const [currentAutoLoanRequests, setcurrentAutoLoanRequests] = useState([]);
  const [StudentLoanRequests, setStudentLoanRequests] = useState([]);
  const [terminationReason, setTerminationReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading
  const [isLoading, setIsLoading] = useState(false); // New state for form submission loading

  useEffect(() => {
    dispatch(fetchUpdatedPersonalLoanRequests());
    dispatch(fetchUpdatedAutoLoanRequests());
    dispatch(fetchUpdatedStudentLoanRequests());
  }, [dispatch]);

  useEffect(() => {
    if (!isFetchingAutoLoanRequests && !isFetchingAutoLoanRequestsFailed) {
      const user = autoLoanRequests.find((user) => user._id === id);
      setcurrentAutoLoanRequests(user);
    }
  }, [
    id,
    autoLoanRequests,
    isFetchingAutoLoanRequests,
    isFetchingAutoLoanRequestsFailed,
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
        `https://loan-app-backend-siin.onrender.com/loanapp/editAutoLoanStatus/${id}`,
        updatedLoanRequest
      ) // Replace with your actual API endpoint
      .then((response) => {
        console.log("Loan request updated:", response.data);
        setcurrentAutoLoanRequests((prev) => ({
          ...prev,
          ...updatedLoanRequest,
        }));
        setIsSubmitting(false); // Set submission loading to false
        document.querySelector('[data-bs-dismiss="modal"]').click();
        alert("Loan request updated");
        dispatch(fetchUpdatedPersonalLoanRequests());
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
      vehicleMake: userdata.vehicleMake,
      vehicleModel: userdata.vehicleModel,
      vehicleYear: userdata.vehicleYear,
      loanAmount: userdata.loanAmount,
      loanTerm: userdata.loanTerm,
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
        "https://loan-app-backend-siin.onrender.com/loanapp/submitpaidAutoLoanApplication",
        formData
      )
      .then((response) => {
        console.log(
          "Auto loan application payment sent successfully:",
          response.data
        );
        alert("Auto loan application payment sent successfully");
        setIsLoading(false);

        navigate("/viewloanrequest");
      })
      .catch((error) => {
        console.error("Error sending Auto loan application payment:", error);
        alert("Error sending Auto loan application payment");
        setIsLoading(false);
      });
  };

  return (
    <>
      <Adminnav />

      <h3 className="text-center text-success mt-4">Loan Requests</h3>
      <div className="">
        {currentAutoLoanRequests ? (
          <div className="card bg-success text-light border-success shadow col-10  m-auto mt-3">
            <div className="card-body">
              <h5 className="card-title text-light">Auto Loan Request</h5>
              <p className="card-text text-capitalize text-light">
                <strong>User ID: </strong>
                {currentAutoLoanRequests.userId}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Email: </strong>
                {currentAutoLoanRequests.email}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Vehicle Make: </strong>
                {currentAutoLoanRequests.vehicleMake}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Vehicle Model: </strong>
                {currentAutoLoanRequests.vehicleModel}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Vehicle Year: </strong>
                {currentAutoLoanRequests.vehicleYear}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Loan Amount: ₦</strong>
                {currentAutoLoanRequests.loanAmount}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Loan Term: </strong>
                {currentAutoLoanRequests.loanTerm / 30} month
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Additional Info: </strong>
                {currentAutoLoanRequests.additionalInfo}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Account Number: </strong>
                {currentAutoLoanRequests.accountNumber}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Account Name: </strong>
                {currentAutoLoanRequests.accountName}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Bank Name: </strong>
                {currentAutoLoanRequests.bankName}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Status Name: </strong>
                {currentAutoLoanRequests.status}
              </p>
              {currentAutoLoanRequests.status !== "terminated" &&
                currentAutoLoanRequests.status !== "successful" && (
                  <div className="text-center">
                    <button
                      className="btn text-capitalize btn-primary m-auto mx-2"
                      onClick={() => handleSubmit(currentAutoLoanRequests)}
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

export default Adminverifyloanrequest3;
