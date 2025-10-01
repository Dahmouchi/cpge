"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File, X } from "lucide-react";
import { RotatingTriangles } from "react-loader-spinner";
import axios from "axios";

export default function FileUploader({ setFilesToUpload, type }: any) {
  const [imageUrl, setImageUrl] = useState("/images/placeholder-image.jpg");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    setLoading(true);
    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }
    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`/api/prof/classes/[id]/${type}/file`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }
      const data: { fileUrl: string; fileType: string } = await res.json();
      setLoading(false);
      setFiles([...files, data]);
      setFilesToUpload([...files, data]);
      setImageUrl(data.fileUrl);
    } catch (error) {
      console.error("something went wrong, check your console.");
    }
    e.target.type = "text";
    e.target.type = "file";
  };
  const removeFile = async (index: any) => {
    try {
      const response = await axios.delete(
        `/api/prof/classes/[id]/${type}/file`,
        {
          data: {
            filePath: files[index].fileUrl,
          },
        }
      );
      if (response.status === 200) {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        setFilesToUpload(newFiles);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <Input type="file" onChange={onFileChange} className="mb-2" />
      {loading && (
        <RotatingTriangles
          visible={true}
          height="80"
          width="80"
          ariaLabel="rotating-triangles-loading"
        />
      )}
      {files.length > 0 && (
        <div className="flex flex-row space-x-2">
          {files.map((file) => {
            if (file.fileType === "application/pdf") {
              return (
                <Card
                  key={files.indexOf(file)}
                  className="relative w-[100px] h-[130px] p-4 flex flex-col justify-center items-center"
                >
                  <div className="absolute right-2 top-2">
                    <X
                      className="cursor-pointer z-5"
                      onClick={() => removeFile(files.indexOf(file))}
                    />
                  </div>
                  <File className="w-10 h-10" />
                  <h1 className="text-sm line-clamp-2 text-center">
                    {file.fileName}
                  </h1>
                </Card>
              );
            } else {
              return (
                <Card
                  key={files.indexOf(file)}
                  className="relative w-[100px] h-[130px] p-4 flex flex-col justify-center items-center"
                >
                  <div className="absolute right-2 top-2">
                    <X
                      className="cursor-pointer z-5"
                      onClick={() => removeFile(files.indexOf(file))}
                    />
                  </div>
                  <Image
                    src={file.fileUrl}
                    alt={file.fileName}
                    width={100}
                    height={100}
                  />
                </Card>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
