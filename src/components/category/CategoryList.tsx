'use client'

import { fetchAllCategories } from "@/services/category.service";
import { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import CategorySheet from "./CategorySheet";

const CategoryList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: fetchAllCategories
  })

  if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>

  return ( 
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl font-bold">Categories list</h2>
      <div className="grid grid-cols-4 gap-4">
        <CategorySheet />
        { data?.map((category: Category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="bg-neutral-50 border-2 border-neutral-100 rounded-xl p-8 flex flex-col gap-4 hover:-translate-y-1 hover:bg-neutral-100 duration-300"
          >
            <h3 className="text-xl font-bold">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
 
export default CategoryList;