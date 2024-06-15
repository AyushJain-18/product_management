const Products = require('../model/products.model');
const Users = require('../model/users.model');
const { ADMIN, NON_ADMIN, SECRET_KEY } = require('../keys');
const bcrypt = require('bcrypt');

let generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

const addData = async (req, res) => {
  await deleteData();
  await createDummyData();
  res.send('Data added');
};
const deleteData = async () => {
  try {
    await Products.deleteMany({});
    await Users.deleteMany({});
    console.log('Data is deleted');
  } catch (error) {
    console.log('Error while deleting data');
  }
};
// Function to create and add dummy data
const createDummyData = async () => {
  try {
    // Create users
    let hashPassword = await generateHashPassword('pass');
    const users = [
      { username: 'admin', password: hashPassword, role: ADMIN },
      { username: 'John', password: hashPassword, role: NON_ADMIN },
      { username: 'Robin', password: hashPassword, role: NON_ADMIN },
    ];

    const createdUsers = await Users.insertMany(users);
    const nonAdminUsers = createdUsers.filter(
      (user) => user.role === NON_ADMIN
    );

    // Create products
    const products = [
      {
        name: 'Shoe AB',
        SKU: 'SKU001',
        price: 100,
        description: 'Description of Product 1',
        category: 'Shoes',
        image: 'shoe1.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[0]._id }],
      },
      {
        name: 'Shoe XYZ',
        SKU: 'SKU002',
        price: 200,
        description: 'Description of Product 2',
        category: 'Shoes',
        image: 'shoe2.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[1]._id }],
      },
      {
        name: 'Cool Glasses',
        SKU: 'SKU003',
        price: 300,
        description: 'Description of Product 3',
        category: 'Accessories',
        image: 'goggle.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[0]._id }],
      },
      {
        name: 'White Watch',
        SKU: 'SKU004',
        price: 400,
        description: 'Description of Product 4',
        category: 'Accessories',
        image: 'watch.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[1]._id }],
      },
      {
        name: 'Sunglasses',
        SKU: 'SKU005',
        price: 500,
        description: 'Description of Product 5',
        category: 'Accessories',
        image: 'goggle.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[0]._id }],
      },
      {
        name: 'Macbook',
        SKU: 'SKU006',
        price: 600,
        description: 'Description of Product 6',
        category: 'Gadgets',
        image: 'apple.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[1]._id }],
      },
      {
        name: 'Trendy Headphone',
        SKU: 'SKU007',
        price: 700,
        description: 'Description of Product 7',
        category: 'Gadgets',
        image: 'headphone.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[0]._id }],
      },
      {
        name: 'Apple Gadgets',
        SKU: 'SKU008',
        price: 800,
        description: 'Description of Product 8',
        category: 'Gadgets',
        image: 'apple.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[1]._id }],
      },
      {
        name: 'Funky Shoe',
        SKU: 'SKU009',
        price: 900,
        description: 'Description of Product 9',
        category: 'Shoes',
        image: 'shoe2.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[0]._id }],
      },
      {
        name: 'Normal shoe',
        SKU: 'SKU010',
        price: 1000,
        description: 'Description of Product 10',
        category: 'Shoes',
        image: 'shoe1.jpg',
        created_by: createdUsers[0]._id,
        assigned_users: [{ user_id: nonAdminUsers[1]._id }],
      },
    ];

    await Products.insertMany(products);
    console.log('Dummy data created successfully!');
  } catch (error) {
    console.error('Error creating dummy data:', error);
  }
};
module.exports = {
  deleteData,
  createDummyData,
  addData,
};
