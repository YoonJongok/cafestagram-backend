import { FileUpload } from "graphql-upload";
import * as fs from "fs";

export const processCategories = (caption) => {
  const categoryArr: string[] = caption.match(/#[\w-]+/g) || [];
  return categoryArr.map((category) => ({
    where: {
      name: category,
    },
    create: {
      name: category,
      slug: caption,
    },
  }));
};

export const handleUpload = async (file: FileUpload, id: number) => {
  const { filename, createReadStream } = await file;
  const newFilename = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = fs.createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  );
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFilename}`;
};
