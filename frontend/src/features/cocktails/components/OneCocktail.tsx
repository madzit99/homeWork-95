import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectCocktailsLoading,
  selectSingleCocktail,
} from "../cocktailsSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCocktail,
  fetchOneCocktail,
  toggleCocktail,
} from "../cocktailsThunk";
import { API_URL } from "../../../constants";
import { selectUser } from "../../users/usersSlice";
import InterfaceInfoAdmin from "../../../UI/InterfaceInfo/InterfaceInfoAdmin";
import InterfaceInfoUser from "../../../UI/InterfaceInfo/InterfaceInfoUser";
import Preloader from "../../../UI/Preloader/Preloader";

const OneCocktail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const cocktail = useAppSelector(selectSingleCocktail);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneCocktail(id));
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (cocktail) {
      await dispatch(deleteCocktail(cocktail?._id));
    }
    navigate("/");
  };

  const handleToggle = async () => {
    if (cocktail) {
      await dispatch(toggleCocktail(cocktail?._id));
      if (id) {
        await dispatch(fetchOneCocktail(id));
      }
    }
  };

  const cocktailImg = cocktail ? API_URL + "/" + cocktail.image : "";
  let interfaceInfo;

  if (user && user.role === "admin") {
    interfaceInfo = (
      <InterfaceInfoAdmin
        isPublished={cocktail?.isPublished}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    );
  } else if (
    user &&
    user._id === cocktail?.user._id &&
    !cocktail?.isPublished
  ) {
    interfaceInfo = (
      <InterfaceInfoUser
        isPublished={cocktail.isPublished}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <>
      {loading ? (
        <Preloader loading={loading} />
      ) : (
        <Grid container direction="column">
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <Box
                component="img"
                sx={{
                  display: "block",
                  width: "100%",
                  maxHeight: "500px",
                  height: "auto",
                  border: "2px solid blue",
                  borderRadius: "5px",
                }}
                src={cocktailImg}
              />
            </Grid>
            <Grid item container xs={8} direction="column">
              <Typography variant="h1">{cocktail?.name}</Typography>
              {interfaceInfo}
              <Typography variant="h3">Ингредиент:</Typography>
              {cocktail?.ingredients.map((ingredient, index) => (
                <Typography variant="h6" key={index}>
                  <span style={{ color: "blue" }}>{ingredient.nameIngredients}</span>-{" "}
                  {ingredient.amountIngredients}
                </Typography>
              ))}
            </Grid>
          </Grid>
          <Grid item container direction="column">
            <Typography variant="h3">Рецепт:</Typography>
            <Typography variant="h5">{cocktail?.recipe}</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OneCocktail;
