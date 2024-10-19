import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";
import { Cocktail, CocktailMutation } from "../../type";

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  "cocktails/fetchAll",
  async () => {
    const response = await axiosApi.get<Cocktail[]>("/cocktails");
    return response.data;
  }
);

export const fetchMyCocktails = createAsyncThunk<Cocktail[], string>(
  "cocktails/fetchMy",
  async (userId) => {
    const response = await axiosApi.get<Cocktail[]>(
      `/cocktails?user=${userId}`
    );
    return response.data;
  }
);

export const fetchOneCocktail = createAsyncThunk<Cocktail, string>(
  "cocktails/fetchOne",
  async (cocktailId: string) => {
    const response = await axiosApi.get<Cocktail>(`/cocktails/${cocktailId}`);
    return response.data;
  }
);

export const createCocktail = createAsyncThunk<
  void,
  CocktailMutation,
  { state: RootState }
>("cocktails/create", async (cocktailMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const formData = new FormData();

      formData.append("name", cocktailMutation.name);
      formData.append("recipe", cocktailMutation.recipe);
      formData.append(
        "ingredients",
        JSON.stringify(cocktailMutation.ingredients)
      );

      if (cocktailMutation.image) {
        formData.append("image", cocktailMutation.image);
      }

      await axiosApi.post("/cocktails", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});

export const toggleCocktail = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("cocktails/toggle", async (cocktailId, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      await axiosApi.patch(`/cocktails/${cocktailId}/togglePublished`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
});

export const deleteCocktail = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("cocktails/delete", async (cocktailId: string, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      await axiosApi.delete(`/cocktails/${cocktailId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});
