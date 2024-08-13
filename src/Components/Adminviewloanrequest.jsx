import React, { useState, useEffect } from "react";
import Adminnav from "./Adminnav";
import logoimg from "../assets/download.png";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingPersonalLoanRequests,
  fetchingPersonalLoanRequestsSuccessful,
  fetchingPersonalLoanRequestsFailed,
  fetchUpdatedPersonalLoanRequests,
} from "./Redux/personalloanrequest";
import {
  fetchingStudentLoanRequests,
  fetchingStudentLoanRequestsSuccessful,
  fetchingStudentLoanRequestsFailed,
  fetchUpdatedStudentLoanRequests,
} from "./Redux/studentloanrequest";
import {
  fetchingAutoLoanRequests,
  fetchingAutoLoanRequestsSuccessful,
  fetchingAutoLoanRequestsFailed,
  fetchUpdatedAutoLoanRequests,
} from "./Redux/autoloanrequest";
import axios from "axios";
import { Link } from "react-router-dom";

const Adminviewloanrequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [PersonalLoanRequests, setPersonalLoanRequests] = useState([]);
  const [AutoLoanRequests, setAutoLoanRequests] = useState([]);
  const [StudentLoanRequests, setStudentLoanRequests] = useState([]);

  useEffect(() => {
    // Fetch personal loan requests
    dispatch(fetchUpdatedPersonalLoanRequests());
    setPersonalLoanRequests(personalLoanRequests);
    console.log("PersonalLoanRequests");
    console.log(PersonalLoanRequests);

    // Fetch auto loan requests
    dispatch(fetchUpdatedAutoLoanRequests());
    setAutoLoanRequests(autoLoanRequests);
    console.log("AutoLoanRequests");
    console.log(AutoLoanRequests);

    // Fetch student loan requests
    dispatch(fetchUpdatedStudentLoanRequests());
    setStudentLoanRequests(studentLoanRequests);
    console.log("StudentLoanRequests");
    console.log(StudentLoanRequests);
  }, [dispatch]);

  // Update state variables when Redux data changes
  useEffect(() => {
    if (
      !isFetchingPersonalLoanRequests &&
      !isFetchingPersonalLoanRequestsFailed
    ) {
      setPersonalLoanRequests(personalLoanRequests);
    }
  }, [
    isFetchingPersonalLoanRequests,
    isFetchingPersonalLoanRequestsFailed,
    personalLoanRequests,
  ]);

  useEffect(() => {
    if (!isFetchingAutoLoanRequests && !isFetchingAutoLoanRequestsFailed) {
      setAutoLoanRequests(autoLoanRequests);
    }
  }, [
    isFetchingAutoLoanRequests,
    isFetchingAutoLoanRequestsFailed,
    autoLoanRequests,
  ]);

  useEffect(() => {
    if (
      !isFetchingStudentLoanRequests &&
      !isFetchingStudentLoanRequestsFailed
    ) {
      setStudentLoanRequests(studentLoanRequests);
    }
  }, [
    isFetchingStudentLoanRequests,
    isFetchingStudentLoanRequestsFailed,
    studentLoanRequests,
  ]);

  return (
    <>
      <Adminnav />

      <p className="text-success text-capitalize text-center fs-3 mt-3">
        Loan Requests
      </p>
      <section className="bg-success shadow border-2 col-10 m-auto mt-2 mb-3 card overflow-hidden border-success">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {/* Personal Loan Requests */}
          <div className="accordion-item">
            <h2 className="accordion-header text-capitalize text-success">
              <button
                className="accordion-button text-capitalize bg-success collapsed text-light fs-5"
            type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
              >
                Personal Loan Requests
              </button>
            </h2>
            <div
            id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample"
             
            >
              <div className="accordion-body p-2">
                <div className="table-responsive-md">
                  <table className="table table-success">
                    <thead>
                      <tr>
                        <th className="bg-success text-light" scope="col">
                          NO.
                        </th>
                        <th className="bg-success text-light" scope="col">
                          Loan Amount
                        </th>
                        <th className="bg-success text-light" scope="col">
                          Loan Term
                        </th>
                        <th className="bg-success text-light" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {PersonalLoanRequests.map((request, index) => (
                        <tr key={index}>
                          <td className="bg-success text-light" scope="row">
                            {index + 1}.
                          </td>
                          <td>₦{request.loanAmount}</td>
                          <td>{request.loanTerm / 30} months</td>
                          <td>
                            <Link
                              to={`/verifyloanrequest/${request._id}`}
                              className={`btn text-light ${
                                request.status === "processing"
                                  ? "btn-success"
                                  : request.status === "terminated"
                                  ? "btn-danger"
                                  : request.status === "successful"
                                  ? "btn-primary"
                                  : ""
                              }`}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}

                      {PersonalLoanRequests.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No loan requests
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Student Loan Requests */}
          <div className="accordion-item">
            <h2 className="accordion-header text-capitalize text-success">
              <button
                className="accordion-button text-capitalize bg-success collapsed text-light fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Student Loan Requests
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body p-2">
                <div className="table-responsive-md">
                  <table className="table table-success">
                    <thead>
                      <tr>
                        <th className="bg-success text-light" scope="col">
                          NO.
                        </th>
                        <th className="bg-success text-light" scope="col">
                          Loan Amount
                        </th>
                        <th className="bg-success text-light" scope="col">
                          Loan Term
                        </th>
                        <th className="bg-success text-light" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {StudentLoanRequests.map((request, index) => (
                        <tr key={index}>
                          <td className="bg-success text-light" scope="row">
                            {index + 1}.
                          </td>
                          <td>₦{request.loanAmount}</td>
                          <td>{request.loanTerm / 30} months</td>
                          <td>
                            <Link
                              to={`/verifyloanrequest2/${request._id}`}
                              className={`btn text-light ${
                                request.status === "processing"
                                  ? "btn-success"
                                  : request.status === "terminated"
                                  ? "btn-danger"
                                  : request.status === "successful"
                                  ? "btn-primary"
                                  : ""
                              }`}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}

                      {StudentLoanRequests.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No loan requests
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Auto Loan Requests */}
          <div className="accordion-item">
            <h2 className="accordion-header text-capitalize text-success">
              <button
                className="accordion-button text-capitalize bg-success collapsed text-light fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Auto Loan Requests
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body p-2">
                <div className="table-responsive-md">
                  <table className="table table-success">
                    <thead>
                      <tr>
                        <th className="bg-success text-light" scope="col">
                          NO.
                        </th>
                        <th className="bg-success text-light" scope="col">
                          Loan Amount
                        </th>
                        <th className="bg-success text-light" scope="col">
                          Loan Term
                        </th>
                        <th className="bg-success text-light" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {AutoLoanRequests.map((request, index) => (
                        <tr key={index}>
                          <td className="bg-success text-light" scope="row">
                            {index + 1}.
                          </td>
                          <td>₦{request.loanAmount}</td>
                          <td>{request.loanTerm / 30} months</td>
                          <td>
                            <Link
                              to={`/verifyloanrequest3/${request._id}`}
                              className={`btn text-light ${
                                request.status === "processing"
                                  ? "btn-success"
                                  : request.status === "terminated"
                                  ? "btn-danger"
                                  : request.status === "successful"
                                  ? "btn-primary"
                                  : ""
                              }`}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}

                      {AutoLoanRequests.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No loan requests
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Adminviewloanrequest;
