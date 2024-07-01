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
import { updatePost } from "@/services/post.service"
import { Textarea } from '../ui/textarea';
import { useParams } from 'next/navigation';
import { PostDetailParams } from '@/app/posts/[id]/page';
import { PostUpdateDTO } from '@/types/post';
import { toast } from '../ui/use-toast';

interface PostSheetProps {
  postName: string;
  postDescription: string;
}

const PostEditSheet = ({ postName, postDescription }: PostSheetProps) => {
  const { id } = useParams<PostDetailParams>();
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
    mutationFn: ({ id, updatePostDTO }: { id: string, updatePostDTO: PostUpdateDTO }) => updatePost(id, updatePostDTO),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllPosts'] });
      queryClient.invalidateQueries({ queryKey: ['getPostById', id] });
      setErrorMessage(null);
      setIsOpen(false);
      toast({
        title: 'Post updated',
        description: 'Your post has been updated.',
      })
    },
    onError: () => {
      setErrorMessage('Failed to update post. Please try again.');
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

    const updatePostDTO = { title, description };
    mutation.mutate({ id, updatePostDTO });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Edit post</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit post</SheetTitle>
          <SheetDescription>
            Edit the post name and description
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              className="col-span-3"
              defaultValue={postName}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              className="col-span-3"
              rows={15}
              defaultValue={postDescription}
            />
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

export default PostEditSheet;
