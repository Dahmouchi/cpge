"use client"

import SharedHeroSection from "../shared-layout/hero";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CardPost from "@/components/ui/cardPost"
import Loading from "@/components/loading";
const BlogPage = () => {
  const [loading, setLoading] = useState(false);
  const [posts,setPosts] = useState<any[]>([]);

  useEffect(()=>{
    const getInfos = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedPost = await axios.get("/api/posts");
        setPosts(fetchedPost.data);
        console.log(fetchedPost.data)
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getInfos();
  },[])
  if(loading){
    return <Loading />
  }
  return (
    <>
      <div>
        <SharedHeroSection
          image="/studentsInLibrary.jpg"
          title="Blog"
          description="Où nous partageons des insights précieux, des conseils pratiques et les dernières actualités sur l'éducation et les classes préparatoires. Que vous soyez un étudiant en quête de stratégies pour réussir vos concours, un parent souhaitant mieux comprendre le parcours académique de votre enfant, ou simplement curieux d'en savoir plus sur les filières et les méthodes pédagogiques."
        />
        <div className="px-10 py-12 ">
          <div className="mb-10 lg:px-44">
            <p className="text-3xl md:text-5xl font-bold uppercase text-emerald-700">
              Nos articles
            </p>
            <h1>Suivez l&apos;actualité de notre établissement.</h1>
          </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full lg:px-44">
         <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-10">
           {posts.map((pos:any)=>{
            if(pos.published){
              return  <div key={pos.id}>
              <CardPost post={pos}/>
            </div>
              }
            }
            )}    
          </div>
          <div className=" h-3 bg-yellow-400"></div>
         </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
