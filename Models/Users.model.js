const mongoose = require("mongoose");
const usersSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true}

});
const UsersModel = mongoose.model("user", usersSchema);
module.exports = { UsersModel };
