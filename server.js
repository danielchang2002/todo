const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Todo = require("./models/todo");
const todoRouter = require("./routes/todos.js");
const app = express();

db_url = process.env.DATABASE_URL || "mongodb://localhost/todo";
console.log("db_url: " + db_url);

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check that we are connected to mongoose
const db = mongoose.connection;
db.once("open", () => console.log("connected to mongoose"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ date: "desc" });
  res.render("todos/index", { todos: todos });
});

app.use("/todos", todoRouter);

app.listen(process.env.PORT || 5000);
