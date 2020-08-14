import React, { useContext, useState } from "react";
import { ListContext } from "../../context/list/ListContext";
import editCardContainer from "./editCardContainer";

import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
  flexContainer: {
    margin: theme.spacing(1),
    display: "flex",
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

function CardDetails({ card }) {
  const { editCard, deleteCard, cards, setCards, getCards } = useContext(
    ListContext
  );
  const [openEdit, setOpenEdit] = useState(false);

  const classes = useStyle();

  const deleteHandler = async () => {
    console.log("delete clicked");
    const data = await deleteCard(card._id);
    console.log("data", data);
    // setCards(
    //   cards.filter((card) => {
    //     card._id !== data._id;
    //   })
    // );
  };

  const editHandler = () => {
    console.log("edit clicked");
    setOpenEdit(!openEdit);
  };

  const momentData = moment(card.createdAt.substring(0, 23))
    .add(10, "hour")
    .format("YYYY-mm-dd");

  return (
    <>
      {openEdit ? (
        <editCardContainer setOpenEdit={setOpenEdit} />
      ) : (
        <Paper className={classes.card}>
          {card.content}
          <span className={classes.flexContainer}>
            <DeleteIcon
              className={classes.deleteIcon}
              onClick={deleteHandler}
              style={{ cursor: "pointer" }}
            />
            <EditIcon
              className={classes.editIcon}
              onClick={editHandler}
              style={{ cursor: "pointer" }}
            />
          </span>
          <div>
            <small className={classes.dateColor}>{momentData}</small>
          </div>
        </Paper>
      )}
    </>
  );
}

export default CardDetails;
