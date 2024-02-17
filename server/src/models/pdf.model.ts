import mongoose from "mongoose";

enum PdfStatus {
  pending = "pending",
  completed = "completed",
  failed = "failed",
}

export interface IPdf extends mongoose.Document {
  url: string;
  subjectId: string;
  status: "pending" | "completed" | "failed";
}

const pdfSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: PdfStatus,
    default: "pending",
  },
});

const PdfModel = mongoose.model<IPdf>("Pdf", pdfSchema);

export default PdfModel;
