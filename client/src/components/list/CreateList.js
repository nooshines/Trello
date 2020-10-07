import React, { useContext, useState } from "react";
import { ListContext } from "../../context/list/ListContext";
import { withRouter } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "40ch",
    },
    display: "flex",
  },
}));

function CreateList(props) {
  const classes = useStyles();
  const boardId = props.match.params.boardId;

  const { createList, setLists, lists, setCards, cards } = useContext(
    ListContext
  );

  const [title, setTitle] = useState("");

  const createListHandler = async (e) => {
    e.preventDefault();
    if (title) {
      const newList = await createList(title, boardId);
      console.log("newlist", newList);
      setLists([...lists, newList]);
      setCards([...cards, []]);
      setTitle("");
    }
  };

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div className={classes.root}>
        <form
          onSubmit={createListHandler}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="+ Add a New List"
            type="text"
            name="title"
            value={title}
            onChange={onChangeHandler}
          />
        </form>
      </div>
    </>
  );
}

export default withRouter(CreateList);
