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
  fetchingAdmin,
  fetchingAdminSuccessful,
  fetchingAdminFailed,
} from "./Redux/admindata";
import Loadinicon from "./Loadinicon";




const AdminLoginpage = () => {
  const navigate = useNavigate();

  const {
    isFetchingAdmin,
    admindata,
    isFetchingAdminFailed,
    allUsers,
    isFetchingUsers,
    isFetchingUsersFailed,
  } = useSelector((state) => state.admindata);

  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Data:", values);
    setSubmitting(false);
    dispatch(fetchingAdmin());
    console.log(isFetchingAdmin);

    setTimeout(() => {
      axios
        .post("https://loan-app-backend-siin.onrender.com/loanapp/adminLogin", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data);
          dispatch(fetchingAdminSuccessful(res.data.admin));



          alert(res.data.message);

          console.log(res.data.admin);

          navigate("/adminbackend");

          console.log("isFetchingAdmin");
          console.log(isFetchingAdmin);
        })
        .catch((err) => {
          console.log(err);
          dispatch(fetchingAdminFailed(err.message));
          console.log(isFetchingAdminFailed);
          console.log(err.message);
          console.log(err);
          alert(err.response.data.message);
        });
    }, 500);
  };

  return (
    <>
      {isFetchingAdmin && <Loadinicon />}

      <section className="holderforlogin">
        <div className="col-8 m-auto holderforthetwo d-flex justify-content-evenly align-items-center">
          <div className="col-6 holdingimgandformforloginandsignin holdingimgandformforloginandsigninimg1"></div>
          <div className="col-6 holdingimgandformforloginandsignin p-5">
            <h4 className="m-0 text-capitalize text-success text-center">
              Admin Login Form
            </h4>
            {/* Formik form with validation */}
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <label
                      htmlFor="username"
                      className="text-capitalize text-success form-label"
                    >
                      username
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
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
              Don't have an account?{" "}
              <Link to="/adminsignuppage">Sign up here</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLoginpage;
