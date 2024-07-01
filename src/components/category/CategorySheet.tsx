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
import AddingButton from "../globals/AddingButton"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "@/services/category.service"

const CategorySheet = () => {
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
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllCategories']
      });
      setErrorMessage(null);
      setIsOpen(false);
    },
    onError: () => {
      setErrorMessage('Failed to create category.');
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.target as any).name.value.trim();

    if (!name) {
      setErrorMessage('Category name cannot be empty.');
      return;
    }

    const createCategoryDTO = { name };
  
    mutation.mutate(createCategoryDTO);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <AddingButton onClick={() => setIsOpen(true)}>Create new category</AddingButton>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New category</SheetTitle>
          <SheetDescription>Enter the category name</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" />
          </div>
          {
            errorMessage && 
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-red-500 col-span-4">{ errorMessage }</div>
            </div>
          }
          <SheetFooter>
            <Button type="submit">Create</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySheet;
