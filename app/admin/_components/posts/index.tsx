"use client";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FileUploader from "@/components/fileUploadPost";

const PostsComponents = ({ post, reload }: any) => {
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<any[]>(post.image);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File>();

  useEffect(() => {
    images.map((img:any) => setFileUrl(img.fileurl));
  }, [images]);

  const deleteContent = async () => {
    try {
      const response = await axios.delete(`/api/posts/${post.id}`);
      if (response.status === 200) {
        toast.success("Le contenu a été supprimé avec succès");
        reload();
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const updatePost = async (formData: FormData) => {
    try {
      setLoading(true);
      // Send data to update the post
      const response = await axios.put(`/api/posts/${post.id}`, formData);
      if (response.status === 200) {
        toast.success("Le contenu a été modifié avec succès");
        reload();
        
      } else {
        toast.error("Une erreur est survenue");
      }
    } catch (error) {
      toast.error(`Une erreur est survenue: ${error}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create FormData from form inputs
    const formData = new FormData(e.currentTarget);
    const isPublished = e.currentTarget.published.checked; // For checkbox value
    formData.set("published", isPublished.toString()); // Convert to string for API
   // Append the uploaded video URL
   if (files) {
    formData.append("videoUrl", files); // This is the video URL returned by FileUploader
  }
    updatePost(formData);
  };
 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files[0]);
    }
  };
  return (
  <Card key={post.id} className="w-full max-w-sm h-96 flex flex-col justify-between">
  <CardHeader className="flex flex-col justify-between h-full">
    <div>
      <img
        src={fileUrl || "/LogoVertical.png"}
        alt="article image"
        width={600}
        height={400}
        className="w-full object-cover h-52 mb-4"
      />
      <CardTitle className="truncate w-full">{post.title}</CardTitle>
      <CardDescription className="line-clamp-1	 ">
        {post.description}
      </CardDescription>
    </div>
    <div className="flex justify-end mt-4 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Modifier</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl sm:max-w-2xl md:max-w-3xl lg:max-w-6xl">
          <DialogHeader>
            <DialogTitle>Modifier l'article</DialogTitle>
            <DialogDescription>
              Veuillez renseigner les informations de l'article
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 border"
          >
            <div className="grid grid-cols-2 gap-5">
            <div>
            <Label className="text-gray-600 font-sans">Le titre</Label>
            <Input
              placeholder="Titre d'article"
              name="title"
              defaultValue={post.title}
              required
            />
            </div>
           
            <div>
            <Label className="text-gray-600 font-sans">Meta titre</Label>
            <Input
              placeholder="Meta title"
              name="handle"
              defaultValue={post.handle}
              required
            /></div>
            
            </div>
            <div className="my-3">
            <Label className="text-gray-600 font-sans">Meta description</Label>
            <AutosizeTextarea
              placeholder="Meta Description"
              name="body"
              defaultValue={post.body}
              required
            /></div>
           
              <div className="overflow-y-auto h-72 my-3">
              <Label className="text-gray-600 font-sans">La description</Label>
              <AutosizeTextarea
                placeholder="La description"
                name="description"
                defaultValue={post.description}
                required
              /> </div>
             <input
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                id="formFileLg"
                type="file"
                onChange={handleFileChange}
              />
              <div className="w-full flex justify-end my-3">
              <label className="inline-flex items-center me-5 cursor-pointer">
              <Input
                type="checkbox"
                name="published"
                defaultChecked={post.published}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Publier
              </span>
            </label></div>
            <div className="space-x-2">
              <Button type="submit" className="float-right" disabled={loading}>
                Modifier
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog>
              <AlertDialogTrigger asChild>
                      <Button className="border-2 border-red-700 ml-2 text-red-600 bg-white hover:text-white hover:bg-red-600" >
                      Supprimer
                    </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûrs?</AlertDialogTitle>
                          <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={deleteContent}>
                            Continuer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>   
      
    </div>
  </CardHeader>
</Card>
  );
};

export default PostsComponents;
