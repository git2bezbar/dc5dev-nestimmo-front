'use client'

import { fetchAllPosts } from "@/services/post.service";
import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PostSheet from "./PostSheet";

const PostList = () => {
  const { isPending, data } = useQuery({
    queryKey: ['getAllPosts'],
    queryFn: fetchAllPosts
  })

  if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>

  return ( 
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl font-bold">Posts list</h2>
      <div className="grid grid-cols-4 gap-4">
        <PostSheet />
        { data?.map((post: Post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="bg-neutral-50 border-2 border-neutral-100 rounded-xl p-8 flex flex-col gap-2 hover:-translate-y-1 hover:bg-neutral-100 duration-300"
          >
            <p className="text-xs text-white bg-emerald-500 px-3 py-1 rounded-full font-bold self-end">{post.category.name}</p>
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-sm text-gray-500">
              {
                post.description.length > 100 
                ? `${post.description.substring(0, 100)}...` 
                : post.description
              }
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
 
export default PostList;