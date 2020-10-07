import React, { useContext } from "react";
import Boards from "../../components/board/Boards";
import BoardContextProvider from "../../context/board/BoardContext";

import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#88d498",
    Width: "100vh",
    height: "300vh",
  },
}));

function Home(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <BoardContextProvider>
        <Boards />
      </BoardContextProvider>
    </div>
  );
}

export default Home;
