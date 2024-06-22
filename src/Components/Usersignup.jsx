import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";
import Loadinicon from './Loadinicon';

const Usersignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    surname: Yup.string().required('Surname is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const handleSubmit = (values) => {
    console.log(values);
    setIsLoading(true); // Show loader
    setTimeout(() => {
      axios.post("http://localhost:8332/loanapp/signup", {
        "firstName": values.firstName,
        "surname": values.surname,
        "lastName": values.lastName,
        "phoneNumber": values.phoneNumber,
        "email": values.email,
        "password": values.password
      })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          console.log(res.data.result);
          navigate("/login");
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
            <h4 className="m-0 text-capitalize text-success text-center">Sign Up Form</h4>
         
              <Formik
                initialValues={{
                  surname: '',
                  firstName: '',
                  lastName: '',
                  phoneNumber: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div>
                      <label htmlFor="surname" className="text-capitalize text-success form-label">Surname</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="surname"
                        name="surname"
                      />
                      <ErrorMessage name="surname" component="div" className=" text-danger errormessagey fst-italic " />
                    </div>
                    <div>
                      <label htmlFor="firstName" className="text-capitalize text-success form-label">First Name</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                      />
                      <ErrorMessage name="firstName" component="div" className=" text-danger errormessagey fst-italic " />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="text-capitalize text-success form-label">Last Name</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                      />
                      <ErrorMessage name="lastName" component="div" className=" text-danger errormessagey fst-italic " />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="text-capitalize text-success form-label">Phone Number</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                      />
                      <ErrorMessage name="phoneNumber" component="div" className=" text-danger errormessagey fst-italic " />
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
              Already have an account?  <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>

)}

      </section>
  
    </>
  );
};

export default Usersignup;
