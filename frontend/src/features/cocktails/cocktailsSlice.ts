import { createSlice } from "@reduxjs/toolkit";
import { Cocktail } from "../../type";
import {
  fetchCocktails,
  fetchMyCocktails,
  fetchOneCocktail,
} from "./cocktailsThunk";

export interface CoctailState {
  cocktails: Cocktail[];
  singleCocktail: Cocktail | null;
  fetchLoading: boolean;
}

const initialState: CoctailState = {
  cocktails: [],
  singleCocktail: null,
  fetchLoading: false,
};

export const coctailSlise = createSlice({
  name: "coctails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.cocktails = cocktails;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchMyCocktails.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchMyCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.cocktails = cocktails;
      })
      .addCase(fetchMyCocktails.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchOneCocktail.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, { payload: cocktail }) => {
        state.fetchLoading = false;
        state.singleCocktail = cocktail;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectSingleCocktail: (state) => state.singleCocktail,
    selectCocktailsLoading: (state) => state.fetchLoading,
  },
});

export const coctailsReduser = coctailSlise.reducer;

export const { selectCocktails, selectSingleCocktail, selectCocktailsLoading } =
  coctailSlise.selectors;
