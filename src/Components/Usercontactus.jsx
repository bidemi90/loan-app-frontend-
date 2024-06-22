import React from 'react'
import Userwithoulog from './Userwithoulog'

const Usercontactus = () => {
  return (
   <>
   <Userwithoulog/>
   
   <section className=" contactus">
  <h3 className=' text-capitalize text-center text-success  mt-3 mb-3'>
  contact us 
  </h3>
    
       <div className=' d-flex flex-column flex-lg-row justify-content-evenly align-items-center '>
        <div className=' col-lg-5 col-10 mt-4 text-success text-capitalize'>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1204.7352938031033!2d3.9032789211851826!3d7.47503913951098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f27f37bd545d%3A0x24214e4915a7bc2b!2sFederal%20School%20Of%20Statistics%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1715378148581!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
    
        </div>
        <div className=' col-lg-5 col-10 mt-4 text-success text-capitalize'>
        <p>Have a question or want to get in touch? We'd love to hear from you! You can reach out to us using the contact information below or by filling out the contact form.</p>
<p>
Contact Information:</p>

<p>Email: joyloan@email.com</p>
<p>Phone: +1234567890</p>
<p>Address: 123 Main Street, City, Country</p>
<p>Feel free to drop us a message using the form below. We'll do our best to respond to you as soon as possible.</p>

<div class="mb-3">
  <label for="" class="form-label">type message here</label>
  <input
    type="text"
    class="form-control mb-2"
    name=""
    id=""
    aria-describedby="helpId"
    placeholder=""
  />
  <button
    type="button"
    class="btn btn-success"
  >
    Button
  </button>
  
</div>

        </div>
       </div>

     
          </section>

   </>
  )
}

export default Usercontactus