import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "1GB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("metadata", metadata);
      console.log("file", file);

      // we will do indexing in pinecone here

      // make an axios request here
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
