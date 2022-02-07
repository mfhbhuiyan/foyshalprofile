import React,{Fragment,useState, useEffect } from "react";
import './ResetPassword.css'
import Loader from "../Loader.js";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors,resetPassword} from "../../actions/userAction";
import {useAlert} from "react-alert";
import MetaData from "../../components/MetaData"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword =({history, match}) =>{
    const dispatch = useDispatch();

    const alert = useAlert();

    const {error, success, loading} = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword,setConfrimPassword] = useState();
    

    const resetPasswordSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        
       dispatch(resetPassword(match.params.token, myForm));
         
    }


    useEffect(() => {
        
            if(error){
          alert.error(error); 
          dispatch(clearErrors());
    }
    if(success){
        alert.success("Password Updated Succefully");
        history.push("/login");

      }
     }, [dispatch,error,alert,history, success ] );


    return (
 
        <Fragment>
        {loading ? (
            <Loader/>
            ) : (
<Fragment>
    <MetaData title = "Change Password"/>

<div className="resetPasswordContainer">
     <div className="resetPasswordBox">
         <h2 className="resetPasswordHeading">Update Password</h2>
 
<form className="resetPasswordForm"
     encType="multipart/form-data" 
     onSubmit={resetPasswordSubmit}>



<div className="resetPassword">
<LockOpenIcon/>
<input
type="text"
placeholder="New password"
required
name="password"
value={password}
onChange={(e)=> setPassword(e.target.value)}
/>
</div>


<div className="resetPassword">
<LockIcon/>
<input
type="text"
placeholder="Confirm password"
required
name="password"
value={confirmPassword}
onChange={(e)=> setConfrimPassword(e.target.value)}
/>
</div>

<input type="submit" value= "Update" className ="resetPasswordBtn"/>

</form>      
   

</div>
</div>

</Fragment>
    )}
    </Fragment>    
    
    )
}

export default ResetPassword;