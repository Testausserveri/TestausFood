// Review, on a restaurant or a courier :)

import mongoose from 'mongoose';

const review = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String,
  amount: {
    type: Number,
    min: 1,
    max: 5
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  courier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courier'
  }
});

export default mongoose.model('Review', review);
