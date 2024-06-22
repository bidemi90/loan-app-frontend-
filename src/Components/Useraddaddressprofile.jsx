import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import ErrorMessage from Formik
import * as Yup from "yup";
import Userwithlogin from "./Userwithlogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedUserData } from "./Redux/userdata"; // Import the new thunk action
import Loadinicon from "./Loadinicon";

const Useraddaddress = () => {

  const [isLoading, setIsLoading] = useState(false);
  // Use useSelector to get the current user data from the Redux store
  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

  const dispatch = useDispatch(); // Use useDispatch to dispatch actions
  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    employmentStatus: Yup.string().required("Employment status is required"),
    annualIncome: Yup.number().required("Annual income is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log(values);
    setIsLoading(true); // Set loading state to true
    try {
      const res = await axios.post("http://localhost:8332/loanapp/updateUserDetails", {
        emailorphonernumber: userdata.email,
        address: values.address,
        dateOfBirth: values.dateOfBirth,
        employmentStatus: values.employmentStatus,
        annualIncome: values.annualIncome,
      });

      console.log(res.data);
      alert(res.data.message);

      // Fetch updated user data after successful update
      dispatch(fetchUpdatedUserData(userdata.email));

      // Navigate to the home page
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "An error occurred");
    }finally {
      setIsLoading(false); // Set loading state to false
    }
  };
  
  return (
    <>
      <Userwithlogin /> {/* Render the Userwithlogin component */}
      <div className="col-md-6 col-10 m-auto card mt-5 border-2 border-success profileholderbox text-success p-4">
        <h3 className="text-capitalize text-center text-success">Profile Form</h3>

        {/* Formik wrapper */}
        <Formik
          initialValues={{ address: "", dateOfBirth: "", employmentStatus: "", annualIncome: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {/* Formik form */}
          <Form>
            <div className="form-group mt-3">
              <label htmlFor="address">Address</label>
              <Field
                type="text"
                name="address"
                className="form-control text-success"
                placeholder="Enter address"
              />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Field
                type="date"
                name="dateOfBirth"
                className="form-control text-success"
                placeholder="Date of birth"
              />
              <ErrorMessage name="dateOfBirth" component="div" className="text-danger" />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="employmentStatus">Employment Status</label>
              <Field
                as="select"
                name="employmentStatus"
                className="form-control text-success"
                placeholder="Employment Status"
              >
                <option value="">Select Employment Status</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Employed">Employed</option>
                <option value="Self Employed">Self Employed</option>
                <option value="Student">Student</option>
              </Field>
              <ErrorMessage name="employmentStatus" component="div" className="text-danger" />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="annualIncome">Annual Income</label>
              <Field
                type="number"
                name="annualIncome"
                className="form-control text-success"
                placeholder="Enter annual Income"
              />
              <ErrorMessage name="annualIncome" component="div" className="text-danger" />
            </div>

            <div className="text-capitalize text-center">
              <button type="submit" className="btn btn-success mt-2 float-right">
              {isLoading ? <Loadinicon /> : "Submit"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Useraddaddress;
