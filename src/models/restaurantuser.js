// Restaurant user, the user that receives and accepts the orders.

import mongoose from 'mongoose';

const restaurantUser = new mongoose.Schema({
  username: String,
  password: String,
  restaurantuser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
});

export default mongoose.model('RestaurantUser', restaurantUser);
