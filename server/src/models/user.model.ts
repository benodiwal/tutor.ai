import mongoose from "mongoose";

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
