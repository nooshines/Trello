import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../../context/board/BoardContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: "#EBECF0",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  underline: {
    "&:before": {
      height: 0,
    },
  },
  onHover: {
    "&:hover": {
      Color: "EBECF0",
    },
  },
});

function BoardDetails({ board }) {
  const { deleteBoard, editBoard, getBoards, setBoards, boards } = useContext(
    BoardContext
  );
  const classes = useStyles();

  const editHandler = () => {
    console.log("edit clicked");
  };

  const deleteHandler = () => {
    console.log("delete clicked");
    deleteBoard(board._id);
    setBoards([...boards]);
    // getBoards();
  };

  return (
    <Grid item>
      <Link to={`/board/${board._id}`} style={{ textDecoration: "none" }}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {board.title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
      <Card>
        <span className={classes.flexContainer}>
          <EditIcon className={classes.onHover} onClick={editHandler} />
          <DeleteIcon onClick={deleteHandler} />
        </span>
      </Card>
    </Grid>
  );
}

export default BoardDetails;
