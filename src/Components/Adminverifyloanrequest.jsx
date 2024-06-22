import React, { useState, useEffect } from "react";
import Adminnav from "./Adminnav";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedPersonalLoanRequests } from "./Redux/personalloanrequest";
import { fetchUpdatedStudentLoanRequests } from "./Redux/studentloanrequest";
import { fetchUpdatedAutoLoanRequests } from "./Redux/autoloanrequest";
import axios from "axios";
import Loadinicon from "./Loadinicon";

const Adminverifyloanrequest = () => {
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
    if (
      !isFetchingPersonalLoanRequests &&
      !isFetchingPersonalLoanRequestsFailed
    ) {
      const user = personalLoanRequests.find((user) => user._id === id);
      setcurrentPersonalLoanRequests(user);
    }
  }, [
    id,
    personalLoanRequests,
    isFetchingPersonalLoanRequests,
    isFetchingPersonalLoanRequestsFailed,
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
        `http://localhost:8332/loanapp/loanrequests/${id}`,
        updatedLoanRequest
      ) // Replace with your actual API endpoint
      .then((response) => {
        console.log("Loan request updated:", response.data);
        setcurrentPersonalLoanRequests((prev) => ({
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
      loanAmount: userdata.loanAmount,
      loanPurpose: userdata.loanPurpose,
      loanTerm: userdata.loanTerm,
      additionalInfo: userdata.additionalInfo,
      accountNumber: userdata.accountName,
      accountName: userdata.accountNumber,
      bankName: userdata.bankName,
      status: "successful",
      terminationreason: userdata.terminationreason,
      
    };
    console.log(formData);

    axios
      .post(
        "http://localhost:8332/loanapp/submitpaidPersonalLoanApplication",
        formData
      )
      .then((response) => {
        console.log(
          "Personal loan application payment sent successfully:",
          response.data
        );
        alert("Personal loan application payment sent successfully");
        setIsLoading(false);

        navigate("/viewloanrequest");
      })
      .catch((error) => {
        console.error("Error sending Personal loan application payment sent successfully:", error);
        alert("Error sending Personal loan application payment sent successfully");
        setIsLoading(false);
      });
    }




  return (
    <>
      <Adminnav />

      <h3 className="text-center text-success mt-4">Loan Requests</h3>
      <div className="">
        {currentPersonalLoanRequests ? (
          <div className="card bg-success text-light border-success shadow col-10 m-auto mt-3">
            <div className="card-body">
              <h5 className="card-title text-light">Loan Request</h5>
              <p className="card-text text-capitalize text-light">
                <strong>User ID: </strong>
                {currentPersonalLoanRequests.userId}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Email: </strong>
                {currentPersonalLoanRequests.email}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Loan Amount: ₦</strong>
                {currentPersonalLoanRequests.loanAmount}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Loan Purpose: </strong>
                {currentPersonalLoanRequests.loanPurpose}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Loan Term: </strong>
                {currentPersonalLoanRequests.loanTerm / 30} month
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Additional Info: </strong>
                {currentPersonalLoanRequests.additionalInfo}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Account Number: </strong>
                {currentPersonalLoanRequests.accountNumber}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Account Name: </strong>
                {currentPersonalLoanRequests.accountName}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Bank Name: </strong>
                {currentPersonalLoanRequests.bankName}
              </p>
              <p className="card-text text-capitalize text-light">
                <strong>Status Name: </strong>
                {currentPersonalLoanRequests.status}
              </p>
              {currentPersonalLoanRequests.status !== "terminated" &&
                currentPersonalLoanRequests.status !== "successful" && (
                  <div className="text-center">
                    <button
                      className="btn text-capitalize btn-primary m-auto mx-2"
                      onClick={() => handleSubmit(currentPersonalLoanRequests)}
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
        tabIndex="-1"
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

export default Adminverifyloanrequest;
