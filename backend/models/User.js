const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // from Google
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String }, 
  
  // to be filled later 
  age: { type: Number }, 
  isSmoker: { type: Boolean, default: false },
  hasAsthma: { type: Boolean, default: false },
  
  // helper to check if they finished setup
  isProfileComplete: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);
