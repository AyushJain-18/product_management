import React ,{useState} from "react";
import "./sign-in.comonent.scss"

import FormInput from "../custumComponents/form-input/form-input.component"
import CustumButton from "../custumComponents/CustumButon/custumButton.component"



const  SingInComponent =()=>{

  const [userCrendetial, setUserCredebtials]= useState({userName: "", password: ""});

  const handleSubmit=(event)=>{
    event.preventDefault();
    const {userName, password} =userCrendetial
    console.log(userName, password)
    // emailLoginStart(email, password)
  }
  const handleOnchnage=(event)=>{
    const{name,value} = event.target;
    setUserCredebtials({...userCrendetial, [`${name}`]: value})
  }

  return(
    <div className ="sign-in">
      <h2 className = "title">WANNA LOGIN IN!</h2>
      <div className ='subtitle'>
        <div> LOGIN here</div> 
      </div>
      <form onSubmit={handleSubmit}> 

        <FormInput 
          type="text" 
          name="userName" 
          label={"User name"}
          value={userCrendetial.userName} 
          required
          handleChange={handleOnchnage} />
                        
        <FormInput
          type="password"
          name="password"
          label={"Password"}
          value={userCrendetial.password} 
          required
          handleChange ={handleOnchnage}/>

        <div className ="button-wrap">
          <CustumButton   type ="submit">Sign In </CustumButton>
        </div>
      </form> 
    </div>
  );
// }
}

  
export default SingInComponent ;