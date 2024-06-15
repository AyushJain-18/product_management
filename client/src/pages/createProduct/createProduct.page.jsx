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
import { createNewProductByAdmin, createNewProductByUser, getAllUsers, modifyProduct , deleteProductAdmin } from "../../utils/api";
import Custumbutton from '../../component/custumComponents/CustumButon/custumButton.component'
import {useLocation, useNavigate } from 'react-router-dom';


const  CreateProductPage =()=>{
  const location = useLocation();
  let navigate = useNavigate();
  let productData = location?.state?.data;
  let defaultProductDetails = productData? productData : {name: "", price: "", category: "",description:"", assigned_users:[] }
  const {setIsLoading, token,loggedInUserRole,} =useAppContext();
  const [productDetails, setProductDetails ]= useState(defaultProductDetails);
  const [error, setError] = useState(null)
  const [allUsers, setAllUsers] = useState([]);
  const [success, setSuccess] = useState(null)

  const handleDeleteProduct = async(event) => {
    event.preventDefault();
    console.log('DElete function called')
    try{
      setIsLoading(true);
      await deleteProductAdmin(productDetails._id, token);
      setIsLoading(false);
      navigate('/')
    }catch(error){
      console.log('Error occured', error)
      setIsLoading(false)
    }
  }
  
  const handleSubmit= async (event)=>{
    event.preventDefault();
    setSuccess(null)
    const {name, price, category, description, assigned_users, _id} =productDetails;
    setIsLoading(true)
    try{
      if(loggedInUserRole === 'ADMIN' && location.pathname === '/create-product'){
       await createNewProductByAdmin(name, price, category, description,assigned_users, token);
      }
      if(loggedInUserRole === 'ADMIN' && location.pathname === '/product/edit'){
          await modifyProduct(_id,token, name, price, category, description,assigned_users);
      }
      if(loggedInUserRole === 'USER') {
        await createNewProductByUser(name, price, category, description,token);
      }

      // setProductDetails(defaultProductDetails)
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
    const idCount = value.reduce((acc, item) => {
      acc[item._id] = (acc[item._id] || 0) + 1;
      return acc;
  }, {});

  // Filter out items with more than one occurrence
   let uniqueValue =  value.filter(item => idCount[item._id] === 1);
    setProductDetails((prevValues) => ({
      ...prevValues,
      assigned_users: [...uniqueValue]
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
  }, [])

  useEffect(() => {
    let defaultProductDetails = productData? productData : {name: "", price: "", category: "",description:"", assigned_users:[] };
    setProductDetails(defaultProductDetails);
  }, [location.pathname, productData])


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
              <InputLabel>assigned_users</InputLabel>
              <Select
                name="assigned_users"
                multiple
                value={productDetails.assigned_users}
                onChange={handleUsersChange}
                input={<OutlinedInput label="assigned_users" />}
                renderValue={(selected) =>  {
                  return selected.map(user => allUsers?.find(u => u.username === user.username)?.username).join(', ')
                }}
              >
                {allUsers.map((user) => {
                   return(
                  <MenuItem key={user._id} value={user}>
                    <Checkbox checked={productDetails?.assigned_users.some(u => u.username === user.username)} />
                    <ListItemText primary={user.username} />
                  </MenuItem>
                )})}
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
            <Custumbutton type='submit' >Submit</Custumbutton>
          </Grid>

          {loggedInUserRole === 'ADMIN' && <Grid item xs={12} md = {4}>
            <Custumbutton onClick = {handleDeleteProduct} style={{backgroundColor : 'rgb(243, 98, 98)'}} >Delete Product</Custumbutton>
          </Grid>}

          <Grid item xs={12} md = {4}>
          {success && <div style={{color: 'green',fontSize: "larger",fontWeight: "bold",margin: '10px auto', width: 'fit-content', fontFamily: 'Open Sans Condensed'}}>{success}</div>}
          {error && <div style={{color: 'rgb(243, 98, 98)',fontSize: "larger",fontWeight: "bold",margin: '10px auto',fontFamily: 'Open Sans Condensed', width: 'fit-content'}}>{error}</div>}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

  
export default CreateProductPage ;
