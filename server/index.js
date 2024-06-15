const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const productRoutes = require('./routes/product_route');
const userRoutes = require('./routes/user_route');
const adminRoutes = require('./routes/admin_routes');
const { checkAdminAuthMiddelware } = require('./middelware');
const { addData } = require('./controllers/dummyDataController');

// 'mongodb://localhost:27017/product_management'
let dbURL = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@${process.env.DB_Cluster}.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

let app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
};
app.use(cors(corsOptions));
// Middleware
app.use(express.json());

// serve static images.
let imageFolderPath = path.join(__dirname, 'images');
app.use('/images', express.static(imageFolderPath));

// Database connection
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB and environment is', process.env.NODE);
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// routes
app.get('/addData', (req, res) => addData(req, res));
app.get('/heartbeat', (req, res) => res.send('Server working'));
app.use('/api/user', userRoutes);
app.use('/api/product', checkAdminAuthMiddelware, productRoutes);
app.use('/api/admin', checkAdminAuthMiddelware, adminRoutes);

app.listen(5000, () => console.log(`server is running on port 5000`));
