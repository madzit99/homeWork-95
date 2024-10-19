import { Box, CardMedia, Grid, Typography, styled } from "@mui/material";
import { API_URL } from "../../../constants";
import { NavLink } from "react-router-dom";
import { Cocktail } from "../../../type";

interface Props {
  cocktail: Cocktail;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const CocktailItem: React.FC<Props> = ({ cocktail }) => {
  let cardImage = API_URL + "/" + cocktail.image;

  return (
    <Grid item lg={3}>
      <Link to={`/cocktails/${cocktail._id}`}>
        <Box sx={{ border: "none", mb: "40px" }}>
          <CardMedia
            component="img"
            height="360"
            image={cardImage}
            sx={{
              bgcolor: "#fff",
              boxShadow: "4px 9px 13px -4px rgba(0,0,0,0.31)",
            }}
          />
          <Typography
            variant="h4"
            component="div"
            sx={{ textDecoration: "none", mt: "10px", textAlign: "center" }}
          >
            {cocktail.name}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ textDecoration: "none", mt: "10px", textAlign: "center" }}
          >
            Автор: {cocktail.user.displayName}
          </Typography>
        </Box>
      </Link>
    </Grid>
  );
};

export default CocktailItem;
