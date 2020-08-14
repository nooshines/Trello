const express = require("express");
const Card = require("../models/Card");
const Board = require("../models/Board");
const List = require("../models/List");
const auth = require("../middleware/auth");

const router = express.Router();

//Get All
router.get("/cards/:listId", auth, async (req, res) => {
  try {
    const data = await Card.find({
      listId: req.params.listId,
    })
      .populate("listId")
      .sort({ order: "asc" });
    res.status(200).send(data);
  } catch {
    res.status(400).send("Bad request");
  }
});

//Get By ID
//Do I need this?

/*expects:
contents:string
 listId: mongoose.Schema.Types.ObjectId
 order:number
 */

//Create
router.post("/new/:listId", auth, async (req, res) => {
  try {
    const data = await List.findOne({
      _id: req.params.listId,
    });
    if (data) {
      const card = await Card.create(req.body);

      await List.findByIdAndUpdate(
        { _id: req.params.listId },
        { cardIds: card._id },
        { new: true }
      );
      res.status(200).send(card);
    } else res.status(400).send("Bad request");
  } catch {
    res.status(400).send("Bad request");
  }
});

//patch reorder
router.patch("/updateOrder", auth, async (req, res) => {
  try {
    Promise.all(
      req.body.cardIds.map(async (cardId, index) => {
        await Card.findByIdAndUpdate({ _id: cardId }, { order: index });
      })
    ).then(() => {
      res.status(200).send("card order updated");
    });
  } catch {
    res.status(500).send("server error");
  }
});

//Edit
router.patch("/edit/:id", auth, async (req, res) => {
  try {
    const data = await Card.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    );
    res.status(200).send(data);
  } catch {
    res.status(500).send("server error");
  }
});

//Delete
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const data = await Card.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
