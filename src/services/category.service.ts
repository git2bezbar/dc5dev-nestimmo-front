import { CategoryCreateDTO, CategoryUpdateDTO } from "@/types/category";
import { CATEGORY_ENDPOINT } from "@/utils/constants";

export const fetchAllCategories = async () => {
  const response = await fetch(CATEGORY_ENDPOINT);
  const data = await response.json();
  return data;
}

export const fetchCategoryById = async (id: string) => {
  const response = await fetch(`${CATEGORY_ENDPOINT}/${id}`);
  const data = await response.json();
  return data;
}

export const createCategory = async (createCategoryDTO: CategoryCreateDTO) => {
  const response = await fetch(CATEGORY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createCategoryDTO)
  });
  const data = await response.json();
  return data;
}

export const updateCategory = async (id: string, updateCategoryDTO: CategoryUpdateDTO) => {
  const response = await fetch(`${CATEGORY_ENDPOINT}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateCategoryDTO)
  });
  const data = await response.json();
  return data;
}

export const deleteCategory = async (id: string) => {
  const response = await fetch(`${CATEGORY_ENDPOINT}/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}