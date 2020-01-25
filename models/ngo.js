const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  name: {
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