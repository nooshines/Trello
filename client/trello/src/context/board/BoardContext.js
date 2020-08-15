import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BoardContext = createContext();

const BoardContextProvider = (props) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  //Get All boards
  const getBoards = async () => {
    try {
      const res = await axios.get("/board/boards");
      setBoards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Create board
  const createBoard = async (title) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/board/new", { title }, config);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //Edit board title
  const editBoard = async (boardTitle, boardId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.patch(
        `/board/edit/${boardId}`,
        { title: boardTitle },
        config
      );
      const board = boards.find((board) => {
        return board._id === boardId;
      });
      if (board) {
        board.title = boardTitle;
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  //delete board
  const deleteBoard = async (boardId) => {
    try {
      await axios.delete(`/board/delete/${boardId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        createBoard,
        editBoard,
        deleteBoard,
        getBoards,
        setBoards,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
