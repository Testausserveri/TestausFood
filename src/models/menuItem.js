// A item on the menu.

import mongoose from 'mongoose';

const menuItem = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Base price without any customizations
  image: { type: String, required: true }, // Base64 JPG
  blurhash: { type: String, required: true }, // https://github.com/woltapp/blurhash
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
});

menuItem.pre('save', async function (next) {
  if (!this.blurhash) this.blurhash = await toBlurhash(this.image);
  next();
});

export default mongoose.model('MenuItem', menuItem);
