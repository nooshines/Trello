const express = require("express");
const auth = require("../middleware/auth");
const List = require("../models/List");
const Board = require("../models/Board");
const Card = require("../models/Card");

const router = express.Router();

//Get All
router.get("/lists/:boardId", auth, async (req, res) => {
  try {
    const data = await List.find({
      boardId: req.params.boardId,
    });
    res.status(200).send(data);
  } catch {
    res.status(500).send("Server Error");
  }
});

//Get By ID
//Do I need thiss??

/*expects :
title:string
boardId: mongoose.Schema.Types.ObjectId
order : number
*/
//Create
router.post("/new", auth, async (req, res) => {
  try {
    const data = await Board.findOne({
      _id: req.body.boardId,
      ownerId: req.user,
    });
    if (data) {
      req.body.ownerId = req.user;
      const list = await List.create(req.body);
      res.status(200).send(list);
    } else res.status(400).send("Bad request");
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

//Edit
router.patch("/edit/:id", auth, async (req, res) => {
  try {
    const data = await List.findByIdAndUpdate(
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
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const data = await List.delete({ boardId: req.params.id });
    const cards = await Card.find({ boardId: req.params.id });
    if (cards) {
      cards.forEach(async (card) => {
        await card.remove();
      });
    } else res.status(400).send("bad request");
    res.status(200).send(list);
  } catch {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
