// Restaurant, info about the restaurant, linking to RestaurantUser

import mongoose from 'mongoose';
import { averageNumber } from '../utils/number.js';
import Review from './review.js';
import toBlurhash from '../utils/toBlurhash.js';

const restaurant = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // This should be base64 jpg
  blurhash: { type: String, required: true }, // https://github.com/woltapp/blurhash
  id: { type: String, required: true }, // The id in the urls and API
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    default: []
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RestaurantUser',
    required: true,
  },
  location: {
    coordinates: [Number],
    streetAddress: { type: String, required: true },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  deliveryOptions: {
    delivery: {
      type: Boolean,
      default: false,
    },
    takeAway: {
      type: Boolean,
      default: false,
    },
    eatAtRestaurant: {
      type: Boolean,
      default: false,
    }
  }
});

restaurant.pre('save', async function (next) {
  if (!this.blurhash) this.blurhash = await toBlurhash(this.image);
  next();
});

restaurant.methods.calculateReviewAverage = async function () {
  const reviews = await Review.find({ restaurant: this._id }).exec();
  return averageNumber(reviews.map((review) => review.amount));
}

restaurant.methods.review = async function (user, amount, message) {
  const review = new Review({
    user,
    amount,
    message,
    restaurant: this._id
  });
  await review.save();
  await this.save();
  return review;
}

export default mongoose.model('Restaurant', restaurant);
