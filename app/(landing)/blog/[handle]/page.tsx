"use client"
import { BellDot } from "lucide-react";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Loading from '@/components/loading';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';

// Define your animations
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BlogDetail = (params: any) => {
  const [blog, setBlog] = useState<any>();
  const [loading ,setLoading ]=useState(false);
  const [filUrl, setFileUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Fetch blog data based on ID
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/posts/${params.params.handle}`);
        console.log(response.data)
        setBlog(response.data);
        setFileUrl(response.data.image[0].fileurl)
        setLoading(false)
        
      } catch (error) {
        toast.error("error to get blog")
        console.error('Error fetching blog:', error);
        setLoading(false)
      }
    };
    fetchBlog();
  }, [params.params.handle]);

  if (loading) {
    return <Loading />
  }
  return (
    <div className="p-5 lg:px-44 py-20">
     <div className="flex items-center text-sm text-gray-500 gap-3">
      <BellDot  /> 
      <div>
        <h1 className="flex flex-row gap-2">
          <Link href={"/blog"} className="hover:text-emerald-600 hover:font-bold">
            / Blog 
            </Link> <h1 className="text-emerald-600 font-bold">/ {blog?.title}</h1></h1>
      </div>
     </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
         <h1 className="text-3xl font-bold mb-4 text-emerald-700 uppercase my-6">{blog?.title}</h1>
        <img
          src={filUrl || '/LogoVertical.png'}
          alt="hello"
          className="w-full h-auto object-cover"
        />
        <div className="p-6">
          <p className="text-gray-600 mb-6 whitespace-pre-wrap">{blog?.description}</p>
        </div>
        
      </motion.div>
    </div>
  );
};

export default BlogDetail;

