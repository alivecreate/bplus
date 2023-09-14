import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

export const POST = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    // await saveFile(files.file);
    console.log('req', req)
    return res.status(201).send("working");
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/uploads/profile/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};

export const PUT = (req, res) => {
  console.log("PUT");
};

export const DELETE = (req, res) => {
  console.log("DELETE");
};

export const GET = (req, res) => {
  console.log("GET");
};
