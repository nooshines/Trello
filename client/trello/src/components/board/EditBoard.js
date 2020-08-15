import React, { useContext, useState } from "react";
import { BoardContext } from "../../context/board/BoardContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, InputBase } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
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
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
}));

const EditBoard = ({ boardTitle, board, setOpenEdit }) => {
  const { editBoard, setBoards, boards } = useContext(BoardContext);
  const [title, setTitle] = useState("");

  const classes = useStyle();

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const editHandler = async () => {
    setOpenEdit(false);
    console.log("boardtitle", title);
    console.log("boardId", board._id);
    const data = await editBoard(title, board._id);
    console.log("data", data);
    setBoards([...boards]);
  };
  const cancelHandler = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <InputBase
            onChange={handleOnChange}
            defaultValue={boardTitle}
            fullWidth
          ></InputBase>
        </CardContent>
      </Card>
      <Card>
        <span
          className={classes.flexContainer}
          style={{ color: "#fafafa", cursor: "pointer" }}
        >
          <span onClick={editHandler}>Save </span>
          <span onClick={cancelHandler}>cancel</span>
        </span>
      </Card>
    </>
  );
};

export default EditBoard;
