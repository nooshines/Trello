import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../../context/board/BoardContext";
import EditBoard from "./EditBoard";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  root: {
    minWidth: 300,
    minHeight: 150,
    backgroundColor: "#EBECF0",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#616161",
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
    color: "#fafafa",
    "&:hover": {
      Color: "#f5f5f5",
    },
  },
}));

function BoardDetails({ board }) {
  const [openEdit, setOpenEdit] = useState(false);

  const { deleteBoard, setBoards, boards } = useContext(BoardContext);
  const classes = useStyles();

  const editHandler = () => {
    console.log("edit clicked");
    setOpenEdit(!openEdit);
  };

  const deleteHandler = async () => {
    console.log("delete clicked");
    const data = await deleteBoard(board._id);
    console.log("data", data);
    const allBoards = [...boards];
    const updatedBoards = allBoards.filter((board) => {
      return board._id !== data._id;
    });

    setBoards(updatedBoards);
  };

  return (
    <Grid item className={classes.card}>
      {openEdit ? (
        <EditBoard
          setOpenEdit={setOpenEdit}
          boardTitle={board.title}
          board={board}
        />
      ) : (
        <Link to={`/board/${board._id}`} style={{ textDecoration: "none" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {board.title}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      )}
      {!openEdit ? (
        <span className={classes.flexContainer}>
          <EditIcon
            className={classes.onHover}
            onClick={editHandler}
            style={{ cursor: "pointer" }}
          />
          <DeleteIcon
            className={classes.onHover}
            onClick={deleteHandler}
            style={{ cursor: "pointer" }}
          />
        </span>
      ) : (
        <span></span>
      )}
    </Grid>
  );
}

export default BoardDetails;
