import { Grid, Typography } from "@mui/material";
import {  useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { selectUser } from "../../users/usersSlice";
import Preloader from "../../../UI/Preloader/Preloader";
import CoctailItem from "../components/CocktailItem";
import { selectCocktails, selectCocktailsLoading } from "../cocktailsSlice";
import { fetchCocktails } from "../cocktailsThunk";

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);
  return (
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontWeight: "bold", mb: "15px", color: "blue" }}
      >
        Коктейли
      </Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : cocktails.length > 0 ? (
        <Grid container spacing={4} alignItems="center">
          {cocktails.map((cocktail) => {
            const isAdmin = user && user.role === "admin";
            const isOwner = user && cocktail.user._id === user._id;
            const shouldDisplay = cocktail.isPublished || isAdmin || isOwner;
            return shouldDisplay ? (
              <CoctailItem key={cocktail._id} cocktail={cocktail} />
            ) : null;
          })}
        </Grid>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center", color: "blue" }}>
          Коктейлей пока нет!
        </Typography>
      )}
    </>
  );
};

export default Cocktails;
