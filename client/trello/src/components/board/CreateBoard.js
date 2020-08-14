import React, { useContext, useState } from "react";
import { BoardContext } from "../../context/board/BoardContext";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function CreateBoard(props) {
  const { createBoard, setBoards, boards } = useContext(BoardContext);

  const [title, setTitle] = useState("");

  const createBoardHandler = async (e) => {
    e.preventDefault();
    if (title) {
      const newBoard = await createBoard(title);
      console.log("newboard", newBoard);
      setBoards([...boards, newBoard]);
      setTitle("");
    }
  };

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const classes = useStyles();

  return (
    <>
      <form
        onSubmit={createBoardHandler}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="+ new board"
          name="title"
          variant="standard"
          value={title}
          onChange={onChangeHandler}
        />
        {/* <input
          type="text"
          name="title"
          placeholder="+ new board "
          value={title}
          onChange={onChangeHandler}
        /> */}
      </form>
    </>
  );
}

export default CreateBoard;
