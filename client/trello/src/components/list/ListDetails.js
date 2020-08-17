import React, { useContext } from "react";
import Cards from "../card/Cards";
import ListTitle from "./ListTitle";
import { ListContext } from "../../context/list/ListContext";

import { Paper, CssBaseline } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Droppable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 1),
    margin: theme.spacing(1),
  },
  root: {
    minWidth: "100px",
    maxWidth: "300px",
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(2),
  },
}));

function ListDetails({ list, listIndex }) {
  const { cards } = useContext(ListContext);
  const classes = useStyle();
  return (
    <>
      <Grid item>
        <div className={classes.card}>
          <Paper className={classes.root}>
            <CssBaseline />
            <Droppable droppableId={list._id} listIndex={list}>
              {(provided) => (
                <div>
                  <ListTitle
                    listTitle={list.title}
                    listId={list._id}
                    listIndex={listIndex}
                  />

                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {cards.length && (
                      <Cards listId={list._id} listIndex={listIndex} />
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </Paper>
        </div>
      </Grid>
    </>
  );
}

export default ListDetails;
