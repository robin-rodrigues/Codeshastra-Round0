const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  ngoemail: {
    type: String,
    required: true
  },
  ngopassword: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date
  
});

module.exports = mongoose.model('Ngo', ngoSchema);