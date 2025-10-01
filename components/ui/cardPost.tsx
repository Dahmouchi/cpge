"use client"

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from "next/link";

const CardPost = ({ post }: any) => {
    const [filUrl, setFileUrl] = useState<string | undefined>(undefined);
    const [images, setImage] = useState<any[]>(post.image);

    const variants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i: any) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.3,
                duration: 0.6,
            },
        }),
    };

    useEffect(() => {
        images.map((img) => setFileUrl(img.fileurl));
    }, [images]);  // Added 'images' as a dependency

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.5 }}
            variants={variants}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm h-96 flex flex-col justify-between group"
            >
            <img
                src={filUrl || "/LogoVertical.png"}
                alt={post.title}
                className="w-full h-48 object-cover border-b-4 border-emerald-700"
            />

            {/* Overlay with hover effect */}
            <div className="absolute inset-0 bg-emerald-700 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold">{post.title}</h3>
                <p className="text-white line-clamp-3">{post.description}</p>
                
                <div className="mt-4 flex justify-end">
                {/* "Read More" button with animation */}
                <Link href={`/blog/${post.id}`}>
                <button className="bg-white text-emerald-700 px-4 py-2 rounded-full opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                    Read More
                </button>
                </Link>
                </div>      
            </div>
            <div className="p-6 flex flex-col  h-full">
                <h3 className="text-xl font-bold mb-2 truncate">{post.title}</h3>
                <p className="text-gray-600 line-clamp-3">{post.description}</p>
            </div>
            </motion.div>

    );
}

export default CardPost;
