export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  avatar: string;
  displayName?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface Ingredient {
  nameIngredients: string;
  amountIngredients: string;
}

export interface IngredientMutation {
  nameIngredients: string;
  amountIngredients: string;
}

export interface Cocktail {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  name: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}

export interface CocktailMutation {
  name: string;
  image: File | null;
  recipe: string;
  ingredients: IngredientMutation[];
}
