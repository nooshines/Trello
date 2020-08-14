import React, { useContext, useState } from "react";
import { BoardContext } from "../../context/board/BoardContext";

import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
}));

const EditBoard = () => {
  const { boards, setBoards, editBoard } = useContext(BoardContext);
  const [openEdit, setOpenEdit] = useState(false);

  const classes = useStyle();

  const editHandler = async () => {
    const data = await editBoard();
    console.log("data", data);
  };

  return <div>editboards</div>;
};

export default EditBoard;
