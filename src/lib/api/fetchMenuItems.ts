import {
  fetchMenuItemsStart,
  fetchMenuItemsSuccess,
  fetchMenuItemsFailure,
} from "@/app/store/slices/menuItemSlice";
import { AppDispatch } from "@/app/store/store";

export const fetchMenuItems = async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchMenuItemsStart());
    const menuRes = await fetch("/api/menu/get");
    const menuData = await menuRes.json();
    dispatch(fetchMenuItemsSuccess(menuData));
    return menuData;
  } catch (error) {
    dispatch(fetchMenuItemsFailure("Failed to load categories"));
    return [];
  }
};
