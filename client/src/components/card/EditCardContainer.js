import React, { useContext, useState } from "react";
import { ListContext } from "../../context/list/ListContext";

import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  card: {
    width: "280px",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      background: fade("#5AAC44", 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));

function EditCardContainer({ setOpenEdit, oldContent, cardId, listIndex }) {
  const { cards, setCards, createCard, editCard } = useContext(ListContext);
  const [content, setContent] = useState("");

  const classes = useStyle();

  const editCardHandler = async (e) => {
    const updateCard = await editCard({ content }, cardId);
    setOpenEdit(false);
    const updatedCards = [...cards];
    const findCardIndex = updatedCards[listIndex].findIndex((card) => {
      return card._id === updateCard._id;
    });
    if (findCardIndex !== undefined) {
      updatedCards[listIndex][findCardIndex] = updateCard;
      setCards(updatedCards);
    }
  };

  const onChangeHandler = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={onChangeHandler}
            multiline
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            defaultValue={oldContent}
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={editCardHandler}>
          Save
        </Button>
        <IconButton onClick={() => setOpenEdit(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </>
  );
}

export default EditCardContainer;
