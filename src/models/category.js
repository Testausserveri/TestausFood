// Restaurant's category of products 

import mongoose from 'mongoose';

const category = new mongoose.Schema({
  name: String,
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  }
});

export default mongoose.model('Category', category);
