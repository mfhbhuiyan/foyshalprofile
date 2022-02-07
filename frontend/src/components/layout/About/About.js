import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/mfhbhuiyan";
    
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/rupshionlineshop/image/upload/v1639113902/avatars/cs0wi0qwixsilbaw1ilj.jpg"
              alt="Founder"
            />
            <Typography>Md. Foyshal Hossain Bhuiyan</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            This is online shop website made by @mfhbhuiyan. This is developing by the MERN stack program.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Social communication</Typography>
            <a
              href="https://www.linkedin.com/in/foyshal-bhuiyan-08745a205"
              target="blank"
            >
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>

            <a href="https://instagram.com/mfhbhuiyan" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
