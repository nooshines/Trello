import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/list/ListContext";

import CardDetails from "./CardDetails";
import CreateCardContainer from "./CreateCardContainer";

import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));

const Cards = ({ listId, listIndex }) => {
  const { cards, getCards, lists } = useContext(ListContext);

  const classes = useStyle();

  return (
    <>
      <div className={classes.cardContainer}>
        {cards[listIndex] &&
          cards[listIndex].map((card, index) => {
            return (
              <Draggable
                key={card._id}
                draggableId={card._id}
                index={index}
                listIndex={listIndex}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <CardDetails card={card} listIndex={listIndex} />
                  </div>
                )}
              </Draggable>
            );
          })}
      </div>
      <CreateCardContainer listId={listId} listIndex={listIndex} />
    </>
  );
};

export default Cards;
