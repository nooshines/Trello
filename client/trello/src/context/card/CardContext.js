import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CardContext = createContext();

const CardContextProvider = (props) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {}, []);

  //Get All Cards
  const getCards = async (listId) => {
    try {
      const res = await axios.get(`/card/cards/${listId}`);
      setCards(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //Create Card
  const createCard = async (content, order, listId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/card/new/${listId}`,
        { content, order, listId },
        config
      );
      console.log("res", res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //Edit content
  // const editCard = async (card) => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   try {
  //     const res = await axios.put(`/card/${list._id}`, card, config);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //delete card
  // const deleteCard = async (cardId) => {
  //   try {
  //     await axios.delete(`/card/delete/${cardId}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
        getCards,
        createCard,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
