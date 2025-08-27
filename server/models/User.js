const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <-- Uncomment

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please add a name'] },
    email: { type: String, required: [true, 'Please add an email'], unique: true },
    password: { type: String, required: [true, 'Please add a password'], minlength: 6 },
  },
  { timestamps: true }
);

// This function will run automatically BEFORE a user is saved to the database
userSchema.pre('save', async function (next) {
  // If the password hasn't been changed, we don't need to re-hash it
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// A new method on the user model to compare entered password with the hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;