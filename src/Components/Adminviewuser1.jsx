import React, { useState, useEffect } from "react";
import Adminnav from "./Adminnav";
import logoimg from "../assets/download.png";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingAllUsers,
  fetchingAllUsersSuccessful,
  fetchingAllUsersFailed,
  fetchUpdatedAllUsersdata,
} from "./Redux/alluserdata";
import axios from "axios";

const Adminviewuser1 = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allUsers } = useSelector((state) => state.alluserdata);

  const [userDetails, setUserDetails] = useState(null); // State to hold user details

  useEffect(() => {
    // Find the user details based on the id from allUsers state
    const user = allUsers.find((user) => user._id === id);

    // Update userDetails state with the found user details
    setUserDetails(user);
  }, [id, allUsers]); // Depend on id and allUsers

  const handleDeleteUser = async () => {
    try {
      // Send a delete request to the server
      const res = await axios.delete(
        `https://loan-app-backend-siin.onrender.com/loanapp/deleteUserById/${id}`
      );

      // Dispatch action to refetch all users
      dispatch(fetchUpdatedAllUsersdata());
      console.log(res.data);
      alert(res.data.message);

      dispatch(fetchUpdatedAllUsersdata());
      // Navigate back to the admin backend
      navigate("/adminbackend");
    } catch (error) {
      console.error("Error deleting user:", error);
      dispatch(fetchingAllUsersFailed(error.message));
    }
  };

  return (
    <>
      <Adminnav />
      <h3 className="text-capitalize text-center text-success m-3">
        User Details
      </h3>

      {userDetails ? (
        <div className="card shadow col-10 border-2 border-success mt-4 m-auto bg-success">
          <div className="m-auto">
            <img src={logoimg} alt="" />
          </div>
          <div className="card-body text-light">
            <h5 className="card-title">User Details</h5>
            <p className="card-text text-light text-capitalize">
              <strong>Name:</strong> {userDetails.surname}{" "}
              {userDetails.firstName} {userDetails.lastName}
            </p>
            <p className="card-text text-light">
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p className="card-text text-light">
              <strong>Phone Number:</strong> {userDetails.phoneNumber}
            </p>
            <p className="card-text text-light">
              <strong>Address:</strong> {userDetails.address}
            </p>
            <p className="card-text text-light">
              <strong>Date of Birth:</strong> {userDetails.dateOfBirth}
            </p>
            <p className="card-text text-light">
              <strong>Employment Status:</strong> {userDetails.employmentStatus}
            </p>
            <p className="card-text text-light">
              <strong>Annual Income:</strong> ₦{userDetails.annualIncome}
            </p>
            <p className="card-text text-light">
              <strong>NIN:</strong> {userDetails.nin}
            </p>
            <p className="card-text text-light">
              <strong>BVN:</strong> {userDetails.bvn}
            </p>
            <p className="card-text">
              <small className="text-muted text-success">
                Last updated: {new Date(userDetails.updatedAt).toLocaleString()}
              </small>
            </p>
          </div>

          <button
            title="button will delete user "
            className="btn btn-danger btn-outline-light w-50 m-auto mt-2 mb-2"
            onClick={handleDeleteUser}
          >
            Delete User
          </button>
        </div>
      ) : (
        <div className="text-center text-danger mt-5">
          Loading user details...
        </div>
      )}
    </>
  );
};

export default Adminviewuser1;
