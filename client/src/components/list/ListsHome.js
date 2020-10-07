import React from "react";
import ListContextProvider from "../../context/list/ListContext";
import Lists from "../../components/list/Lists";

import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#88d498",
    Width: "100vh",
    height: "300vh",
  },
}));

function ListsHome(props) {
  const classes = useStyle();
  const boardId = props.match.params.boardId;

  return (
    <div className={classes.root}>
      <ListContextProvider>
        <Lists boardId={boardId} />
      </ListContextProvider>
    </div>
  );
}

export default ListsHome;
