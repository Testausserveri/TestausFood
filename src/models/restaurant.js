// Restaurant, info about the restaurant, linking to RestaurantUser

import mongoose from 'mongoose';
import { averageNumber } from '../utils/number.js';
import Review from './review.js';

const restaurant = new mongoose.Schema({
  name: String,
  image: String,
  id: String, // The id in the urls and API
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RestaurantUser',
  },
  location: {
    coordinates: [Number],
    streetAddress: String,
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    }
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
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
