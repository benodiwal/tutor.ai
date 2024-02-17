import mongoose from "mongoose";

export interface IQuestionSet extends mongoose.Document {
  subject: mongoose.Types.ObjectId;
  modules: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
  attempts: mongoose.Types.ObjectId[];
}

const questionSetSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  modules: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attempt" }],
});

const QuestionSetModel = mongoose.model<IQuestionSet>(
  "QuestionSet",
  questionSetSchema
);

export default QuestionSetModel;
