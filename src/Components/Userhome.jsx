import React from "react";
import viteLogo from "/vite.svg";
import "../App.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { BsCartPlusFill } from "react-icons/bs";
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import landingimg1 from "../assets/9045616.jpg";
import landingimg2 from "../assets/6425322.jpg";
import landingimg3 from "../assets/6425319.jpg";
import landingimg4 from "../assets/6498.jpg";
import landingimg5 from "../assets/9889615.jpg";
import landingimg6 from "../assets/9957745.jpg";
import carouselimg1 from "../assets/t-shirts-mockup-with-text-space-on-colrful-background-hd-ai-free-photo.jpg";
import carouselimg2 from "../assets/much-clothes-conceptual-illustration-ai-generated_768802-4079-transformed.jpeg";
import carouselimg3 from "../assets/woman-white-coat-with-handbag-walking-city_449849-383.jpg";
import Userwithoulog from "./Userwithoulog";

const Userhome = () => {
  return (
    <>

<Userwithoulog/>



      <div className="landingpage1 w-100 d-flex flex-column text-center text-lg-start justify-content-center align-items-center  flex-lg-row d-lg-flex justify-content-lg-evenly  align-items-lg-center">
        <div className="landingpage1divforimg m-2 p-3">
          <img className=" w-100" src={landingimg1} alt="" />
        </div>
        <div>
          <h1 className=" text-capitalize text-left landingtext1 ">
            Get the Funds <br /> You Need, When You <br /> Need Them.
          </h1>
        </div>
      </div>

      
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
            <Link to="/login" className=" text-capitalize btn btn-light text-success m-0">
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
            <Link to="/login" className=" text-capitalize btn btn-light text-success m-0">
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
            <Link to="/login" className=" text-capitalize btn btn-light text-success m-0">
              apply
            </Link>
          </div>
        </div>
      </section>

      <section className=" bg-success-subtle pt-3 pb-3">
        <div className=" holdershowcase1 w-100 bg-success-subtle mb-5 d-flex flex-column flex-lg-row justify-content-center align-items-center text-center text-lg-start d-lg-flex justify-content-lg-evenly  align-items-lg-center">
          <div className="col-lg-6 col-10  ">
            <img className=" imgforshowcase1" src={landingimg5} alt="" />
          </div>
          <div className=" col-lg-5 col-10  p-4">
            <h3 className=" text-success text-capitalize">
              How fast we deliver without stress
            </h3>
            <p>
              Experience lightning-fast loan approvals without the hassle. Our
              advanced algorithms ensure swift processing, so you get the funds
              you need when you need them, without unnecessary delays or
              complications. Say goodbye to waiting endlessly for loan decisions
              and hello to instant peace of mind.
            </p>
          </div>
        </div>

        <div className="  holdershowcase1 w-100 bg-success-subtle mb-5 d-flex flex-column flex-lg-row-reverse justify-content-center align-items-center text-center text-lg-start d-lg-flex justify-content-lg-evenly align-items-lg-center ">
          <div className="col-lg-6 col-10  ">
            <img className=" imgforshowcase1" src={landingimg1} alt="" />
          </div>
          <div className=" col-lg-5 col-10  p-4">
            <h3 className=" text-success text-capitalize">How easy to apply</h3>
            <p>
              Applying for a loan has never been simpler. With our user-friendly
              interface, you can complete the entire process from the comfort of
              your home or on the go. Just a few clicks, minimal paperwork, and
              you're done! No more tedious forms or confusing steps. We've
              streamlined the process to make borrowing effortless, so you can
              focus on what matters most.
            </p>
          </div>
        </div>

        <div className="  holdershowcase1 w-100 bg-success-subtle mb-5 d-flex flex-column flex-lg-row justify-content-center align-items-center text-center text-lg-start d-lg-flex justify-content-lg-evenly align-items-lg-center">
          <div className="col-lg-6 col-10  ">
            <img className=" imgforshowcase1" src={landingimg6} alt="" />
          </div>
          <div className=" col-lg-5 col-10  p-4">
            <h3 className=" text-success text-capitalize">Why choose us</h3>
            <p>
              Choosing <span className=" text-capitalize fw-bold">joy loan</span> means choosing reliability,
              transparency, and unmatched convenience. Our commitment to
              customer satisfaction drives every aspect of our service, ensuring
              that you receive the support you deserve every step of the way.
              Join thousands of satisfied customers who trust us for their
              financial needs and experience the difference today.
            </p>
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

export default Userhome;
