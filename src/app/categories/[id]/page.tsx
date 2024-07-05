'use client'

import CategoryEditSheet from "@/components/category/CategoryEditSheet";
import DialogConfirmDelete from "@/components/globals/DialogConfirmDelete";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteCategory, fetchCategoryById } from "@/services/category.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchPostsByCategory } from "@/services/post.service";

export type CategoryDetailParams = {
  id: string;
}

const CategoryDetail = () => {
  const { id } = useParams<CategoryDetailParams>();
  const router = useRouter();
  const { toast } = useToast();

  const { isPending, data } = useQuery({
    queryKey: ['getCategoryById', id],
    queryFn: () => fetchCategoryById(id)
  })

  const { data: dataByCategory } = useQuery({
    queryKey: ['getPostsFromCategory', id],
    queryFn: () => fetchPostsByCategory(id)
  })

  const hasPosts = dataByCategory?.length > 0;

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast({
        title: 'Category deleted',
        description: 'Your category has been deleted',
      })
      router.push('/categories')
    }
  });

  const handleDelete = () => {
    mutation.mutate(id);
  }

  if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>
  
  return ( 
    <div className="p-8 flex flex-col gap-4 items-start">
      <Button variant="link" className="px-0">
        <Link href="/categories">Get back to categories list</Link>
      </Button>
      <p className="text-sm text-neutral-300 font-bold uppercase">Category</p>
      <h1 className="text-4xl font-bold">{data.name}</h1>
      <div className="flex gap-4">
        <CategoryEditSheet categoryName={data.name} />
        <DialogConfirmDelete 
          handleDelete={handleDelete} 
          isPending={mutation.isPending}
          isDisabled={hasPosts}
        />
      </div>
      { 
        hasPosts &&
        <p className="text-sm text-neutral-300">You can&apos;t delete a category with posts</p>
      }
    </div>
  );
}
 
export default CategoryDetail;