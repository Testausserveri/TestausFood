// User: An normal user, not a courier.

import mongoose from 'mongoose';

const user = new mongoose.Schema({
  username: String,
  avatar: String,
  password: String,
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  }],
  totalTime: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('User', user);
