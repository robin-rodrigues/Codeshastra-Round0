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
  city: String,
  resetToken: String,
  resetTokenExpiration: Date,
  notifications: {
    items: [
      {
        profileId: {
          type: Schema.Types.ObjectId,
          ref: 'Profile'
        }
      }
    ]
  }
  
});

module.exports = mongoose.model('Ngo', ngoSchema);