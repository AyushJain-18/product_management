import React ,{useEffect, useState} from "react";
import "./createProduct.page.scss"
import {
  Box,
  TextField,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import useAppContext from "../../hooks/useAppcontext";
import { createNewProductByAdmin, createNewProductByUser, getAllUsers } from "../../utils/api";
import Custumbutton from '../../component/custumComponents/CustumButon/custumButton.component'



const  CreateProductPage =()=>{
  let defaultProductDetails = {name: "", price: "", category: "",description:"", users:[] }
  const {setIsLoading, token,loggedInUserRole,} =useAppContext();
  const [productDetails, setProductDetails ]= useState(defaultProductDetails);
  const [error, setError] = useState(null)
  const [allUsers, setAllUsers] = useState([]);
  const [success, setSuccess] = useState(null)

  
  const handleSubmit= async (event)=>{
    setSuccess(null)
    event.preventDefault();
    const {name, price, category, description,users} =productDetails;
    let data = null;
    setIsLoading(true)
    try{
      if(loggedInUserRole === 'ADMIN'){
        data =  await createNewProductByAdmin(name, price, category, description,users, token);
      }
      if(loggedInUserRole === 'USER') {
        data = await createNewProductByUser(name, price, category, description,token);
      }
      setProductDetails(defaultProductDetails)
      setSuccess('Prodcut is created')
      setIsLoading(false)
      setError(null)
    }catch(error){
      console.log('Error while creating product', error.message)
      setError('Error while creating product')
      setSuccess(null)
      setIsLoading(false)
    }
  
  }
  const handleChange=(event)=>{
    const{name,value} = event.target;
    setProductDetails({...productDetails, [`${name}`]: value})
  }

  const handleUsersChange = (event) => {
    const { value } = event.target;
    setProductDetails((prevValues) => ({
      ...prevValues,
      users: [...value]
    }));
  };


  useEffect( () => {
    (async function(){
      if(loggedInUserRole === 'ADMIN'){
        try{
          setIsLoading(true);
          let resp = await getAllUsers(token);
          setAllUsers(resp?.users)
          setIsLoading(false);
          setError(null)
        }catch(error){
          setIsLoading(false);
          setError('Error while fetching all users')
        }
      
      }
    })()
  }, [loggedInUserRole])


  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{margin: 'auto', width: 'fit-content',  fontFamily: 'Open Sans Condensed'}}>
        Product Details Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx= {{maxWidth: '1200px', margin: 'auto'}}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={productDetails.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              type="number"
              value={productDetails.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="category"
              value={productDetails.category}
              onChange={handleChange}
              required
            />
          </Grid>
          { loggedInUserRole === 'ADMIN' && <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Users</InputLabel>
              <Select
                name="users"
                multiple
                value={productDetails.users}
                onChange={handleUsersChange}
                input={<OutlinedInput label="Users" />}
                renderValue={(selected) => selected.map(user => allUsers.find(u => u._id === user._id).username).join(', ')}
              >
                {allUsers.map((user) => (
                  <MenuItem key={user._id} value={user}>
                    <Checkbox checked={productDetails?.users.some(u => u._id === user._id)} />
                    <ListItemText primary={user.username} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>}
         
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={productDetails.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md = {4}>
              <Custumbutton type='reset' onClick= {() => {setProductDetails(defaultProductDetails); setSuccess(null)}} >cancel</Custumbutton>
          </Grid>
          <Grid item xs={12} md = {4}>
          {success && <div style={{color: 'green',fontSize: "larger",fontWeight: "bold",margin: '10px auto', width: 'fit-content', fontFamily: 'Open Sans Condensed'}}>{success}</div>}
          {error && <div style={{color: 'rgb(243, 98, 98)',fontSize: "larger",fontWeight: "bold",margin: '10px auto',fontFamily: 'Open Sans Condensed', width: 'fit-content'}}>{error}</div>}
          </Grid>
          <Grid item xs={12} md = {4}>
            <Custumbutton type='submit' >Submit</Custumbutton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

  
export default CreateProductPage ;
