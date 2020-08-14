import React, { useContext } from "react";
import { BoardContext } from "../../context/board/BoardContext";
import BoardDetails from "./BoardDetails";
import CreateBoard from "./CreateBoard";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Boards(props) {
  const { boards } = useContext(BoardContext);

  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        {boards.map((board) => {
          return <BoardDetails board={board} key={board._id} />;
        })}
        <CreateBoard />
      </Grid>
    </>
  );
}

export default Boards;
