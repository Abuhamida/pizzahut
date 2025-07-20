import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "@/app/store/slices/categorySlice";
import { AppDispatch } from "@/app/store/store";

export const fetchCategories = async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCategoriesStart());
    const res = await fetch("/api/categories/get");
    const data = await res.json();
    dispatch(fetchCategoriesSuccess(data));
    return data;
  } catch (error) {
    dispatch(fetchCategoriesFailure("Failed to load categories"));
    return [];
  }
};
