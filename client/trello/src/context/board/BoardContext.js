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
  const editBoard = async (board) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/board/${board._id}`, board, config);
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
