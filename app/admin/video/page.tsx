"use client";
import { Button } from "@/components/ui/button";
import PostsComponent from "../_components/video";
import FileUploader from "@/components/fileUploadPost";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import Loading from "@/components/loading";

const PostsPage = () => {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File>();
  // Use the hook inside the component
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(()=>{
    const getInfos = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedPost = await axios.get("/api/video");
        setPosts(fetchedPost.data);
        console.log(fetchedPost.data)
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getInfos();
  },[update])

  const addNews = async (formData: FormData) => {
    if(files){

    try {
        setLoading(true);   
           // Append files to FormData
           formData.append("files", files); // Append each file to the FormData
      
 
        // Convert "publiched" to boolean before sending it to the API
        const response = await axios.post("/api/video", formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for handling files
            },
          });
        
        if (response.status === 201) {
            toast.success("Le contenu a été ajouté avec succès");
            setUpdate(!update);
            setLoading(false);
        } else {
            toast.error("Une erreur est survenue rrrrr");
            setLoading(false);
        }
    } catch (error) {
        toast.error(`Une erreur est survenue ${error}`);
        console.log(error)
        setLoading(false);
    }
  }
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);    
    const isPublished = e.currentTarget.published.checked;
    formData.set("published", isPublished.toString());

    addNews(formData);
};
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
    setFiles(event.target.files[0]);
  }
};

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
        <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 mt-5">
            <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-2xl font-semibold mb-4">Ajouter une vidéo</h1>
                <h1 className="text-lg font-semibold mb-4">Ici, vous pouvez ajouter une vidéo</h1>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                <Button>Ajouter vidéo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2/3">
                <DialogHeader>
                    <DialogTitle>Ajouter une vidéo</DialogTitle>
                    <DialogDescription>
                    Veuillez renseigner le titre de la vidéo à ajouter
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border-lg p-4 space-y-2 border"
                >
                    <Input placeholder="Titre de la vidéo" name="title" required />

                    <AutosizeTextarea
                    placeholder="La description"
                    name="description"
                    required
                    />

                    <label className="inline-flex items-center me-5 cursor-pointer">
                    <Input type="checkbox" name="published" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Publier</span>
                    </label>
                    <input
                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        id="formFileLg"
                        type="file"
                        onChange={handleFileChange}
                      />
                    <div className="space-x-2">
                    <Button type="submit" className="float-right">
                        Ajouter
                    </Button>
                    </div>
                </form>
                </DialogContent>
            </Dialog>
            </div>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-10">
            {posts.map((pst) => (
            <div key={pst.id}>
                <PostsComponent post={pst} reload={() => setUpdate(!update)} />
            </div>
            ))}
        </div>
        </div>

  );
};

export default PostsPage;
