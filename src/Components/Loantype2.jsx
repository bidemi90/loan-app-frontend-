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

const Loantype2 = () => {
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
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    schoolName: "",
    matricNumber: "",
    jambNumber: "",
    department: "",
    currentLevel: "",
    additionalInfo: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
  };

  const validationSchema = Yup.object().shape({
    loanAmount: Yup.number().required("Loan amount is required"),
    loanPurpose: Yup.string().required("Loan purpose is required"),
    loanTerm: Yup.string().required("Loan term is required"),
    schoolName: Yup.string().required("School name is required"),
    matricNumber: Yup.string().required("Matric number is required"),
    jambNumber: Yup.string().required("JAMB number is required"),
    department: Yup.string().required("Department is required"),
    currentLevel: Yup.string().required("Current level is required"),
    additionalInfo: Yup.string().notRequired(),
    accountNumber: Yup.string().required("Account number is required"),
    accountName: Yup.string().required("Account name is required"),
    bankName: Yup.string().required("Bank name is required"),
  });

  const handleSubmit = (values, userdata) => {
    console.log(userdata);
    setIsLoading(true);

    const formData = {
      userId: user._id,
      email: user.email,
      loanAmount: values.loanAmount,
      loanPurpose: values.loanPurpose,
      loanTerm: values.loanTerm,
      schoolName: values.schoolName,
      matricNumber: values.matricNumber,
      jambNumber: values.jambNumber,
      department: values.department,
      currentLevel: values.currentLevel,
      additionalInfo: values.additionalInfo,
      accountNumber: values.accountNumber,
      accountName: values.accountName,
      bankName: values.bankName,
    };
    console.log(formData);

    axios
      .post(
        "http://localhost:8332/loanapp/submitStudentLoanApplication",
        formData
      )
      .then((response) => {
        console.log(
          "Student loan application submitted successfully:",
          response.data
        );
        alert("Student loan application submitted successfully");
        setIsLoading(false);

        navigate("/home");
      })
      .catch((error) => {
        console.error("Error submitting student loan application:", error);
        alert("Error submitting personal loan application");
        setIsLoading(false);
      });
  };

  return (
    <>
      <Userwithlogin />

      <h3 className="text-capitalize text-center text-success mt-4">
        Student Loan
      </h3>
      <div className="card col-lg-6 col-10 m-auto border-1 border-success shadow bg-success text-light">
        <p className="text-capitalize text-center text-light m-1">
          With our student loans, you can finance your education without
          compromise.
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
                <label htmlFor="loanPurpose" className="form-label">
                  Loan Purpose
                </label>
                <Field
                  type="text"
                  name="loanPurpose"
                  className={`form-control text-success ${
                    touched.loanPurpose && errors.loanPurpose
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="loanPurpose"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="loanTerm" className="form-label">
                  Loan Term (in months)
                </label>
                <Field
                  type="number"
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
                <label htmlFor="schoolName" className="form-label">
                  School Name
                </label>
                <Field
                  type="text"
                  name="schoolName"
                  className={`form-control text-success ${
                    touched.schoolName && errors.schoolName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="schoolName"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="matricNumber" className="form-label">
                  Matric Number
                </label>
                <Field
                  type="text"
                  name="matricNumber"
                  className={`form-control text-success ${
                    touched.matricNumber && errors.matricNumber
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="matricNumber"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="jambNumber" className="form-label">
                  JAMB Number
                </label>
                <Field
                  type="text"
                  name="jambNumber"
                  className={`form-control text-success ${
                    touched.jambNumber && errors.jambNumber ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="jambNumber"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <Field
                  type="text"
                  name="department"
                  className={`form-control text-success ${
                    touched.department && errors.department ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-danger errormessagey fst-italic"
                />
              </div>

              <div className="text-capitalize text-success">
                <label htmlFor="currentLevel" className="form-label">
                  Current Level
                </label>
                <Field
                  type="text"
                  name="currentLevel"
                  className={`form-control text-success ${
                    touched.currentLevel && errors.currentLevel
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="currentLevel"
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

export default Loantype2;
