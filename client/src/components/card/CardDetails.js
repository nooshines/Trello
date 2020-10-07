import React, { useContext, useState } from "react";
import { ListContext } from "../../context/list/ListContext";
import EditCardContainer from "./EditCardContainer";

import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  flexContainer: {
    margin: theme.spacing(1),
    // display: "flex",
    justifyContent: "flex-end",
  },
  editIcon: {
    color: "#616161",
    "&:hover": {
      color: "#00e676",
    },
  },
  deleteIcon: {
    color: "#616161",
    "&:hover": {
      color: "#e53935",
    },
  },
  dateColor: {
    color: "#64b5f6",
  },
}));

function CardDetails({ card, listIndex }) {
  const { deleteCard, cards, setCards, getCards } = useContext(ListContext);
  const [openEdit, setOpenEdit] = useState(false);

  const classes = useStyle();

  const deleteHandler = async () => {
    console.log("delete clicked");
    const data = await deleteCard(card._id);
    const updatedCards = [...cards];
    updatedCards[listIndex] = updatedCards[listIndex].filter((card) => {
      return card._id !== data._id;
    });
    setCards(updatedCards);
  };

  const editHandler = () => {
    console.log("edit clicked");
    setOpenEdit(!openEdit);
  };

  const momentData = moment(card.createdAt).format("dddd, MMMM Do YYYY");

  return (
    <>
      {openEdit ? (
        <EditCardContainer
          setOpenEdit={setOpenEdit}
          oldContent={card.content}
          cardId={card._id}
          listIndex={listIndex}
        />
      ) : (
        <Paper className={classes.card}>
          <Grid item container xs={12}>
            <Grid item xs={10}>
              {card.content}
            </Grid>
            <Grid item justify="flex-end" xs={2}>
              <DeleteIcon
                fontSize="small"
                className={classes.deleteIcon}
                onClick={deleteHandler}
                style={{ cursor: "pointer" }}
              />
              <EditIcon
                fontSize="small"
                className={classes.editIcon}
                onClick={editHandler}
                style={{ cursor: "pointer" }}
              />
            </Grid>
          </Grid>
          <div>
            <small className={classes.dateColor}>{momentData}</small>
          </div>
        </Paper>
      )}
    </>
  );
}

export default CardDetails;
