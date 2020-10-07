import React, { useContext, useEffect } from "react";
import { ListContext } from "../../context/list/ListContext";
import ListDetails from "../../components/list/ListDetails";
import CreateList from "../../components/list/CreateList";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { DragDropContext } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // height: 140,
    // width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Lists({ boardId }) {
  const {
    getLists,
    lists,
    reorder,
    setLists,
    cards,
    move,
    setCards,
  } = useContext(ListContext);

  const classes = useStyles();

  useEffect(() => {
    allLists();
  }, []);

  const allLists = async () => {
    await getLists(boardId);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    //if there is no destination return
    if (!destination) {
      return;
    }
    //within one list
    if (destination.draggableId === source.draggableId) {
      const findListIndex = lists.findIndex((list) => {
        return list._id === source.droppableId;
      });
      if (findListIndex !== undefined) {
        reorder(findListIndex, source.index, destination.index);
      }
    }
    //between different lists
    if (destination.droppableId !== source.droppableId) {
      const findListSourceIndex = lists.findIndex((list) => {
        return list._id === source.droppableId;
      });
      const findListDestinationIndex = lists.findIndex((list) => {
        return list._id === destination.droppableId;
      });

      if (
        findListDestinationIndex !== undefined &&
        findListSourceIndex !== undefined
      ) {
        move(
          findListSourceIndex,
          findListDestinationIndex,
          source,
          destination
        );
      }
    }
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map((list, index) => {
          return (
            <div key={list._id}>
              <ListDetails list={list} listIndex={index} />
            </div>
          );
        })}
        <CreateList />
      </DragDropContext>
    </Grid>
  );
}

export default Lists;
