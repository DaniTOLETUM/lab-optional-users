const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "User"]
  },
});


const Users = mongoose.model('Users', usersSchema);
module.exports = Users;