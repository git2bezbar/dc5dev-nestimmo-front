'use client';

import { useEffect, useState } from 'react';
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
import { createPost } from "@/services/post.service"
import { Textarea } from '../ui/textarea';

const PostSheet = () => {
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
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllPosts']
      });
      setErrorMessage(null);
      setIsOpen(false);
    },
    onError: () => {
      setErrorMessage('Failed to create post. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as any).name.value.trim();
    const description = (e.target as any).description.value.trim();

    if (!title || !description) {
      setErrorMessage('Post name or description cannot be empty.');
      return;
    }

    const createPostDTO = { title, description };
    mutation.mutate(createPostDTO);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <AddingButton onClick={() => setIsOpen(true)}>Create new post</AddingButton>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a post</SheetTitle>
          <SheetDescription>
            Create a new post by filling out the form below.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea id="description" name="description" className="col-span-3" />
          </div>
          {
            errorMessage && 
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-red-500 col-span-4">{ errorMessage }</div>
            </div>
          }
          <SheetFooter>
            <Button type="submit">Add post</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default PostSheet;
