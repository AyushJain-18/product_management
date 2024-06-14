Server folder conatins backend code, which is been developed on Express and DB used in mongoDB.
Client contains frontend code, which is been developed in react

# To start server. (In first terminal)

cd .\server\
npm start

# To start client (In second Terminal)

cd .\client\
npm start

note:- As soon as you start the server some dummy data will be created on your local db.

pasted users and product data.
username and pass is what we require to login to website

const users = [
{ username: 'admin', password: 'pass, role: ADMIN },
{ username: 'John', password: 'pass, role: NON_ADMIN },
{ username: 'Robin', password: 'pass, role: NON_ADMIN },
];

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
