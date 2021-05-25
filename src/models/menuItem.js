// A item on the menu.

import mongoose from 'mongoose';

const menuItem = new mongoose.Schema({
  name: String,
  price: Number, // Base price without any customizations
  image: String,
});

export default mongoose.model('MenuItem', menuItem);
