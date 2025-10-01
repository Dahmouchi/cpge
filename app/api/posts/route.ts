import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateRequest } from "@/lib/validation/validaterequest";
import { getFileUrl, uploadFile } from "@/lib/r2";
import  mime  from "mime";

const prisma = new PrismaClient();

export async function GET() {
  const allClasses = await prisma.posts.findMany({
    include:{
      image:true,
    }
  });

  if (!allClasses) {
    return NextResponse.json({ error: "No classes found" }, { status: 404 });
  }

  if (allClasses.length === 0) {
    return NextResponse.json({ message: "No classes found" }, { status: 404 });
  }

  return NextResponse.json(allClasses, { status: 200 });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const description:any = formData.get("description")?.toString();
  const title:any = formData.get("title")?.toString();
  const published:any = formData.get("published")=== 'true';
  const document: File = formData.get("files") as File;
  const bytes = await document.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${document.name.replace(
    /\.[^/.]+$/,
    ""
  )}-${uniqueSuffix}.${mime.getExtension(document.type)}`;

  await uploadFile(buffer, filename, document.type);

  // Get the URL of the uploaded file
  const fileUrl =  getFileUrl(filename);
  const truncateText = (text:any, maxLength = 155) => {
    if (!text) return '';
  
    // Ensure the text is truncated to the maximum length
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  try {
    if (fileUrl){

    const newPost = await prisma.posts.create({
      data: {
        title,
        description: description,
        body:truncateText(description),
        author:user.id,
        handle:title,
        published,
        image: {
          create: {
            name: document.name,
            fileurl: fileUrl,
            filetype: document.type,
          },
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error adding post" }, { status: 500 });
  }
}
