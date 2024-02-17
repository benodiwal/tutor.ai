import express, { Request, Response } from "express";
import SubjectModel from "../models/subject.model";

const subjectRouter = express.Router();

subjectRouter.get("/:id", (req: Request, res: Response) => {
  res.send("Subject Route");
});

subjectRouter.post("create", async (req: Request, res: Response) => {
  const user = req.body.user;

  const { title, url, emails } = req.body;

  // also get the mongouser

  const newSubject = await SubjectModel.create({
    title,
    createdBy: user,
    users: [user],
  });

  // As the client this we will rediercet user to the
  // subject page => subject/_id
  // There will a loading state where we will create vector subject

  res.json(200).json({
    message: "Subject Created",
    data: newSubject,
  });
});

// This is the route where we will be doing post of the stuff realted to AI
subjectRouter.post("/upload", async (req: Request, res: Response) => {
  // const { pdf, subjectId } = req.body;

  // This is wrong need to fix this...
  const subjectId = req.body.subjectId;

  const { url } = req.body;

  const mongo_subject = await SubjectModel.findByIdAndUpdate(subjectId, {
    $push: { url },
  });

  if (!mongo_subject) {
    return res.status(400).json({
      message: "Subject Not Found",
    });
  }

  // Setup the indexing process here...

  // Now we will be generating the questions and modules
  // for the subject
  // get the vectors from pineconedb

  // save them to the user
});

export default subjectRouter;
