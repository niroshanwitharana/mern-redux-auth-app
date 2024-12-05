import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Ensure virtual fields are included when converting to JSON
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password validity
UserSchema.methods.isValidPassword = async function(candidatePassword) {
  console.log(`saved password: ${this.password}`);
  console.log(`user password: ${candidatePassword}`);
  const confirmPassword = await bcrypt.compare(candidatePassword, this.password)
  console.log(confirmPassword);
  if(confirmPassword){
  return confirmPassword;
  }
};

// Remove password from JSON output for privacy and securiety purpose
// Passwords (even hashed ones) should never be sent to the client or exposed via API responses. Even though hashed passwords are not easily reversible, exposing them is still considered bad practice.
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
const User = mongoose.model('User', UserSchema);

export default User;