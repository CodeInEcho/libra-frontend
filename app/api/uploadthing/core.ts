import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const getUser = async () => await currentUser();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 5 } })
    // .middleware(async (req) => {
    //   const user = await getUser();

    //   if (!user) throw new Error("Unauthorized");

    //   return { storeId: user.privateMetadata.storeId }; // add product id metadata here too.
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
