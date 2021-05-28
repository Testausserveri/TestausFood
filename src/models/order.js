// Order: Order placed by an user.

import mongoose from 'mongoose';

const order = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
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
    required: true
  },
  courier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courier',
  },
  placedOn: {
    type: Date,
    required: true
  },
  estimateReady: { 
    type: Date,
  },
  estimateDelivery: { 
    type: Date,
  },
  seenByRestaurant: Boolean,
  status: Number,
});

export default mongoose.model('Order', order);
