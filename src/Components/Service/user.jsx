import axios from "axios";


import { featchinguser,featchinguserSuccessful,featchinguserfailed } from "../Redux/userdata";


export const alluser = (dispatch,values)=>{
    dispatch(featchinguser())
    console.log(values);
    setTimeout(() => {
        axios.post("http://localhost:8332/loanapp/login", {
            emailorphonernumber: values.email,
            password: values.password,
          })
        .then((res) => {
            console.log(res.data);
    alert(res.data.message);
    console.log(userdata);
    // navigate("/home");

        dispatch(featchinguserSuccessful(res.data))
        alert("Fetched successfully")
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
        dispatch(featchinguserfailed(err.message))
        console.log(err.message);
            console.log(err);
            alert(err.response.data.message);
      })
      }, 5000);
}





