import React from 'react'

import logoimg from "../assets/download.png";
import Userwithlogin from './Userwithlogin';

const Logedinuseraboutus = () => {
  return (
    <>
    <Userwithlogin/>
    <section>
    <h3 className=' text-capitalize  mt-4 mb-3 text-center text-success'>
   about us
 
   </h3>
 <div className='logoholder d-flex justify-content-center align-items-center m-auto mt-2 mb-2'>
   <img src={logoimg} alt="" />
 </div>
 <div className='col-8 m-auto text-center '>
   <h3 className=' text-capitalize text-center text-success'>
   <span className=" text-capitalize fw-bold">joy loan</span>
 
   </h3>
   
 <p>"At <span className=" text-capitalize fw-bold">joy loan</span>, we understand the importance of financial flexibility and accessibility. Founded with a vision to empower individuals with seamless borrowing experiences, we've dedicated ourselves to providing innovative solutions that simplify the lending process.</p>
 
 <p>With a team of experts committed to customer satisfaction, we strive to offer transparent, reliable, and user-friendly services to meet the diverse needs of our clients. Whether you're in need of a personal loan for unexpected expenses, an auto loan to drive your dreams, or a student loan to invest in your future, we're here to guide you every step of the way.</p>
 
 <p>Our mission is simple: to make borrowing easier, faster, and more convenient than ever before. By leveraging cutting-edge technology and industry expertise, we aim to redefine the lending landscape and set new standards of excellence.</p>
 
 <p>Join us on this journey towards financial empowerment. Experience the difference with <span className=" text-capitalize fw-bold">joy loan</span> today."</p>
 </div>
 
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
 
 
    </section>
    </>
  )
}

export default Logedinuseraboutus