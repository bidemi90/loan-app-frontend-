import React, { useState } from "react";
import Userwithlogin from "./Userwithlogin";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedUserData } from "./Redux/userdata"; // Import the new thunk action
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loadinicon from "./Loadinicon";

const Useraddninbvn = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Use useSelector to get the current user data from the Redux store
  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

  const dispatch = useDispatch(); // Use useDispatch to dispatch actions
  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  // Validation schema for the NIN form using Yup
  const validationSchema = Yup.object().shape({
    nin: Yup.string()
      .length(11, "NIN must be exactly 11 digits")
      .required("NIN is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    setIsLoading(true); // Set loading state to true

    try {
      const res = await axios.post("https://loan-app-backend-siin.onrender.com/loanapp/addnin", {
        emailorphonernumber: userdata.email,
        nin: values.nin,
      });

      console.log(res.data);
      alert(res.data.message);

      // Fetch updated user data after successful update
      dispatch(fetchUpdatedUserData(userdata.email));

      console.log(res.data.user);
      navigate("/home"); // Navigate to the home page
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
        <h3 className="text-capitalize text-center text-success">Add NIN Form</h3>
        <Formik
          initialValues={{ nin: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group mt-3">
                <label htmlFor="nin">Enter NIN</label>
                <Field
                  type="text"
                  name="nin"
                  className={`form-control text-success ${
                    touched.nin && errors.nin ? "is-invalid" : ""
                  }`}
                  placeholder="Enter NIN"
                />
                <ErrorMessage
                  name="nin"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="text-capitalize text-center">
                <button
                  type="submit"
                  className="btn btn-success mt-2 float-right"
                >
                   {isLoading ? <Loadinicon /> : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Useraddninbvn;
