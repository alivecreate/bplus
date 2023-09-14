import Compressor from "compressorjs";
import { postsPath } from "@app/data/imageSizes";

export const compressFile = async (file: File) => {
  const compressedFilesArray: any = [];
  const sizes = [40, 120, 360, 800, 1200, 1600];

  for (let i = 0; i < sizes.length; i++) {
    const compressedFile = await new Promise((innerResolve, innerReject) => {
      new Compressor(file, {
        quality: 0.9,
        maxWidth: sizes[i],
        maxHeight: sizes[i],
        checkOrientation: false,
        success: innerResolve,
        error: innerReject,
      });
    });
    compressedFilesArray.push(compressedFile);
  }

  return compressedFilesArray;
};
