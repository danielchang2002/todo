const express = require("express");
const { listeners } = require("../models/todo");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/new", (req, res) => {
  res.render("todos/new", { todo: new Todo() });
});

router.get("/edit/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.render("todos/edit", { todo: todo });
});

// router.get("/:id", async (req, res) => {
//   const todo = await Todo.findById(req.params.id);
//   if (!todo) {
//     res.redirect("/");
//     return;
//   }
//   res.render("todos/show", { todo: todo });
// });

router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.post("/", async (req, res) => {
  let todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  });
  try {
    todo = await todo.save();
    // res.redirect(`/todos/${todo.id}`);
    res.redirect("/");
  } catch (e) {
    res.render("todos/new", { todo: todo });
  }
});

router.put("/:id", async (req, res) => {
  let todo = await Todo.findById(req.params.id);
  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.description = req.body.description;
  try {
    todo = await todo.save();
    // res.redirect(`/todos/${todo.id}`);
    res.redirect("/");
  } catch (e) {
    res.render("todos/edit", { todo: todo });
  }
});

module.exports = router;
