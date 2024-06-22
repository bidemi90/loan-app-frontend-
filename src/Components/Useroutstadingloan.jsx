import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import landingimg1 from "../assets/9045616.jpg";
import landingimg2 from "../assets/6425322.jpg";
import landingimg3 from "../assets/6425319.jpg";
import landingimg4 from "../assets/6498.jpg";
import landingimg5 from "../assets/9889615.jpg";
import landingimg6 from "../assets/9957745.jpg";
import Userwithlogin from "./Userwithlogin";
import { Link } from "react-router-dom";
import profileimg from "../assets/profileimg.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  featchinguser,
  featchinguserSuccessful,
  featchinguserfailed,
} from "./Redux/userdata";
import {
  fetchingonepaidpersonalloans,
  fetchingonepaidpersonalloansSuccessful,
  fetchingonepaidpersonalloansFailed,
  fetchUpdatedonepaidpersonalloans,
} from "./Redux/onepaidpersonalloan";
import {
  fetchingonepaidstudentloans,
  fetchingonepaidstudentloansSuccessful,
  fetchingonepaidstudentloansFailed,
  fetchUpdatedonepaidstudentloans,
} from "./Redux/onepaidstudentloan";
import {
  fetchingonepaidautoloans,
  fetchingonepaidautoloansSuccessful,
  fetchingonepaidautoloansFailed,
  fetchUpdatedonepaidautoloans,
} from "./Redux/onepaidautoloan";
import Loadinicon from "./Loadinicon";

