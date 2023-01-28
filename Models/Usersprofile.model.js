const mongoose = require("mongoose");
const  UsersprofileSchema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, },
  height: {type: Number, },
  weight: { type: Number,},
  history: { type: Array}
});
const UsersprofileModel = mongoose.model("userprofile",  UsersprofileSchema);
module.exports = {  UsersprofileModel };
