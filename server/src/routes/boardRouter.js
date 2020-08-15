const express = require("express");
const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

//Get All
router.get("/boards", auth, async (req, res) => {
  try {
    const data = await Board.find({ ownerId: req.user });
    res.status(200).send(data);
  } catch {
    res.status(500).send("Server Error");
  }
});

//Get By ID
router.get("/boardDetails/:id", auth, async (req, res) => {
  try {
    const data = await Board.findById({
      _id: req.params.id,
      ownerId: req.user,
    });
    res.status(200).send(data);
  } catch {
    res.status(500).send("Server Error");
  }
});

/* expects :
title:string
*/
//Create
router.post("/new", auth, async (req, res) => {
  console.log("req", req);
  try {
    const user = await User.findById(req.user);
    console.log("user", user);
    if (user) {
      req.body.ownerId = req.user;
      const data = await Board.create(req.body);
      res.status(200).send(data);
    } else {
      res.status(404).send("user not allowed");
    }
  } catch {
    res.status(500).send("Server Error");
  }
});

//Edit
router.patch("/edit/:id", auth, async (req, res) => {
  try {
    const data = await Board.findByIdAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user,
      },
      req.body,
      { new: true }
    );
    res.status(200).send(data);
  } catch {
    res.status(500).send("Server Error");
  }
});

//Delete
router.delete("/delete/:boardId", auth, async (req, res) => {
  try {
    const data = await Board.findByIdAndDelete({ _id: req.params.boardId });
    const lists = await List.find({ boardId: req.params.boardId });
    if (lists) {
      lists.forEach(async (list) => {
        const cards = await Card.find({ listId: list._id });
        cards.forEach(async (card) => {
          await card.remove();
        });
        await list.remove();
      });
    } else {
      res.status(400).send("bad request");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
