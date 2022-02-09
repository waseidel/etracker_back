import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },

}, {
  timestamps: true,
});

const Account = mongoose.model('Account', AccountSchema);
export default Account;
