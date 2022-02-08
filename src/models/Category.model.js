import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;
