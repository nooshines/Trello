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

function CreateCard({ setOpen, listId, listIndex }) {
  const classes = useStyle();

  const { cards, setCards, createCard } = useContext(ListContext);
  const [content, setContent] = useState("");

  const createCardHandler = async (e) => {
    if (content) {
      const cardContent = content;
      setContent("");
      const newCard = await createCard(content, cards.length, listId);
      const updateCards = [...cards];
      updateCards[listIndex].push(newCard);
      setCards(updateCards);

      setOpen(false);
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
            onBlur={() => setOpen(false)}
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            value={content}
            placeholder="Enter Card Content ..."
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={createCardHandler}>
          Add Card
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </>
  );
}

export default CreateCard;
