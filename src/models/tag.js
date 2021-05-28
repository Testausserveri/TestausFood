// Tag on restaurant, as an example "hamburger", "pizza", "sushi"

import mongoose from 'mongoose';
import toBlurhash from '../utils/toBlurhash.js';

const tag = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  blurhash: { type: String }
});

tag.pre('save', async function (next) {
  if (!this.blurhash) this.blurhash = await toBlurhash(this.image);
  next();
});

export default mongoose.model('Tag', tag);
