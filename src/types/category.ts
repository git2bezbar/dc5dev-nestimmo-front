export interface CategoryCreateDTO {
  name: string;
}

export interface CategoryUpdateDTO extends CategoryCreateDTO {}

export interface Category extends CategoryCreateDTO {
  id: number;
}
