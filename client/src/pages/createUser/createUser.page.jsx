import React ,{useEffect, useState} from "react";
import "../createProduct/createProduct.page.scss"
import useAppContext from "../../hooks/useAppcontext";
import { createNewUser,  getAllAdminAndNonAdminUsers} from "../../utils/api";
import Custumbutton from '../../component/custumComponents/CustumButon/custumButton.component';
import FormInput from '../../component/custumComponents/form-input/form-input.component';


const  CreateUser =()=>{
  let defaultUserDetails = {userName: "", password: "" }
  const {setIsLoading,token,} =useAppContext();
  const [userDetails, setUserDetails ]= useState(defaultUserDetails);
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([])

  const handleSubmit= async (event)=>{
    event.preventDefault();
    setSuccess(null);
    const {userName,password} =userDetails;
    if(users.some(user => user.username.toLocaleLowerCase() === userName.toLocaleLowerCase())){
      setError(`${userName} already exists please use different username`)
      return;
    }
    setIsLoading(true)
    try{
        await createNewUser(token,userName,password, false );
      setUserDetails(defaultUserDetails)
      setSuccess('User is created')
      setIsLoading(false)
      setError(null)
    }catch(error){
      console.log('Error while creating User', error)
      setError('Error while creating User', error.message)
      setSuccess(null)
      setIsLoading(false)
    }
  
  }
  const handleChange=(event)=>{
    setSuccess(null)
    setError(null)
    const{name,value} = event.target;
    setUserDetails({...userDetails, [`${name}`]: value})
  }

  useEffect(() => {
    (async function(){
      setIsLoading(true);
      try{
        let response =  await getAllAdminAndNonAdminUsers(token);
        setUsers(response.users)
        setIsLoading(false)
      }catch(error){
          console.log('error', error);
          setError(error.message);
          setIsLoading(false)
      }
      
    })()
    
  }, [setIsLoading, token])


  return(
    <div className ="sign-in"  style={{maxWidth: '1200px', margin: 'auto'}}>
      <h2 className = "title">Create new users</h2>
      <form onSubmit={handleSubmit}> 
      <FormInput 
          type="text" 
          name="userName" 
          label={"User name"}
          value={userDetails.userName} 
          required
          handleChange={handleChange} />
                        
        <FormInput
          type="password"
          name="password"
          label={"Password"}
          value={userDetails.password} 
          required
          handleChange ={handleChange}/>
       
         {error && <div className="error" >{error}</div>}
         {success && <div className="error" style={{color: 'green'}}>{success}</div>}
        <div className ="button-wrap-user">
          <Custumbutton type ="reset" style={{width: 'fit-content'}}> Cancle </Custumbutton>
          <Custumbutton type ="submit"style={{width: 'fit-content'}} >Add new user </Custumbutton>
        </div>
       
      </form> 
    </div>
  );
}

  
export default CreateUser ;
