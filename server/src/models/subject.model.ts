import mongoose from "mongoose";

export interface ISubject extends mongoose.Document {
  users: mongoose.Types.ObjectId[];
  title: string;
  pdf: string[];
  questions: mongoose.Types.ObjectId[];
  modules: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}

const subjectSchema = new mongoose.Schema({
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  title: { type: String },

  pdf: [{ type: String, default: [] }],

  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Question", default: [] },
  ],

  modules: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Module", default: [] },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const SubjectModel = mongoose.model<ISubject>("Subject", subjectSchema);

export default SubjectModel;
