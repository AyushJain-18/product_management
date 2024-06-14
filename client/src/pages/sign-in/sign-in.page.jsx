import React from "react";
import { getImage } from "../../utils/api";
import "./sign-in.page.scss"
import SingInComponent from "../../component/sign-in/sign-in.component";



function SingInLandingCopmonent() {
    return(
      <div className='sigin-container'>
        {/* {location.pathname === "/signin" &&<SingInComponent/>}  */}
        <SingInComponent />
        <img  className ="Background-Image" src={ getImage("/homepage.jpg")} alt="Shop here"/>              
      </div>
    )
}

export default SingInLandingCopmonent;