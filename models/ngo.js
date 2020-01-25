const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  users:{
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    resetToken: String,
    resetTokenExpiration: Date
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  sectors: {
      type: String
  }
  
});

module.exports = mongoose.model('Ngo', ngoSchema);