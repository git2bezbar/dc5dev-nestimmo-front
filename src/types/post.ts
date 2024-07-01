export interface PostCreateDTO {
  title: string;
  description: string;
}

export interface PostUpdateDTO extends PostCreateDTO {}

export interface Post extends PostCreateDTO {
  id: number;
}
