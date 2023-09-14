// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // File has been uploaded and stored in the 'public/uploads' directory
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
  }
};
