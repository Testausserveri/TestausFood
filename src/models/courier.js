// Courier: User, the lovely people that deliver food.

import mongoose from 'mongoose';

const courier = new mongoose.Schema({
  username: String,
  password: String,
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

courier.methods.calculateReviewAverage = function () {
  return averageNumber(this.reviews.map((review) => review.amount));
}

export default mongoose.model('Courier', courier);
