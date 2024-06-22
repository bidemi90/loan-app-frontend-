import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { BsCartPlusFill } from "react-icons/bs";
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import { Modal } from "react-bootstrap";

import carouselimg1 from "./assets/t-shirts-mockup-with-text-space-on-colrful-background-hd-ai-free-photo.jpg";
import carouselimg2 from "./assets/much-clothes-conceptual-illustration-ai-generated_768802-4079-transformed.jpeg";
import carouselimg3 from "./assets/woman-white-coat-with-handbag-walking-city_449849-383.jpg";
import Userhome from "./Components/Userhome";
import Userlogin from "./Components/Userlogin";
import Usersignup from "./Components/Usersignup";
import Usercontactus from "./Components/Usercontactus";
import Useraboutus from "./Components/Useraboutus";
import Userpage from "./Components/Userpage";
import Logedinuseraboutuspage from "./Components/Logedinuseraboutuspage";
import Logedinuseraboutus from "./Components/Logedinuseraboutus";
import Test from "./Components/Test";
import Usereditprofilepage from "./Components/Usereditprofilepage";
import Useraddaddressprofile from "./Components/Useraddaddressprofile";
import Useraddninbvn from "./Components/Useraddninbvn";
import Useaddbvn from "./Components/Useaddbvn";
import Loantype1 from "./Components/Loantype1";
import Loantype2 from "./Components/Loantype2";
import Loantype3 from "./Components/Loantype3";
import Adminhome from "./Components/Adminhome";
import Adminviewuser1 from "./Components/Adminviewuser1";
import Adminsignuppage from "./Components/Adminsignuppage";
import AdminLoginpage from "./Components/AdminLoginpage";
import Userviewloanrequset1 from "./Components/Userviewloanrequset1";
import Userviewloanrequset2 from "./Components/Userviewloanrequest2";
import Userviewloanrequset from "./Components/Userviewloanrequest";
import Adminviewloanrequest from "./Components/Adminviewloanrequest";
import Adminverifyloanrequest from "./Components/Adminverifyloanrequest";
import Adminverifyloanrequest2 from "./Components/Adminverifyloanrequest2";
import Adminverifyloanrequest3 from "./Components/Adminverifyloanrequest3";
import Useroutstadingloan from "./Components/Useroutstadingloan";
import Adminoutstandingloan from "./Components/Adminoutstandingloan";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Routes>
          {/* <Route path="home" element={<Userhome />}></Route> */}
          <Route path="" element={<Userhome />}></Route>
          <Route path="/login" element={<Userlogin />}></Route>
          <Route path="/signup" element={<Usersignup />}></Route>
          <Route path="/contactus" element={<Usercontactus />}></Route>
          <Route path="/aboutus" element={<Useraboutus />}></Route>
          <Route path="/home" element={<Userpage />}></Route>
          <Route path="/contact" element={<Logedinuseraboutuspage />}></Route>
          <Route path="/about" element={<Logedinuseraboutus />}></Route>
          <Route path="/profilepage" element={<Usereditprofilepage />}></Route>
          <Route path="/addaddresspage" element={<Useraddaddressprofile />}></Route>
          <Route path="/addninninpage" element={<Useraddninbvn />}></Route>
          <Route path="/addninbvnpage" element={<Useaddbvn />}></Route>
          <Route path="/loantype1" element={<Loantype1 />}></Route>
          <Route path="/loantype2" element={<Loantype2 />}></Route>
          <Route path="/loantype3" element={<Loantype3 />}></Route>
          <Route path="/loanrequset1/:id" element={<Userviewloanrequset1 />}></Route>
          <Route path="/loanrequset2/:id" element={<Userviewloanrequset2 />}></Route>
          <Route path="/loanrequset3/:id" element={<Userviewloanrequset />}></Route>
          <Route path="/Outstandingloan" element={<Useroutstadingloan />}></Route>



          {/* admin Routes */}
          <Route path="/adminbackend" element={<Adminhome />}></Route>
          <Route path="/viewoneuser/:id" element={<Adminviewuser1 />} ></Route>
          <Route path="/adminsignuppage" element={<Adminsignuppage />}></Route>
          <Route path="/adminLoginpage" element={<AdminLoginpage />}></Route>
          <Route path="/viewloanrequest" element={<Adminviewloanrequest />}></Route>
          <Route path="/verifyloanrequest/:id" element={<Adminverifyloanrequest />}></Route>
          <Route path="/verifyloanrequest2/:id" element={<Adminverifyloanrequest2 />}></Route>
          <Route path="/verifyloanrequest3/:id" element={<Adminverifyloanrequest3 />}></Route>
          <Route path="/adminoutstandingloan" element={<Adminoutstandingloan />}></Route>




          <Route path="/test" element={<Test />}></Route>
        </Routes>
    </>
  );
}

export default App;
