import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 6
  },
  value: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['debit', 'credit']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, {
  timestamps: true
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
