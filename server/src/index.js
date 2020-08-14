const express = require("express");
const cors = require("cors");

//env
require("dotenv").config();

require("./mongo");

//variables
const port = process.env.PORT || 3000;

//setup express app
const app = express();

//Routes
const userRouter = require("./routes/userRouter");
const boardRouter = require("./routes/boardRouter");
const listRouter = require("./routes/listRouter");
const cardRouter = require("./routes/cardRouter");

//middleware
app.use(express.json()); //parse JSON body
app.use(cors());

//Routes
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/list", listRouter);
app.use("/card", cardRouter);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
