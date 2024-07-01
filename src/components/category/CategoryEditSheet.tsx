'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCategory } from "@/services/category.service"
import { useParams } from 'next/navigation';
import { CategoryUpdateDTO } from '@/types/category';
import { CategoryDetailParams } from '@/app/categories/[id]/page';
import { toast } from '../ui/use-toast';

interface CategorySheetProps {
  categoryName: string;
}


const CategoryEditSheet = ({ categoryName }: CategorySheetProps) => {
  const { id } = useParams<CategoryDetailParams>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const messageCleaningTimeout = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(messageCleaningTimeout);
    }
  }, [errorMessage]);

  const mutation = useMutation({
    mutationFn: ({ id, updateCategoryDTO }: { id: string, updateCategoryDTO: CategoryUpdateDTO }) => updateCategory(id, updateCategoryDTO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCategories'] });
      queryClient.invalidateQueries({ queryKey: ['getCategoryById', id] });
      setErrorMessage(null);
      setIsOpen(false);
      toast({
        title: 'Category updated',
        description: 'Your category has been updated.',
      })
    },
    onError: () => {
      setErrorMessage('Failed to update category.');
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.target as any).name.value.trim();

    if (!name) {
      setErrorMessage('Category name cannot be empty.');
      return;
    }

    const updateCategoryDTO = { name };

    mutation.mutate({ id, updateCategoryDTO });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Edit category</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit category</SheetTitle>
          <SheetDescription>Edit the category name</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" defaultValue={categoryName} />
          </div>
          {
            errorMessage && 
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-red-500 col-span-4">{ errorMessage }</div>
            </div>
          }
          <SheetFooter>
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryEditSheet;
