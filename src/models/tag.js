// Tag on restaurant, as an example "hamburger", "pizza", "sushi"

import mongoose from 'mongoose';

const tag = new mongoose.Schema({
  name: String,
  image: String
});

export default mongoose.model('Tag', tag);
