import mongoose from "mongoose";
<<<<<<< HEAD
import bycrptjs from "bcryptjs";
import crypto from "crypto";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  subject: mongoose.Types.ObjectId[];

  firstLogin?: boolean;

  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;

  changedPasswordAfter: (JWTTimestamp: number) => boolean;

  createPasswordResetToken: () => string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String, default: "" },
  subject: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  password: { type: String, required: false },
  passwordChangedAt: { type: Date },
  firstLogin: { type: Boolean, default: true },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  console.log({ candidatePassword, userPassword });
  return await bycrptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model<IUser>("User", userSchema);
=======

export interface IComment extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  content: string;
}

const commentSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  content: { type: String },
});

const CommentModel = mongoose.model<IComment>("Comment", commentSchema);

export default CommentModel;
>>>>>>> d6fc650493b2ead90b94d0d1a13667d446eb880f
