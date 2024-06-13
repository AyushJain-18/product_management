const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const productRoutes = require('./routes/product_route');
const userRoutes = require('./routes/user_route');
const adminRoutes = require('./routes/admin_routes');
const { checkAdminAuthMiddelware } = require('./middelware');

let app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
// Middleware
app.use(express.json());

// serve static images.
let imageFolderPath = path.join(__dirname, 'images');
app.use('/images', express.static(imageFolderPath));

// Database connection
mongoose
  .connect('mongodb://localhost:27017/product_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// routes
app.get('/heartbeat', (req, res) => res.send('Server working'));
app.use('/api/user', userRoutes);
app.use('/api/product', checkAdminAuthMiddelware, productRoutes);
app.use('/api/admin', checkAdminAuthMiddelware, adminRoutes);

app.listen(5000, () => console.log(`server is running on port 3000`));
