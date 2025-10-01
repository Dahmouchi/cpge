import { uploadFile, getFileUrl } from '@/lib/r2';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File = formData.get("file") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    await uploadFile(buffer, file.name, file.type);

    // Get the URL of the uploaded file
    const fileUrl = getFileUrl(file.name);
    
    // Return the file URL to the client
    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (err) {
    console.log("Error:", err);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}
