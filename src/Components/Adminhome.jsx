import React, { useState, useEffect } from "react";
import logoimg from "../assets/download.png";
import Adminnav from "./Adminnav";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingAdmin,
  fetchingAdminSuccessful,
  fetchingAdminFailed,
} from "./Redux/admindata";
import {
  fetchingAllUsers,
  fetchingAllUsersFailed,
  fetchingAllUsersSuccessful,
  fetchUpdatedAllUsersdata,
} from "./Redux/alluserdata";
import axios from "axios";
import { Link } from "react-router-dom";
import Loadinicon from "./Loadinicon";

const Adminhome = () => {
  const { isFetchingAdmin, admindata, isFetchingAdminFailed } = useSelector(
    (state) => state.admindata
  );
  const { allUsers, isFetchingAllUsers, isFetchingAllUsersFailed } =
    useSelector((state) => state.alluserdata);

  const dispatch = useDispatch();
  const [allUserData, setAllUserData] = useState(null);

  useEffect(() => {

    dispatch(fetchUpdatedAllUsersdata());
    setAllUserData(allUsers);
    const fetchAllUsersData = async () => {
      dispatch(fetchingAllUsers());
      try {
        const response = await axios.get(
          "https://loan-app-backend-siin.onrender.com/loanapp/admingetAllUsers"
        );

        console.log(response.data);
        console.log(response.data.data);
        dispatch(fetchingAllUsersSuccessful(response.data.data));
        if (response.data && response.data.data) {
          setAllUserData(response.data.data);
        }
      } catch (error) {
        dispatch(fetchingAllUsersFailed(error.message));
      }
    };
    fetchAllUsersData();
  }, [dispatch]);

  return (
    <>
      <Adminnav />
      {admindata && (
        <div className="card mb-3 col-10 mt-3 m-auto  border-1 border-success  shadow ">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={logoimg}
                className="img-fluid rounded-start"
                alt="Admin Logo"
              />
            </div>
            <div className="col-md-8 bg-success text-light">
              <div className="card-body">
                <h5 className="card-title text-center">Admin Details</h5>
                <>
                  <p className="card-text text-light m-2">
                    <strong>Username: </strong>
                    {admindata.username}
                  </p>
                  <p className="card-text text-light m-2">
                    <strong>Email: </strong>
                    {admindata.email}
                  </p>
                </>
              </div>
            </div>
          </div>
        </div>
      )}

      <section>
        <p className=" text-capitalize text-center text-success fs-4">
          All Users
        </p>

        <section>
          <div className="table-responsive col-10 mt-2 m-auto bg-success">
            <table className="table table-primary ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="bg-success text-capitalize text-light text-center "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="bg-success text-capitalize text-light text-center "
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="bg-success text-capitalize text-light text-center "
                  ></th>
                </tr>
              </thead>

              {isFetchingAllUsers ? (
                <Loadinicon />
              ) : (
                <tbody>
                  {allUserData && allUserData.length > 0 ? (
                    allUserData.map((user) => (
                      <tr key={user._id} className="">
                        <td scope="row">
                          <p className="text-capitalize text-center text-success m-1">
                            {user.surname} {user.firstName} {user.lastName}
                          </p>
                        </td>
                        <td>
                          <p className="text-capitalize text-center text-success m-1">
                            {user.email}
                          </p>
                        </td>
                        <td>
                          <Link
                            to={`/viewoneuser/${user._id}`} // Assuming user.id holds the user's ID
                            className="btn text-light btn-success text-capitalize text-center m-1"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-danger">
                        No user available
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </section>

        {isFetchingAllUsersFailed && (
          <div className="d-flex justify-content-center">
            <p className="text-danger">{isFetchingAllUsersFailed}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Adminhome;
