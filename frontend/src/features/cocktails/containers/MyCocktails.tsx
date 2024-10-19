import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { fetchMyCocktails } from "../cocktailsThunk";
import { selectUser } from "../../users/usersSlice";
import { selectCocktails, selectCocktailsLoading } from "../cocktailsSlice";
import CocktailItem from "../components/CocktailItem";
import Preloader from "../../../UI/Preloader/Preloader";

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyCocktails(user?._id));
    }
  }, [user]);

  return (
    <>
      <Typography variant="h2" sx={{ color: "blue" }}>
        Мои коктейли
      </Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : cocktails.length > 0 ? (
        <Grid container spacing={2}>
          {cocktails.map((cocktail) => (
            <CocktailItem key={cocktail._id} cocktail={cocktail} />
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center", color: "blue" }}>
          Коктейлей пока нет!
        </Typography>
      )}
    </>
  );
};

export default MyCocktails;
