import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/cours`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }
  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}`,fileName: file.name, fileType: file.type });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { filePath } = await request.json();
  console.log(filePath)
  if (!filePath) {
    return NextResponse.json(
      { error: "File path is required." },
      { status: 400 }
    );
  }

  const uploadDir = join(process.cwd(), "public");
  const fullPath = join(uploadDir, filePath);

  try {
    await unlink(fullPath);
    return NextResponse.json({ message: "File deleted successfully." });
  } catch (e) {
    console.error("Error while trying to delete a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}