const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  pwd: String,
  role: String,
  avatar: String,
  demandes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Demande' }]
});
userSchema.plugin(uniqueValidator);
const user = mongoose.model("User", userSchema);
module.exports = user;
