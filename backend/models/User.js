const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // stored as a bcrypt hash, never plain text
    },
    department: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },

    // ─── Peer-matching fields — all optional ───────────────────────────
    teaches: {
      type: [String],
      default: [],
    },
    learning: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },
    showOnPeerPage: {
      type: Boolean,
      default: true,
    },
    available: {
      type: Boolean,
      default: true,
    },

    //ProfileSetUp Page
    profilePicture: { 
      type: String, 
      default: "" 
    },
    status: { 
      type: String, 
      default: "available" 
    },
    bio: { 
      type: String, 
      default: "", 
      maxlength: 160 
    },
    // ─── Derived / future fields ────────────────────────────────────────
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

// Never send the password hash back in any API response.
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);