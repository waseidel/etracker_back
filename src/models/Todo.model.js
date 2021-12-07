import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  belongsTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