const Useroutstadingloan = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );
  console.log(userdata);

  const {
    isFetchingonepaidpersonalloans,
    onepaidpersonalloans,
    isFetchingonepaidpersonalloansFailed,
  } = useSelector((state) => state.onepaidpersonalloan);

  const {
    isFetchingonepaidstudentloans,
    onepaidstudentloans,
    isFetchingonepaidstudentloansFailed,
  } = useSelector((state) => state.onepaidstudentloan);

  const {
    isFetchingonepaidautoloans,
    onepaidautoloans,
    isFetchingonepaidautoloansFailed,
  } = useSelector((state) => state.onepaidautoloan);

  const [onepaidpersonalLoanRequests, setonepaidpersonalLoanRequests] =
    useState([]);
  const [onepaidStudentLoanRequests, setonepaidStudentLoanRequests] = useState(
    []
  );
  const [onepaidautoLoanRequests, setonepaidautoLoanRequests] = useState([]);

  useEffect(() => {
    // Fetch personal loan requests
    dispatch(fetchUpdatedonepaidautoloans(userdata._id));
    dispatch(fetchUpdatedonepaidpersonalloans(userdata._id));
    dispatch(fetchUpdatedonepaidstudentloans(userdata._id));
  }, [dispatch, userdata._id]);

  useEffect(() => {
    if (
      !isFetchingonepaidpersonalloans &&
      !isFetchingonepaidpersonalloansFailed
    ) {
      setonepaidpersonalLoanRequests(onepaidpersonalloans);
    }
  }, [
    isFetchingonepaidpersonalloans,
    isFetchingonepaidpersonalloansFailed,
    onepaidpersonalloans,
  ]);

  console.log(onepaidpersonalLoanRequests);

  useEffect(() => {
    if (
      !isFetchingonepaidstudentloans &&
      !isFetchingonepaidstudentloansFailed
    ) {
      setonepaidStudentLoanRequests(onepaidstudentloans);
    }
  }, [
    isFetchingonepaidstudentloans,
    isFetchingonepaidstudentloansFailed,
    onepaidstudentloans,
  ]);

  console.log(onepaidStudentLoanRequests);

  useEffect(() => {
    if (!isFetchingonepaidautoloans && !isFetchingonepaidautoloansFailed) {
      setonepaidautoLoanRequests(onepaidautoloans);
    }
  }, [
    isFetchingonepaidautoloans,
    isFetchingonepaidautoloansFailed,
    onepaidautoloans,
  ]);

  console.log(onepaidautoLoanRequests);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const calculatePaymentDate = (loanDateStr, loanTerm) => {
    const loanDate = new Date(loanDateStr);
    const paymentDate = new Date(
      loanDate.getTime() + loanTerm * 24 * 60 * 60 * 1000
    );
    return paymentDate;
  };

  const calculateDaysRemaining = (paymentDate) => {
    const currentDate = new Date();
    const timeDifference = paymentDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  const handlePaymentClick1 = async (loanId) => {
    setIsLoading(true); // Set loading state to true
    console.log(`Make payment for loan ID: ${loanId}`);

    try {
      // Make the axios request to the backend
      const response = await axios.put(
        `http://localhost:8332/loanapp/editonepaidPersonalLoanStatus/${loanId}`
      );

      // Handle the response from the backend
      console.log("Payment response:", response.data);

      // Optionally, handle the success response, e.g., show a success message or update UI
      alert("Payment successful");
      dispatch(fetchUpdatedonepaidpersonalloans(userdata._id));
    } catch (error) {
      // Handle the error from the backend
      console.error("Error making payment:", error);

      // Optionally, handle the error response, e.g., show an error message
      alert("Error making payment. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handlePaymentClick2 = async (loanId) => {
    console.log(`Make payment for loan ID: ${loanId}`);
    setIsLoading(true); // Set loading state to true

    try {
      // Make the axios request to the backend
      const response = await axios.put(
        `http://localhost:8332/loanapp/editonepaidStudentLoanStatus/${loanId}`
      );

      // Handle the response from the backend
      console.log("Payment response:", response.data);

      // Optionally, handle the success response, e.g., show a success message or update UI
      alert("Payment successful");
      dispatch(fetchUpdatedonepaidstudentloans(userdata._id));
    } catch (error) {
      // Handle the error from the backend
      console.error("Error making payment:", error);

      // Optionally, handle the error response, e.g., show an error message
      alert("Error making payment. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handlePaymentClick3 = async (loanId) => {
    console.log(`Make payment for loan ID: ${loanId}`);
    setIsLoading(true); // Set loading state to true

    try {
      // Make the axios request to the backend
      const response = await axios.put(
        `http://localhost:8332/loanapp/editonepaidAutoLoanStatus/${loanId}`
      );

      // Handle the response from the backend
      console.log("Payment response:", response.data);

      // Optionally, handle the success response, e.g., show a success message or update UI
      alert("Payment successful");
      dispatch(fetchUpdatedonepaidautoloans(userdata._id));
    } catch (error) {
      // Handle the error from the backend
      console.error("Error making payment:", error);

      // Optionally, handle the error response, e.g., show an error message
      alert("Error making payment. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      <Userwithlogin />
      <section className="bg-success-subtle outstandingloantab text-capitalize">
        <h2 className="text-capitalize text-center text-success  fw-bolder pt-4">
          Repayment Schedule
        </h2>

        <section>
          <h5 className=" mt-4 text-capitalize text-success text-center">
            personal loan repayment Schedule
          </h5>
          <div className="d-flex flex-column justify-content-evenly align-items-center">
            {onepaidpersonalLoanRequests.map((request, index) => {
              const paymentDate = calculatePaymentDate(
                request.createdAt,
                request.loanTerm
              );
              const daysRemaining = calculateDaysRemaining(paymentDate);

              return (
                <div key={index} className="col-8 m-2">
                  <div className="card shadow border-1 text-success border-success">
                    <div className="card-body p-0">
                      <h3 className="card-title bg-success p-3 text-light">
                        loan id: {request.loanId}
                      </h3>
                      <div className="p-3 text-success">
                        <p className="card-text m-0 fs-6">
                          user id: {request.userId}
                        </p>
                        <p className="card-text m-0">email: {request.email}</p>
                        <p className="card-text m-0">
                          amount: ₦{request.loanAmount}
                        </p>
                        <p className="card-text m-0">
                          additional info: {request.additionalInfo}
                        </p>
                        <p className="card-text m-0">
                          loan given date: {formatDate(request.createdAt)}
                        </p>
                        <p className="card-text m-0">
                          loan term: {(request.loanTerm / 30).toFixed(2)}{" "}
                          month(s)
                        </p>
                        <p className="card-text m-0">
                          payment date: {formatDate(paymentDate)}
                        </p>
                        <p className="card-text m-0">
                          days remaining: {daysRemaining}
                        </p>

                        <div className="d-flex justify-content-between p-3">
                          <button
                            className={`btn text-light text-capitalize ${
                              request.paid === ""
                                ? "btn-success"
                                : request.paid === "successful"
                                ? "btn-primary"
                                : ""
                            }`}
                          >
                            loan paid
                          </button>
                          <button
                            className={`btn text-capitalize btn-success text-light
                           ${
                             request.paid === "successful"
                               ? "d-none"
                               : request.paid === ""
                               ? "d-block"
                               : ""
                           }`}
                            onClick={() => handlePaymentClick1(request._id)}
                          >
                            {isLoading ? <Loadinicon /> : " make payment"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {onepaidpersonalLoanRequests.length === 0 && (
              <div className="text-center">No loan requests</div>
            )}
          </div>
        </section>
        <section>
          <h5 className=" mt-4 text-capitalize text-success text-center">
            student loan repayment Schedule
          </h5>
          <div className="d-flex flex-column justify-content-evenly align-items-center">
            {onepaidStudentLoanRequests.map((request, index) => {
              const paymentDate = calculatePaymentDate(
                request.createdAt,
                request.loanTerm
              );
              const daysRemaining = calculateDaysRemaining(paymentDate);

              return (
                <div key={index} className="col-8 m-2">
                  <div className="card shadow border-1 text-success border-success">
                    <div className="card-body p-0">
                      <h3 className="card-title bg-success p-3 text-light">
                        loan id: {request.loanId}
                      </h3>
                      <div className="p-3 text-success">
                        <p className="card-text m-0 fs-6">
                          user id: {request.userId}
                        </p>
                        <p className="card-text m-0">email: {request.email}</p>
                        <p className="card-text m-0">
                          school name: {request.schoolName}
                        </p>
                        <p className="card-text m-0">
                          matric number: {request.matricNumber}
                        </p>
                        <p className="card-text m-0">
                          amount: ₦{request.loanAmount}
                        </p>
                        <p className="card-text m-0">
                          additional info: {request.additionalInfo}
                        </p>
                        <p className="card-text m-0">
                          loan given date: {formatDate(request.createdAt)}
                        </p>
                        <p className="card-text m-0">
                          loan term: {(request.loanTerm / 30).toFixed(2)}{" "}
                          month(s)
                        </p>
                        <p className="card-text m-0">
                          payment date: {formatDate(paymentDate)}
                        </p>
                        <p className="card-text m-0">
                          days remaining: {daysRemaining}
                        </p>

                        <div className="d-flex justify-content-between p-3">
                          <button
                            className={`btn text-light text-capitalize ${
                              request.paid === ""
                                ? "btn-success"
                                : request.paid === "successful"
                                ? "btn-primary"
                                : ""
                            }`}
                          >
                            loan paid
                          </button>
                          <button
                            className={`btn text-capitalize btn-success text-light
                           ${
                             request.paid === "successful"
                               ? "d-none"
                               : request.paid === ""
                               ? "d-block"
                               : ""
                           }`}
                            onClick={() => handlePaymentClick2(request._id)}
                          >
                            {isLoading ? <Loadinicon /> : " make payment"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {onepaidStudentLoanRequests.length === 0 && (
              <div className="text-center">No loan requests</div>
            )}
          </div>
        </section>
        <section>
          <h5 className=" mt-4 text-capitalize text-success text-center">
            auto loan repayment Schedule
          </h5>
          <div className="d-flex flex-column justify-content-evenly align-items-center">
            {onepaidautoLoanRequests.map((request, index) => {
              const paymentDate = calculatePaymentDate(
                request.createdAt,
                request.loanTerm
              );
              const daysRemaining = calculateDaysRemaining(paymentDate);

              return (
                <div key={index} className="col-8 m-2">
                  <div className="card shadow border-1 text-success border-success">
                    <div className="card-body p-0">
                      <h3 className="card-title bg-success p-3 text-light">
                        loan id: {request.loanId}
                      </h3>
                      <div className="p-3 text-success">
                        <p className="card-text m-0 fs-6">
                          user id: {request.userId}
                        </p>
                        <p className="card-text m-0">email: {request.email}</p>
                        <p className="card-text m-0">
                          amount: ₦{request.loanAmount}
                        </p>
                        <p className="card-text m-0">
                          vehicle Model: ₦{request.vehicleModel}
                        </p>
                        <p className="card-text m-0">
                          additional info: {request.additionalInfo}
                        </p>
                        <p className="card-text m-0">
                          loan given date: {formatDate(request.createdAt)}
                        </p>
                        <p className="card-text m-0">
                          loan term: {(request.loanTerm / 30).toFixed(2)}{" "}
                          month(s)
                        </p>
                        <p className="card-text m-0">
                          payment date: {formatDate(paymentDate)}
                        </p>
                        <p className="card-text m-0">
                          days remaining: {daysRemaining}
                        </p>

                        <div className="d-flex justify-content-between p-3">
                          <button
                            className={`btn text-light text-capitalize
                           ${
                             request.paid === ""
                               ? "btn-success"
                               : request.paid === "successful"
                               ? "btn-primary"
                               : ""
                           }`}
                          >
                            loan paid
                          </button>
                          <button
                            className={`btn text-capitalize btn-success text-light
                           ${
                             request.paid === "successful"
                               ? "d-none"
                               : request.paid === ""
                               ? "d-block"
                               : ""
                           }`}
                            onClick={() => handlePaymentClick3(request._id)}
                          >
                            {isLoading ? <Loadinicon /> : " make payment"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {onepaidautoLoanRequests.length === 0 && (
              <div className="text-center">No loan requests</div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default Useroutstadingloan;
