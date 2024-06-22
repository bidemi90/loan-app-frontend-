import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Userwithlogin from "./Userwithlogin";

import { useDispatch, useSelector } from "react-redux";
import {
  featchinguser,
  featchinguserSuccessful,
  featchinguserfailed,
} from "./Redux/userdata";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import Loadinicon from "./Loadinicon";

const Loantype3 = () => {
  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );
  console.log(userdata);
  const dispatch = useDispatch();
  const [user, setuser] = useState(null);

  const [isLoading, setIsLoading] = useState(false); // State for managing loading

  useEffect(() => {
    setuser(userdata);
    console.log(user);

    return () => {};
  }, []);

  const initialValues = {
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    loanAmount: "",
    loanTerm: "",
    additionalInfo: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
  };

  const validationSchema = Yup.object().shape({
    vehicleMake: Yup.string().required("Vehicle make is required"),
    vehicleModel: Yup.string().required("Vehicle model is required"),
    vehicleYear: Yup.string().required("Vehicle year is required"),
    loanAmount: Yup.number().required("Loan amount is required"),
    loanTerm: Yup.string().required("Loan term is required"),
    additionalInfo: Yup.string().notRequired(),
    accountNumber: Yup.string().required("Account number is required"),
    accountName: Yup.string().required("Account name is required"),
    bankName: Yup.string().required("Bank name is required"),
  });

  const handleSubmit = (values, userdata) => {
    setIsLoading(true);

    console.log(userdata);
    console.log(userdata._id);

    const formData = {
      userId: user._id,
      email: user.email,
      vehicleMake: values.vehicleMake,
      vehicleModel: values.vehicleModel,
      vehicleYear: values.vehicleYear,
      loanAmount: values.loanAmount,
      loanTerm: values.loanTerm,
      additionalInfo: values.additionalInfo,
      accountNumber: values.accountNumber,
      accountName: values.accountName,
      bankName: values.bankName,
    };
    console.log(formData);

    axios
      .post("http://localhost:8332/loanapp/submitAutoLoanApplication", formData)
      .then((response) => {
        console.log(
          "Auto loan application submitted successfully:",
          response.data
        );
        alert("Auto loan application submitted successfully");
        setIsLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error submitting auto loan application:", error);
        alert("Error submitting personal loan application");
        setIsLoading(false);
      });
  };

  return (
    <>
      <Userwithlogin />

      <h3 className="text-capitalize text-center text-success mt-4">
        Auto Loan
      </h3>
      <div className="card col-lg-6 col-10 m-auto border-1 border-success shadow bg-success text-light">
        <p className="text-capitalize text-center text-light m-1">
          With our auto loans, you can finance the vehicle of your dreams.
        </p>
        <p className="text-capitalize text-center text-light m-1">
          Fill the form below to apply for the loan
        </p>
        <p className="text-capitalize text-center text-light m-1">
          <span className="text-uppercase">Note</span>: Your loan will be
          processed after a review
        </p>
      </div>
      <div className="formdivholder col-lg-6 col-10 border-2 card p-3 border-success shadow mt-5 mb-5 m-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="text-capitalize text-success">
                <label htmlFor="vehicleMake" className="form-label">
                  Vehicle Make
                </label>
                <Field
                  type="text"
                  name="vehicleMake"
                  className={`form-control text-success ${
                    touched.vehicleMake && errors.vehicleMake
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="vehicleMake"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="vehicleModel" className="form-label">
                  Vehicle Model
                </label>
                <Field
                  type="text"
                  name="vehicleModel"
                  className={`form-control text-success ${
                    touched.vehicleModel && errors.vehicleModel
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="vehicleModel"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="vehicleYear" className="form-label">
                  Vehicle Year
                </label>
                <Field
                  type="text"
                  name="vehicleYear"
                  className={`form-control text-success ${
                    touched.vehicleYear && errors.vehicleYear
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="vehicleYear"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="loanAmount" className="form-label">
                  Loan Amount
                </label>
                <Field
                  type="number"
                  name="loanAmount"
                  className={`form-control text-success ${
                    touched.loanAmount && errors.loanAmount ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="loanAmount"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="loanTerm" className="form-label">
                  Loan Term (in months)
                </label>
                <Field
                  type="text"
                  name="loanTerm"
                  className={`form-control text-success ${
                    touched.loanTerm && errors.loanTerm ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="loanTerm"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="accountNumber" className="form-label">
                  Account Number
                </label>
                <Field
                  type="text"
                  name="accountNumber"
                  className={`form-control text-success ${
                    touched.accountNumber && errors.accountNumber
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="accountNumber"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="accountName" className="form-label">
                  Account Name
                </label>
                <Field
                  type="text"
                  name="accountName"
                  className={`form-control text-success ${
                    touched.accountName && errors.accountName
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="accountName"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="bankName" className="form-label">
                  Bank Name
                </label>
                <Field
                  type="text"
                  name="bankName"
                  className={`form-control text-success ${
                    touched.bankName && errors.bankName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="bankName"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="additionalInfo" className="form-label">
                  Additional Information
                </label>
                <Field
                  as="textarea"
                  name="additionalInfo"
                  className="form-control text-success"
                />
                <ErrorMessage
                  name="additionalInfo"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success m-2 text-capitalize"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isLoading && <Loadinicon />}
    </>
  );
};

export default Loantype3;
