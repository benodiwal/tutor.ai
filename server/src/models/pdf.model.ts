import mongoose from "mongoose";

export interface IPdf extends mongoose.Document {}

const pdfSchema = new mongoose.Schema({});

const PdfModel = mongoose.model<IPdf>("Pdf", pdfSchema);

export default PdfModel;
