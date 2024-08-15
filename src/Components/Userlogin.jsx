import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  featchinguser,
  featchinguserSuccessful,
  featchinguserfailed,
} from "./Redux/userdata";
import Loadinicon from "./Loadinicon";

const Userlogin = () => {
  const navigate = useNavigate();

  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Data:", values);
    setSubmitting(false);
    dispatch(featchinguser());
    console.log(isFetchinguser);

    setTimeout(() => {
      axios
        .post("https://loan-app-backend-siin.onrender.com/loanapp/login", {
          emailorphonernumber: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data);
          dispatch(featchinguserSuccessful(res.data.user));

          alert(res.data.message);

          console.log(res.data.user);

          navigate("/home");

          console.log("isFetchinguser");
          console.log(isFetchinguser);
        })
        .catch((err) => {
          console.log(err);
          dispatch(featchinguserfailed(err.message));
          console.log(isFeatchinguserfailed);
          console.log(err.message);
          console.log(err);
          alert(err.response.data.message);
        });
    }, 500);
  };

  return (
    <>
      {isFetchinguser && <Loadinicon />}

      <section className="holderforlogin">
        <div className="col-8 m-auto holderforthetwo d-flex justify-content-evenly align-items-center">
          <div className="col-6 holdingimgandformforloginandsignin holdingimgandformforloginandsigninimg1"></div>
          <div className="col-6 holdingimgandformforloginandsignin p-5">
            <h4 className="m-0 text-capitalize text-success text-center">
              Login Form
            </h4>
            {/* Formik form with validation */}
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-capitalize text-success form-label"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-capitalize text-success form-label"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button type="submit" className="btn btn-success mt-3">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            <p className="m-0 text-capitalize text-center text-success">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Userlogin;
