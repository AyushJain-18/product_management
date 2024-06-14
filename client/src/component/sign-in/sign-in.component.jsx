import React ,{useState} from "react";
import "./sign-in.comonent.scss"

import FormInput from "../custumComponents/form-input/form-input.component"
import CustumButton from "../custumComponents/CustumButon/custumButton.component"
import { loginUser } from "../../utils/api";
import useAppContext from "../../hooks/useAppcontext";





const  SingInComponent =()=>{
  const [userCrendetial, setUserCredebtials, ]= useState({userName: "", password: ""});
  const [error, setError] = useState(false)
  const {setIsLoading, setToken, setLoggedInUserRole} =useAppContext();
  
  const handleSubmit= async (event)=>{
    event.preventDefault();
    const {userName, password} =userCrendetial;
    let data = null;
    setIsLoading(true)
    try{
       data = await loginUser(userName, password);
       setToken(data?.token)
       setLoggedInUserRole(data?.role)
       setIsLoading(false)
       setError(false)
    }catch(error){
      console.log('Error while login', error.message)
      setError(true)
      setIsLoading(false)
    }
  
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
         {error && <div className="wrongCredentials">Wrong Credentials</div>}
        <div className ="button-wrap">
          <CustumButton   type ="submit">Sign In </CustumButton>
        </div>
       
      </form> 
    </div>
  );
// }
}

  
export default SingInComponent ;
