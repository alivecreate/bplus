import { writeFile } from "fs/promises";
import { join } from "path";

export default function ServerUploadPage() {
  async function upload(data: FormData) {
    "use server";

    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(process.cwd(), `/public/uploads/profile/${file.name}`);

    await writeFile(path, buffer);

    return { success: true };
  }

  return (
    <main>
      <h1>React Server Component: Upload</h1>
      <form action={upload}>
        <input type="file" name="file" />
        <br />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
