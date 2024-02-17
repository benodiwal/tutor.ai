import mongoose from "mongoose";

export interface IQuestion extends mongoose.Document {
  questionSet: mongoose.Types.ObjectId;
  question: string;
  options: string[];
  answer: string;
  marks: number;
}

const questionSchema = new mongoose.Schema({
  questionSet: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionSet" },
  question: { type: String },
  options: [{ type: String }],
  answer: { type: String },
  marks: { type: Number },
});

const QuestionModel = mongoose.model<IQuestion>("Question", questionSchema);

export default QuestionModel;
