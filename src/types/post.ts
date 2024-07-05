import { Category } from "./category";

export interface PostCreateDTO {
  title: string;
  description: string;
  category: {
    id: number;
    name?: string;
  };
}

export interface PostUpdateDTO extends PostCreateDTO {}

export interface Post extends PostCreateDTO {
  id: number;
}
