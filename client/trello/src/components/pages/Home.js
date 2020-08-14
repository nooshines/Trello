import React, { useContext } from "react";
import Boards from "../../components/board/Boards";
import BoardContextProvider from "../../context/board/BoardContext";

function Home(props) {
  return (
    <div>
      <BoardContextProvider>
        <Boards />
      </BoardContextProvider>
    </div>
  );
}

export default Home;
