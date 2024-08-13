import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import landingimg1 from "../assets/9045616.jpg";
import landingimg2 from "../assets/6425322.jpg";
import landingimg3 from "../assets/6425319.jpg";
import landingimg4 from "../assets/6498.jpg";
import landingimg5 from "../assets/9889615.jpg";
import landingimg6 from "../assets/9957745.jpg";
import Userwithlogin from "./Userwithlogin";
import { Link } from "react-router-dom";
import profileimg from "../assets/profileimg.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  featchinguser,
  featchinguserSuccessful,
  featchinguserfailed,
} from "./Redux/userdata";
import {
  fetchingonePersonalLoanRequests,
  fetchingonePersonalLoanRequestsSuccessful,
  fetchingonePersonalLoanRequestsFailed,
  fetchUpdatedonePersonalLoanRequests,
} from "./Redux/onepersonalloanrequest";
import {
  fetchingonestudentLoanRequests,
  fetchingonestudentLoanRequestsSuccessful,
  fetchingonestudentLoanRequestsFailed,
  fetchUpdatedonestudentLoanRequests,
} from "./Redux/onestudentloanrequest";
import {
  fetchingoneautoLoanRequests,
  fetchingoneautoLoanRequestsSuccessful,
  fetchingoneautoLoanRequestsFailed,
  fetchUpdatedoneautoLoanRequests,
} from "./Redux/oneautoloanrequest";

const Userpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

  const {
    isFetchingonePersonalLoanRequests,
    onePersonalLoanRequests,
    isFetchingonePersonalLoanRequestsFailed,
  } = useSelector((state) => state.onepersonalloanrequest);

  const {
    isFetchingonestudentLoanRequests,
    onestudentLoanRequests,
    isFetchingonestudentLoanRequestsFailed,
  } = useSelector((state) => state.onestudentloanrequest);

  const {
    isFetchingoneautoLoanRequests,
    oneautoLoanRequests,
    isFetchingoneautoLoanRequestsFailed,
  } = useSelector((state) => state.oneautoloanrequest);

  const [onepersonalLoanRequests, setonepersonalLoanRequests] = useState([]);
  const [oneStudentLoanRequests, setoneStudentLoanRequests] = useState([]);
  const [oneAutoLoanRequests, setoneAutoLoanRequests] = useState([]);

  useEffect(() => {
    // Fetch personal loan requests
    dispatch(fetchUpdatedonePersonalLoanRequests(userdata._id));
    dispatch(fetchUpdatedonestudentLoanRequests(userdata._id));
    dispatch(fetchUpdatedoneautoLoanRequests(userdata._id));
  }, [dispatch, userdata._id]);

  // Update state variables when Redux data changes
  useEffect(() => {
    if (!isFetchingonePersonalLoanRequests && !isFetchingonePersonalLoanRequestsFailed) {
      setonepersonalLoanRequests(onePersonalLoanRequests);
    }
  }, [
    isFetchingonePersonalLoanRequests,
    isFetchingonePersonalLoanRequestsFailed,
    onePersonalLoanRequests,
  ]);

  useEffect(() => {
    if (!isFetchingonestudentLoanRequests && !isFetchingonestudentLoanRequestsFailed) {
      setoneStudentLoanRequests(onestudentLoanRequests);
    }
  }, [
    isFetchingonestudentLoanRequests,
    isFetchingonestudentLoanRequestsFailed,
    onestudentLoanRequests,
  ]);

  useEffect(() => {
    if (!isFetchingoneautoLoanRequests && !isFetchingoneautoLoanRequestsFailed) {
      setoneAutoLoanRequests(oneautoLoanRequests);
    }
  }, [
    isFetchingoneautoLoanRequests,
    isFetchingoneautoLoanRequestsFailed,
    oneautoLoanRequests,
  ]);

  return (
    <>
      <Userwithlogin />

      {/* User Profile Card */}
      <div className="card mb-3 userhomeprofile border-2 border-success mt-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={profileimg}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body d-md-flex justify-content-evenly align-items-start">
              <div className="col-md-6 col-12">
                {userdata && (
                  <>
                    <h5 className="text-capitalize text-success card-title">
                      name: {userdata.firstName} {userdata.lastName}{" "}
                      {userdata.surname}
                    </h5>
                    <p className="text-capitalize text-success card-text">
                      phone number: {userdata.phoneNumber}
                    </p>
                    <p className="text-capitalize text-success card-text">
                      email: {userdata.email}
                    </p>
                  </>
                )}
                <p className="text-capitalize text-success card-text">
                  <small className="text-body-secondary">
                    Last updated{" "}
                    {userdata
                      ? new Date(userdata.updatedAt).toLocaleString()
                      : ""}
                  </small>
                </p>
              </div>
              <div className="col-md-6 col-12 d-flex justify-content-between align-items-center">
                <small className="text-capitalize text-success m-0">
                  to check your profile verification
                </small>
                <Link
                  to="/profilepage"
                  className="btn btn-success text-capitalize fs-6"
                >
                  check profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

         {/* Add Carousel */}
         <section className="caroselspace">
        <div
          id="carouselExampleInterval"
          className="carousel slide h-100 "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner h-100 ">
            <div
              className="carousel-item h-100 active"
              data-bs-interval="10000"
            >
              <div className=" position-relative holdingtextandimgforcarocell backgroundimgforcarocell1 ">
                <h1 className="textincarocell ">
                  Simplify Your Financial Journey <br /> with Us.
                </h1>
              </div>
            </div>
            <div className="carousel-item h-100 " data-bs-interval="2000">
              <div className=" position-relative holdingtextandimgforcarocell backgroundimgforcarocell2 ">
                <h1 className="textincarocell">
                  Empowering You with Easy <br /> Access to Loans.
                </h1>
              </div>
            </div>
            <div className="carousel-item h-100">
              <div className=" position-relative holdingtextandimgforcarocell backgroundimgforcarocell3 ">
                <h1 className="textincarocell">
                  Transforming Borrowing into <br /> a Breeze.
                </h1>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* No Loan History Card */}
      <p className=" text-success text-capitalize text-center fs-2 mt-5">
        loan request
      </p>
      <section className=" bg-success shadow border-2 col-10 m-auto mt-2 mb-3 card overflow-hidden border-success ">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          {/* one Personal Loan Requests */}
          <div className="accordion-item">
            <h2 className="accordion-header text-capitalize text-success">
              <button
                className="accordion-button text-capitalize bg-success collapsed text-light fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Personal Loan Requests
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body p-2">
                <div className="table-responsive-md">
                  <table className="table table-success">
                    <thead>
                      <tr>
                        <th className="bg-success text-light" scope="col">
                          NO.
                        </th>
                        <th className="bg-success text-light" scope="col">
                          Loan Amount
                        </th>
                        <th className="bg-success text-light" scope="col">
                          Loan Term
                        </th>
                        <th className="bg-success text-light" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {onePersonalLoanRequests.map((request, index) => (
                        <tr key={index}>
                          <td className="bg-success text-light" scope="row">
                            {index + 1}.
                          </td>
                          <td>₦{request.loanAmount}</td>
                          <td>{request.loanTerm / 30} months</td>
                          <td>
                            <Link
                              to={`/loanrequset1/${request._id}`}
                              className={`btn text-light ${
                                request.status === "processing"
                                  ? "btn-success"
                                  : request.status === "terminated"
                                  ? "btn-danger"
                                  : request.status === "successful"
                                  ? "btn-primary"
                                  : ""
                              }`}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}

                      {onePersonalLoanRequests.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No loan requests
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header text-capitalize text-success">
              <button
                class=" accordion-button text-capitalize bg-success collapsed  text-light fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                student loan request
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body p-2">
                <div class="table-responsive-md">
                  <table class="table table-success">
                    <thead>
                      <tr>
                        <th class="bg-success text-light" scope="col">
                          NO.
                        </th>
                        <th class="bg-success text-light" scope="col">
                          Loan Amount
                        </th>
                        <th class="bg-success text-light" scope="col">
                          Loan Term
                        </th>
                        <th class="bg-success text-light" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {oneStudentLoanRequests.map((request, index) => (
                        <tr key={index}>
                          <td class="bg-success text-light" scope="row">
                            {index + 1}.
                          </td>
                          <td>₦{request.loanAmount}</td>
                          <td>{request.loanTerm / 30} months</td>
                          <td>
                            <Link
                              to={`/loanrequset2/${request._id}`}
                              className={`btn text-light ${
                                request.status === "processing"
                                  ? "btn-success"
                                  : request.status === "terminated"
                                  ? "btn-danger"
                                  : request.status === "successful"
                                  ? "btn-primary"
                                  : ""
                              }`}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}

                      {oneStudentLoanRequests.length === 0 && (
                        <tr>
                          <td colSpan="4" class="text-center">
                            No loan requests
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header text-capitalize text-success">
              <button
                class=" accordion-button text-capitalize bg-success collapsed  text-light fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                auto loan request
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body p-2">
                <div class="table-responsive-md">
                  <table class="table table-success">
                    <thead>
                      <tr>
                        <th class="bg-success text-light" scope="col">
                          NO.
                        </th>
                        <th class="bg-success text-light" scope="col">
                          Loan Amount
                        </th>
                        <th class="bg-success text-light" scope="col">
                          Loan Term
                        </th>
                        <th class="bg-success text-light" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {oneAutoLoanRequests.map((request, index) => (
                        <tr key={index}>
                          <td class="bg-success text-light" scope="row">
                            {index + 1}.
                          </td>
                          <td>₦{request.loanAmount}</td>
                          <td>{request.loanTerm / 30} months</td>
                          <td>
                            <Link
                              to={`/loanrequset3/${request._id}`}
                              className={`btn text-light ${
                                request.status === "processing"
                                  ? "btn-success"
                                  : request.status === "terminated"
                                  ? "btn-danger"
                                  : request.status === "successful"
                                  ? "btn-primary"
                                  : ""
                              }`}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}

                      {oneAutoLoanRequests.length === 0 && (
                        <tr>
                          <td colSpan="4" class="text-center">
                            No loan requests
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   


      {/* apply for loan  */}
      <h2 className=" text-success text-capitalize text-center">
        loan type
      </h2>
      <section className=" d-flex flex-column flex-lg-row m-5 justify-content-evenly  mt-5 mb-5 pt-5">
        <div className="card  cardforloantype col-lg-3 my-3 ">
          <img className="card-img-top" src={landingimg2} alt="Title" />
          <div className="card-body bg-success text-light">
            <h3 className="card-title text-capitalize ">personal loan</h3>
            <p className="card-text text-light">
              With our personal loans, you can finance your dreams without
              compromise.
            </p>
            
            <Link to="/loantype1" className=" text-capitalize btn btn-light text-success m-0">
              apply
            </Link>
          </div>
        </div>
        <div className="card  cardforloantype col-lg-3 my-3">
          <img className="card-img-top" src={landingimg4} alt="Title" />
          <div className="card-body bg-success text-light">
            <h3 className="card-title text-capitalize ">student loan</h3>
            <p className="card-text text-light">
              Invest in your future with our student loans designed to support
              your educational journey.
            </p>
            <Link to="/loantype2" className=" text-capitalize btn btn-light text-success m-0">
              apply
            </Link>
          </div>
        </div>
        <div className="card  cardforloantype col-lg-3 my-3">
          <img className="card-img-top" src={landingimg3} alt="Title" />
          <div className="card-body bg-success text-light">
            <h3 className="card-title text-capitalize ">Auto Loan</h3>
            <p className="card-text text-light">
              Ready to hit the road in style? Our auto loans make it easier than
              ever to drive away in your dream car.
            </p>
            <Link to="/loantype3" className=" text-capitalize btn btn-light text-success m-0">
              apply
            </Link>
          </div>
        </div>
      </section>


      <footer className="bg-success d-flex justify-content-evenly flex-column flex-lg-row text-center " style={{  color: 'white', padding: '20px' }}>
      <div className=" text-light">
        <h3>Contact Us</h3>
        <p className=" text-light">123 Main Street, City, Country</p>
        <p className=" text-light">Email: info@example.com</p>
        <p className=" text-light">Phone: +1234567890</p>
      </div>
      <div>
        <h3>Useful Links</h3>
        <ul>
          <li><a className=" text-light" href="/">Home</a></li>
          <li><a className=" text-light" href="/about">About Us</a></li>
          <li><a className=" text-light" href="/services">Services</a></li>
          <li><a className=" text-light" href="/contact">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h3>Follow Us</h3>
        <ul>
          <li><a className=" text-light" href="https://facebook.com">Facebook</a></li>
          <li><a className=" text-light" href="https://twitter.com">Twitter</a></li>
          <li><a className=" text-light" href="https://instagram.com">Instagram</a></li>
        </ul>
      </div>
    </footer>
    </>
  );
};

export default Userpage;
