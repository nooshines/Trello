import React, { createContext, useState } from "react";
import axios from "axios";

export const ListContext = createContext();

const ListContextProvider = (props) => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  //reorder(findListIndex, source.index, destination.index);
  //Reorder
  const reorder = (listIndex, startIndex, endIndex) => {
    const result = Array.from(cards[listIndex]);
    //remove from
    const [removed] = result.splice(startIndex, 1);
    //add to
    result.splice(endIndex, 0, removed);
    //update state
    const updatedCards = [...cards];
    updatedCards[listIndex] = result;
    setCards(updatedCards);
    //reorder Backend
    const cardIds = result.map((card) => {
      return card._id;
    });
    reOrderCards(cardIds);
  };

  //move(findListSourceIndex,findListDestinationIndex,source,destination);
  //Move
  const move = (
    listSourceIndex,
    listDestinationIndex,
    droppableSource,
    droppableDestination
  ) => {
    const sourceList = cards[listSourceIndex];
    const destinationList = cards[listDestinationIndex];
    const sourceClone = Array.from(sourceList);
    const destClone = Array.from(destinationList);
    //remove
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    removed.listId = droppableDestination.droppableId;
    editCard({ listId: droppableDestination.droppableId }, removed._id);
    //add
    destClone.splice(droppableDestination.index, 0, removed);
    //update state
    const updatedCards = [...cards];
    updatedCards[listSourceIndex] = sourceClone;
    updatedCards[listDestinationIndex] = destClone;
    setCards(updatedCards);
    const sourceCloneIds = sourceClone.map((card) => {
      return card._id;
    });
    reOrderCards(sourceCloneIds);
    const destCloneIds = destClone.map((card) => {
      return card._id;
    });
    reOrderCards(destCloneIds);
  };

  //************************************/
  //************************************/
  //list
  //************************************/
  //************************************/

  //Get All Lists and cards
  const getLists = async (boardId) => {
    try {
      const res = await axios.get(`/list/lists/${boardId}`);
      setLists(res.data);
      Promise.all(
        res.data.map(async (list) => {
          return await getCards(list._id);
        })
      ).then((result) => {
        setCards(result);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Create List
  const createList = async (title, boardId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/list/new", { title, boardId }, config);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //Edit list title
  const editList = async (listTitle, listId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.patch(
        `/list/edit/${listId}`,
        { title: listTitle },
        config
      );
      const list = lists.find((list) => {
        return list._id === listId;
      });
      if (list) {
        list.title = listTitle;
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  //delete list
  const deleteList = async (listId) => {
    try {
      const res = await axios.delete(`/list/delete/${listId}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //************************************/
  //************************************/
  //Card
  //************************************/
  //************************************/

  //Get All Cards
  const getCards = async (listId) => {
    try {
      const res = await axios.get(`/card/cards/${listId}`);
      // setCards(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //reorder cards
  const reOrderCards = async (cardIds) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.patch("/card/updateOrder", { cardIds }, config);
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
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Edit content
  const editCard = async (cardObject, cardId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.patch(`/card/edit/${cardId}`, cardObject, config);
      res.data.createdAt = res.data.updatedAt;
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // delete card
  const deleteCard = async (cardId) => {
    try {
      const res = await axios.delete(`/card/delete/${cardId}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        setLists,
        getLists,
        createList,
        editList,
        deleteList,
        cards,
        setCards,
        getCards,
        createCard,
        reorder,
        move,
        deleteCard,
        editCard,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
