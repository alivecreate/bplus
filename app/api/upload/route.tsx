import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { postsPath } from "@app/data/imageSizes";
import prisma from "@app/libs/prismadb";
import getCurrentUser from "@app/actions/getCurrentUser";

async function uploadFile(
  file: File,
  imageType: any,
  imagePaths: any,
  randomName: any,
) {
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const path = `./public/uploads/${imageType}/${imagePaths}/${randomName}.jpeg`;
  const pathDir = `./public/uploads/${imageType}/${imagePaths}`;

  const fs = require("fs");
  if (!fs.existsSync(pathDir)) {
    // If it doesn't exist, create the directory
    fs.mkdirSync(pathDir, { recursive: true }, (err: any) => {});
  }

  writeFile(path, buffer);
}

export async function POST(req: any) {
  const currentUser = getCurrentUser();
  console.log(JSON.stringify(currentUser));

  try {
    const data = await req.formData();

    console.log(data);

    const numberOfImages = Array.from(data.entries()).length;
    console.log("Number of files selected:", numberOfImages);

    const imagePaths = ["icon", "xs", "sm", "md", "lg", "xl"];
    const imageType = "profile";

    const randomName = `${Math.floor(
      Math.random() * 1000000,
    )}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

    for (let i = 0; i < imagePaths.length; i++) {
      let file = data.get(`file${i}`);
      await uploadFile(file, imageType, imagePaths[i], randomName);
      // console.log('file00 2 -', file);
    }

    let id = data.get("id");

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: `${randomName}.jpeg` || null,
      },
    });

    return NextResponse.json({
      message: "File uploaded",
      uploadedImage: `${randomName}.jpeg`,
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      message: "No image found",
      success: false,
    });
  }
}
