// Courier: User, the lovely people that deliver food.

import mongoose from 'mongoose';

const courier = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  blurhash: String,
  activeOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  orderHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    }
  ],
  location: [Number]
});

courier.pre('save', async function (next) {
  if (!this.blurhash) this.blurhash = await toBlurhash(this.image);
  next();
});

courier.methods.calculateReviewAverage = function () {
  return averageNumber(this.reviews.map((review) => review.amount));
}

export default mongoose.model('Courier', courier);
