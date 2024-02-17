import mongoose from "mongoose";

export interface ISubject extends mongoose.Document {
  users: mongoose.Types.ObjectId[];
  title: string;
  pdf: string[];
  questions: mongoose.Types.ObjectId[];
  modules: mongoose.Types.ObjectId[];
}

const subjectSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  title: { type: String },
  pdf: [{ type: String }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
});

const SubjectModel = mongoose.model<ISubject>("Subject", subjectSchema);

export default SubjectModel;
