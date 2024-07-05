'use client'

import DialogConfirmDelete from "@/components/globals/DialogConfirmDelete";
import PostEditSheet from "@/components/post/PostEditSheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deletePost, fetchPostById } from "@/services/post.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export type PostDetailParams = {
  id: string;
}

const PostDetail = () => {
  const { id } = useParams<PostDetailParams>();
  const router = useRouter();
  const { toast } = useToast()

  const { isPending, error, data } = useQuery({
    queryKey: ['getPostById', id],
    queryFn: () => fetchPostById(id)
  })

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast({
        title: 'Post deleted',
        description: 'Your post has been deleted',
      })
      router.push('/')
    }
  });

  const handleDelete = () => {
    mutation.mutate(id);
  }

  if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>
  
  return ( 
    <div className="p-8 flex flex-col gap-4 items-start">
      <Button variant="link" className="px-0">
        <Link href="/">Get back to posts list</Link>
      </Button>
      <p className="text-sm text-neutral-300 font-bold uppercase">Post</p>
      <p className="text-xs text-white bg-emerald-500 px-3 py-1 rounded-full font-bold">
        {data.category.name}
      </p>
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p>{data.description}</p>
      <div className="flex gap-4">
        <PostEditSheet postName={data.title} postDescription={data.description} />
        <DialogConfirmDelete 
          handleDelete={handleDelete} 
          isPending={mutation.isPending}
        />
      </div>
    </div>
  );
}
 
export default PostDetail;