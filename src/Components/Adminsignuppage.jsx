import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";
import Loadinicon from './Loadinicon';

const Adminsignuppage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    setIsLoading(true); // Show loader
    setTimeout(() => {
      axios.post("http://localhost:8332/loanapp/adminSignup", {
        "username": values.username,
        "email": values.email,
        "password": values.password,
      })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          console.log(res.data.result);
          navigate("/adminLoginpage");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false); // Hide loader
        });
    }, 5000);
  };

  return (
    <>
      <section className="holderforsignup">

      {isLoading ? (
              <Loadinicon /> // Show the loader if isLoading is true
            ) : (

        <div className="col-10 m-auto holderforthetwo d-flex justify-content-evenly align-items-center">
          <div className="col-6 holdingimgandformforloginandsignin holdingimgandformforloginandsigninimg"></div>
          <div className="col-6 holdingimgandformforloginandsignin p-5">
            <h4 className="m-0 text-capitalize text-success text-center">Admin Sign Up Form</h4>
         
              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  role: 'loanadmin' // default role
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div>
                      <label htmlFor="username" className="text-capitalize text-success form-label">Username</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                      />
                      <ErrorMessage name="username" component="div" className=" text-danger errormessagey fst-italic " />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-capitalize text-success form-label">Email</label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                      />
                      <ErrorMessage name="email" component="div" className=" text-danger errormessagey fst-italic " />
                    </div>
                    <div>
                      <label htmlFor="password" className="text-capitalize text-success form-label">Password</label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                      />
                      <ErrorMessage name="password" component="div" className=" text-danger errormessagey fst-italic " />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="text-capitalize text-success form-label">Confirm Password</label>
                      <Field
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className=" text-danger errormessagey fst-italic " />
                    </div>
                    <button type="submit" className="btn btn-success mt-3">Submit</button>
                  </Form>
                )}
              </Formik>
          
            <p className="m-0 text-capitalize text-center text-success">
              Already have an account?  <Link to="/adminLoginpage">Login here</Link>
            </p>
          </div>
        </div>

)}

      </section>
  
    </>
  );
};

export default Adminsignuppage;
