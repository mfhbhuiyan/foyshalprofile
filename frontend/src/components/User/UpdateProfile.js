import React,{Fragment,useState, useEffect } from "react";
import "./UpdateProfile.css" 
import Loader from "../Loader.js";
import {Link} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors,updateProfile,loadUser} from "../../actions/userAction";
import {useAlert} from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../../components/MetaData"


const UpdateProfile = ({ history }) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const {user} = useSelector((state) => state.user);

    const {error, isUpdated, loading} = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png")

    const UpdateProfileSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar", avatar);
        
       dispatch(updateProfile(myForm));
         
    }

    const UpdateProfileDataChange = (e) =>{
                 const reader = new FileReader();

            reader.onload = new FileReader();

            reader.onload = () =>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }

            };

            reader.readAsDataURL(e.target.files[0]);

    }; 


    useEffect(() => {
        
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if(error){
          alert.error(error); 
          dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success("Profile Updated Succefully");
       dispatch(loadUser());

       history.push("/account");

       dispatch({
           type:UPDATE_PROFILE_RESET,
       })
    }
     }, [dispatch,error,alert,history,user, isUpdated ] );


    return (
        
       <Fragment>
       {loading ? (
           <Loader/>
           ) : (
<Fragment>
    <MetaData title="Update Profile"/>
<div className="UpdateProfileContainer">
    <div className="UpdateProfileBox">
        <h2 className="UpdateProfileHeading">Update Profile</h2>

        
    <form className="UpdateProfileForm"
    encType="multipart/form-data" 
    onSubmit={UpdateProfileSubmit}>
   
<div className="UpdateProfileName">

<FaceIcon/>

<input
type="text"
placeholder="Name"
required
name="name"
value={name}
onChange={(e)=> setName(e.target.value)}
/>
</div>

<div className="UpdateProfileEmail">
<MailOutlineIcon/>
<input
type="text"
placeholder="email"
required
name="email"
value={email}
onChange={(e)=> setEmail(e.target.value)}
/>
</div>

<div id= "UpdateProfileImage">
<img src= {avatarPreview} alt ="Avtar Preview"/>
<input
type="file"
name= "avatar"
accept= "image/*"
onChange={UpdateProfileDataChange}
/>
</div>

<input type="submit" value= "UpdateProfile" className ="UpdateProfileBtn"/>

</form>
    </div>
</div>
</Fragment>
    )}
    </Fragment>    
    
           )
   
};

export default UpdateProfile;