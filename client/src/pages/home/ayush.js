import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../../hooks/useAppcontext';
import {
  getAllProduct,
  getAllProductForUser,
  serverUrl,
} from '../../utils/api';

const products2 = [
  {
    _id: 1,
    name: 'First Product Updated',
    SKU: '1718202466122_FIRS_FIRS_COLL',
    price: 1000,
    description: 'A short description about product',
    category: 'Category 1',
    image: `shoe2.jpg`,
    assassigned_users: [],
  },
  {
    _id: 2,
    name: 'Second Product',
    SKU: '1718202466122_SECO_PROD_COLL',
    price: 2000,
    description: 'Another short description about product',
    category: 'Shoes',
    image: `shoe1.jpg`,
  },
  {
    _id: 3,
    name: 'Third Product',
    SKU: '1718202466122_THIR_PROD_COLL',
    price: 1500,
    description: 'A short description about product',
    category: 'Accessories',
    image: 'goggle.jpg',
  },
  {
    _id: 4,
    name: 'Fourth Product',
    SKU: '1718202466122_FOUR_PROD_COLL',
    price: 1800,
    description: 'A short description about product',
    category: 'Electronics',
    image: 'headphone.jpg',
  },
];

const Homepage = () => {
  const { loggedInUserRole, token } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  let navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const onProductClick = (productId) => navigate(`product/${productId}`);

  const filteredProducts = product.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
  );

  const getProducts = async () => {
    try {
      let resp = [];
      if (loggedInUserRole === 'ADMIN') {
        resp = await getAllProduct(token);
      }
      if (loggedInUserRole === 'USER') {
        resp = await getAllProductForUser(token);
      }
      if (resp?.products) {
        let allCategory = [
          ...new Set(resp.products.map((ele) => ele.category)),
        ];
        setCategory(allCategory);
      }
      setProduct(resp?.products || products2);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mr: 2, flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {category.map((eachCategory, index) => (
              <MenuItem key={index} value={eachCategory}>
                {eachCategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card
              onClick={() => onProductClick(product._id)}
              sx={{ cursor: 'pointer', height: '100%' }}
            >
              <CardMedia
                component="img"
                height="250"
                image={`${serverUrl}/images/${product.image}`}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>SKU:</strong> {product.SKU}
                </Typography>
                {loggedInUserRole === 'ADMIN' && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Assigned Users:</strong>
                    {product?.assigned_users?.length > 0
                      ? product.assigned_users.join(', ')
                      : ' None'}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Homepage;
