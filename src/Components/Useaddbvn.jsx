import React, { useState } from "react";
import Userwithlogin from './Userwithlogin';
import { useDispatch, useSelector } from 'react-redux';
import { featchinguser, featchinguserSuccessful, featchinguserfailed } from './Redux/userdata';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchUpdatedUserData } from './Redux/userdata'; // Import the new thunk action
import Loadinicon from "./Loadinicon";


const Useaddbvn = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector((state) => state.userdata);
  const dispatch = useDispatch(); // Use useDispatch to dispatch actions
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    bvn: Yup.string()
      .length(11, 'BVN must be exactly 11 digits')
      .required('BVN is required'),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true); // Set loading state to true

    try {
      // Make API call to add BVN
      const res = await axios.post('https://loan-app-backend-siin.onrender.com/loanapp/addbvn', {
        emailorphonernumber: userdata.email,
        bvn: values.bvn,
      });

      console.log(res.data);
      alert(res.data.message);

      // Fetch updated user data after adding BVN
      dispatch(fetchUpdatedUserData(userdata.email));

      // Navigate to home page
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'An error occurred');
    }finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      <Userwithlogin />
      <div className="col-md-6 col-10 m-auto card mt-5 border-2 border-success profileholderbox text-success p-4">
        <h3 className="text-capitalize text-center text-success">Add BVN Form</h3>
        <Formik
          initialValues={{ bvn: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group mt-3">
                <label htmlFor="bvn">Enter BVN</label>
                <Field
                  type="text"
                  name="bvn"
                  className={`form-control text-success ${touched.bvn && errors.bvn ? 'is-invalid' : ''}`}
                  placeholder="Enter BVN"
                />
                <ErrorMessage
                  name="bvn"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="text-capitalize text-center">
                <button type="submit" className="btn btn-success mt-2 float-right">
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

export default Useaddbvn;
