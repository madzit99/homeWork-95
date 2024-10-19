import { Button, Grid, Typography } from "@mui/material";

interface Props {
  isPublished?: boolean;
  onDelete: () => void;
}

const InterfaceInfoUser: React.FC<Props> = ({ isPublished, onDelete }) => {
  return (
    <Grid item container>
      <Typography variant="h5">
        Статус:{" "}
        <span style={{ color: isPublished ? "green" : "#F86060" }}>
          {isPublished ? "Published" : "Your cocktail is under review"}
        </span>
      </Typography>
      <Button
        onClick={onDelete}
        color="primary"
        variant="contained"
      >
       Удалить
      </Button>
    </Grid>
  );
};

export default InterfaceInfoUser;
