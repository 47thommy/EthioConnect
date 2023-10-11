const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "name is required",
    },
    email: {
      type: String,
      trim: true,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("please provide all the required fields");
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("user with the specified email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("please provide all the required fields");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("incorrect email or password");
  }

  return user;
};

module.exports = mongoose.model("user", userSchema);
