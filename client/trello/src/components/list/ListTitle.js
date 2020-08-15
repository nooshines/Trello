import React, { useState, useContext } from "react";
import { ListContext } from "../../context/list/ListContext";

import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: theme.spacing(1),
    "&:focus": {
      background: "#ddd",
    },
  },
}));

function ListTitle({ listTitle, listId }) {
  const { editList, setLists, lists, getLists } = useContext(ListContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const classes = useStyle();

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOnBlur = async () => {
    setOpen(false);
    const updatedTitle = await editList(title, listId);
    setLists([...lists]);
  };

  return (
    <>
      {open ? (
        <InputBase
          onChange={handleOnChange}
          defaultValue={listTitle}
          inputProps={{
            className: classes.input,
          }}
          fullWidth
          onBlur={handleOnBlur}
        ></InputBase>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            className={classes.editableTitle}
            onClick={() => setOpen(!open)}
          >
            {listTitle}{" "}
          </Typography>
          <MoreHorizIcon />
        </div>
      )}
    </>
  );
}

export default ListTitle;
