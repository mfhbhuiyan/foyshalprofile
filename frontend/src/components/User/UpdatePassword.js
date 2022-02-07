import React,{Fragment,useState, useEffect } from "react";
import "./UpdatePassword.css" 
import Loader from "../Loader.js";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors,updatePassword} from "../../actions/userAction";
import {useAlert} from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../../components/MetaData"
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";


const UpdatePassword = ({history}) =>{
    const dispatch = useDispatch();

    const alert = useAlert();

    const {error, isUpdated, loading} = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword,setConfrimPassword] = useState();
    

    const updatePasswordSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword", confirmPassword);
        
       dispatch(updatePassword(myForm));
         
    }


    useEffect(() => {
        
            if(error){
          alert.error(error); 
          dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success("Password Updated Succefully");
        history.push("/account");

       dispatch({
           type:UPDATE_PASSWORD_RESET,
       })
    }
     }, [dispatch,error,alert,history,isUpdated ] );


    return (
 
        <Fragment>
        {loading ? (
            <Loader/>
            ) : (
<Fragment>
    <MetaData title = "Change Password"/>

<div className="updatePasswordContainer">
     <div className="updatePasswordBox">
         <h2 className="updatePasswordHeading">Update Password</h2>
 
<form className="updatePasswordForm"
     encType="multipart/form-data" 
     onSubmit={updatePasswordSubmit}>

<div className="signUpPassword">
<VpnKeyIcon/>
<input
type="text"
placeholder="Old password"
required
name="password"
value={oldPassword}
onChange={(e)=> setOldPassword(e.target.value)}
/>
</div> 

<div className="signUpPassword">
<LockOpenIcon/>
<input
type="text"
placeholder="New password"
required
name="password"
value={newPassword}
onChange={(e)=> setNewPassword(e.target.value)}
/>
</div>


<div className="signUpPassword">
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

<input type="submit" value= "Change" className ="signUpBtn"/>

</form>      
   

</div>
</div>

</Fragment>
    )}
    </Fragment>    
    
           )
   
};

export default UpdatePassword;