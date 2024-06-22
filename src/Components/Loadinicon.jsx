import React from 'react'
import logoimg from "../assets/download.png";

const Loadinicon = () => {
  return (
    <> 
    <div className=' d-flex loadinganimation justify-content-center align-items-center '>
     
<img src={logoimg} className="logoimg  loadingimg " alt="" />
    </div>

    </>
  )
}

export default Loadinicon;