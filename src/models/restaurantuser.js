// Restaurant user, the user that receives and accepts the orders.

import mongoose from 'mongoose';

const restaurantUser = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  orders: [
    
  ]
});

export default mongoose.model('RestaurantUser', restaurantUser);
