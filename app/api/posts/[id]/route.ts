"use server";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/validation/validaterequest";
import  mime  from "mime";
import { getFileUrl, uploadFile } from "@/lib/r2";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const student = await prisma.posts.findUnique({
    where: {
      id: id,
    },
    include:{
      image:true,
    }
  });
  if (!student) {
    return NextResponse.json({ error: "Étudiant non trouvé" }, { status: 404 });
  }
  return NextResponse.json(student, { status: 200 });
}
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    if (!id) {
        return NextResponse.json(
            { error: "Matiere ID is required" },
            { status: 400 }
        );
    }
    try {
        const matiere = await prisma.posts.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json(matiere, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred while deleting the matiere" },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate the user
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Parse the request body
    const formData = await req.formData(); // Assuming the request is sending FormData

    const postId = parseInt(params.id);
    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // Extract form fields from FormData
    const title = formData.get("title")?.toString();
    const handle = formData.get("handle")?.toString();
    const description = formData.get("description")?.toString();
    const body = formData.get("body")?.toString();
    const published = formData.get("published") === 'true'; // Convert published checkbox
    const videoUrl :File = formData.get("videoUrl") as File;

    // Check if the post exists
    const existingPost = await prisma.posts.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const truncateText = (text:any, maxLength = 155) => {
      if (!text) return '';
    
      // Ensure the text is truncated to the maximum length
      return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };
    
    if(videoUrl){
      const bytes = await videoUrl.arrayBuffer();
      const buffer = Buffer.from(bytes); // Get the video URL  
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${videoUrl.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(videoUrl.type)}`;
    
      await uploadFile(buffer, filename, videoUrl.type);
    
      // Get the URL of the uploaded file
      const fileUrl =  getFileUrl(filename);
      // Step 2: Find the associated file by videoId and get its unique id
   const file = await prisma.file.findFirst({
    where: { postId: postId },
  });

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Step 3: Update the file using its unique id
  const fileUpdate = await prisma.file.update({
    where: { id: file.id }, // Use the unique id of the file
    data: {
      fileurl: fileUrl,
    }
  });
   // Update the post data
   const updatedPost = await prisma.posts.update({
    where: { id: postId },
    data: {
      title,
      description,
      body:truncateText(body),
      published,
      handle,
      // Handle file uploads or images here if needed
    },
  });

  return NextResponse.json({updatedPost,fileUpdate}, { status: 200 });
    }else{
      const updatedPost = await prisma.posts.update({
        where: { id: postId },
        data: {
          title,
          description,
          body:truncateText(body),
          published,
          handle,
          // Handle file uploads or images here if needed
        },
      });
    
      return NextResponse.json({updatedPost}, { status: 200 });
    }
  
   

  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}

