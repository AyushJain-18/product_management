const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Each product should have attributes like name, SKU, description, and
// category, logo, etc.(use some common attribute so that data looks proper
// when you display in grid)

let productSchema = new Schema(
  {
    name: { type: String, required: true },
    SKU: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assigned_users: [
      {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);
productSchema.index({ 'assigned_users.user_id': 1, required: true });
let products = mongoose.model('Product', productSchema);

module.exports = products;
