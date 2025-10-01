"use client"

import { useState, useEffect,useRef } from 'react';
import Loading from '@/components/loading';
import { toast } from 'react-toastify';
import axios from 'axios';
import SharedHeroSection from "../../shared-layout/hero";
import CardPost from "@/components/ui/videoCard";


const BlogDetail = (params: any) => {
  const [posts,setPosts] = useState<any[]>([]);
  const [loading ,setLoading ]=useState(false);


  useEffect(() => {
    // Fetch blog data based on ID
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/video`);
        console.log(response.data)
        setPosts(response.data);
        setLoading(false)
        
      } catch (error) {
        toast.error("error to get blog")
        console.error('Error fetching blog:', error);
        setLoading(false)
      }
    };
    fetchBlog();
  }, [params.params.id]);

  if (loading) {
    return <Loading />
  }
  return (
    <div>
        <SharedHeroSection
          image="/studentsInLibrary.jpg"
          title="COURS"
          description="Découvrez notre sélection de cours conçus pour vous préparer aux défis des grandes écoles d'ingénieur. Que vous souhaitiez approfondir vos connaissances, développer de nouvelles compétences, ou vous préparer aux concours, nos cours sont adaptés à vos besoins."
        />
        <div className="px-10 py-12 ">
          <div className="mb-10 lg:px-44">
            <p className="text-3xl md:text-5xl font-bold uppercase text-emerald-700">
              Nos Cours
            </p>
            <h1>Suivez les cours gratuits de notre établissement.</h1>
          </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full lg:px-44">
         <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-10">
           {posts.map((pos:any)=>{
            if(pos.published){
              return  <div key={pos.id}>
              <CardPost post={pos} token={params.params.id}/>
            </div>
              }
            }
            )}    
  
          </div>
          <div className=" h-3 bg-yellow-400"></div>
         </div>
        </div>
      </div>
  );
};

export default BlogDetail;

