// City that we operate in.

import mongoose from 'mongoose';

const city = new mongoose.Schema({
  name: String,
  zipCode: Number,
  country: String,
});

export default mongoose.model('City', city);
