// Courier: User, the lovely peoplethat delivers food.

import mongoose from 'mongoose';

const order = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
    }
  ],
  orderer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  courier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courier',
  },
  placedOn: {
    type: Date,
  },
  seenByRestaurant: Boolean,
  status: Boolean,
});

export default mongoose.model('Order', order);
