import React ,{useState} from "react";
import "./createProduct.page.scss"

import FormInput from "../../component/custumComponents/form-input/form-input.component";
import CustumButton from "../../component/custumComponents/CustumButon/custumButton.component"
import useAppContext from "../../hooks/useAppcontext";


const  CreateProductPage =()=>{
  const [userCrendetial, setUserCredebtials, ]= useState({userName: "", password: ""});
  const [error, setError] = useState(false)
  const {setIsLoading, setToken, setLoggedInUserRole} =useAppContext();
  
  const handleSubmit= async (event)=>{
    event.preventDefault();
    const {userName, password} =userCrendetial;
    let data = null;
    setIsLoading(true)
    try{
       data = // await loginUser(userName, password);
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
    <div className ="create-product">
      <h2 className = "title">CREATE PRODUCT !</h2>
      <div className ='subtitle'>
        <div>Use below form to create new product</div> 
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
         {error && <div className="error">Wrong Credentials</div>}
        <div className ="button-wrap">
          <CustumButton   type ="submit">Sign In </CustumButton>
        </div>
       
      </form> 
    </div>
  );
// }
}

  
export default CreateProductPage ;
