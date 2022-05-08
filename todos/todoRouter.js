const express = require("express");
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const todoRouter = express.Router();
const customError = require("../helpers/CustomErrors");
const TodoModel = require("./todoModel");
const jwt = require('jsonwebtoken');
const util = require('util');
const signAsync = util.promisify(jwt.sign);
const verifyAsync = util.promisify(jwt.verify);



todoRouter.post("/", async (req, res, next) => {
  const { title } = req.body;

  if (title === "") {
    return next(customError(422, "VALIDATION_ERROR", "invalid title"));
  }

  try {
    await TodoModel.create({ title, status: "to-do" });
    
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

todoRouter.get("/", async (req, res, next) => {
  const { title } = req.query;
  const filter = title ? { title } : {};
  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash("1234",saltRounds);
  console.log(hashedPassword);
  
  try {
    const todos = await TodoModel.find(filter);
    res.send(todos);
  } catch (error) {
    next(error);
  }
});

todoRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findOne({ _id: id });
    res.send(todo);
  } catch (error) {
    next(error);
  }

});
todoRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await TodoModel.findByIdAndDelete(id);
    res.send({ message: "successfully deleted" });

  } catch (error) {
    next(error);
  }
});

todoRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  let { status } = req.body;

  if (status && !["to-do", "in progress", "done"].includes(status)) {
    status = undefined;
    return next(customError(422, "VALIDATION_ERROR", "invalid status"));
  }
  try {
    await TodoModel.findOneAndUpdate(id, { $set: req.body });

    res.send({ message: "successfully updated" });
  } catch (error) {
    next(error);
  }
});


module.exports = todoRouter;

