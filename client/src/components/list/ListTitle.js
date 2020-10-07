import React, { useState, useContext } from "react";
import { ListContext } from "../../context/list/ListContext";

import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const options = ["Delete ...", "Archive this List", "Watch"];

const ITEM_HEIGHT = 48;

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
  editableTitle: {
    padding: theme.spacing(2),
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

function ListTitle({ listTitle, listId, listIndex }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const { editList, setLists, lists, deleteList, cards, setCards } = useContext(
    ListContext
  );

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const classes = useStyle();

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    console.log(e.target.innerText);
    if (e.target.innerText === "Delete ...") {
      deleteList(listId);
      const newList = [...lists];
      newList.splice(listIndex, 1);
      const newCards = [...cards];
      newCards.splice(listIndex, 1);
      setCards(newCards);
      setLists(newList);
    }
  };

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOnBlur = async () => {
    setOpen(false);
    if (title) {
      const updatedTitle = await editList(title, listId);
      setLists([...lists]);
    } else {
      setTitle(title);
    }
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

          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={openMenu}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      )}
    </>
  );
}

export default ListTitle;
