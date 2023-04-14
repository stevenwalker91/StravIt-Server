const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  stravaId: Number,
  profilePicture: String,
  country: String,
  role: String,
  accessToken: String,
  tokenExpires: Number,
  refreshToken: String,
  scopes: String
})


const User = mongoose.model('User', userSchema);

module.exports = User;