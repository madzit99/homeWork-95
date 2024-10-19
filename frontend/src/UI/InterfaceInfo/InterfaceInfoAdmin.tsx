import { Button, Grid, Typography } from "@mui/material";

interface Props {
  isPublished?: boolean;
  onDelete: () => void;
  onToggle: () => void;
}

const InterfaceInfoAdmin: React.FC<Props> = ({
  isPublished,
  onDelete,
  onToggle,
}) => {
  return (
    <Grid item container>
      <Typography variant="h5">
        Статус:{" "}
        <span style={{ color: isPublished ? "green" : "red" }}>
          {isPublished ? "Published" : "Not published"}
        </span>
      </Typography>
      <Button
        onClick={onToggle}
        color="primary"
        variant="contained"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
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

export default InterfaceInfoAdmin;
