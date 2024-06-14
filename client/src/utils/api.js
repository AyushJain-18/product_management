export const serverUrl = 'http://localhost:5000';

export const getImage = (imageName) => `${serverUrl}/images/${imageName}`;

export const getHeartBeat = async () => {
  let response = await fetch(serverUrl + '/heartbeat');
  let data = await response.text();
  console.log('data', data);
};

const makeCall = async (
  endpoint,
  method = 'GET',
  body = null,
  authToken = null
) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    const options = {
      method: method,
      headers: headers,
    };
    if (method === ('POST' || 'PUT') && body) {
      options.body = JSON.stringify(body);
    }
    console.log('Options are', options);
    let response = await fetch(`${serverUrl}/api${endpoint}`, options);
    if (!response.ok) {
      throw new Error({
        status: response.status,
        message: `HTTP error! status is ${response.status}`,
      });
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(
      `Error occured while making call to ${endpoint}`,
      error.message
    );
    throw new Error(`HTTP error! status is ${error.message}`);
  }
};

// only user can use this api.
export const getAllProductForUser = async (userToken) =>
  await makeCall('/user/view_product', 'GET', null, userToken);

// only admin can use this to get all product
export const getAllProduct = async (adminToken) =>
  await makeCall('/admin/product', 'GET', null, adminToken);

// to get all admin and non admin users
export const getAllAdminAndNonAdminUsers = async (adminToken) =>
  await makeCall('/admin/all_users_admin_non_admin', 'GET', null, adminToken);
// only admin can get all users
export const getAllUsers = async (adminToken) =>
  await makeCall('/admin/all_users', 'GET', null, adminToken);

// only admin can delete product
export const deleteProductAdmin = async (productId, adminToken) =>
  await makeCall(`/product/${productId}`, 'DELETE', null, adminToken);

// both admin and users can use it to login
export const loginUser = async (userName, password) =>
  await makeCall('/user/login', 'POST', { userName, password });

// only users can use this to create product.
export const createNewProductByUser = async (
  name,
  price,
  category,
  description,
  userToken
) =>
  await makeCall(
    '/user/create_product',
    'POST',
    { name, price, category, description },
    userToken
  );

// only admin user can use this to craete product and assign to users
export const createNewProductByAdmin = async (
  name,
  price,
  category,
  description,
  users = [],
  adminToken
) =>
  await makeCall(
    '/admin/product',
    'POST',
    { name, price, category, description, users },
    adminToken
  );
// only admin can create new users
export const createNewUser = async (
  adminToken,
  userName,
  password,
  isAdminUser = false
) =>
  await makeCall(
    '/admin/create_user',
    'POST',
    { userName, password, isAdminUser },
    adminToken
  );
// only admin user can use this modify product, can be used to add or remove admin
export const modifyProduct = async (
  productId,
  adminToken,
  name,
  price,
  category,
  description,
  add_users,
  remove_users
) =>
  await makeCall(
    `/product/${productId}`,
    'PUT',
    { name, price, category, description, add_users, remove_users },
    adminToken
  );

// let token2 = '';
// modifyProduct('6669b062011dc421b71f95db', token2, {
//   name: 'First Product Updated',
//   price: 1000,
//   description: 'Shoes for you',
//   category: 'Shoes',
//   add_users: [],
//   remove_users: [],
// });

// rashi:- 6669db9126c74035fb0a1c19
// ayush:- 6668a7afc5d6057976aa76a9
// rishabh:- 6668aa6e5f5a974b702c44f8
