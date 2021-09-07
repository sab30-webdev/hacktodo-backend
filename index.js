const express = require("express");
const mongoose = require("mongoose");
const mongo = require("mongodb");
const { MONGO_URI } = require("./config/config");
const Todo = require("./models/todo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.error(error);
  }
}
connectDB();

app.get("/", (req, res) => {
  res.send("<h1>Todo App</h1>");
});

app.get("/api/all", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/add", async (req, res) => {
  try {
    const { todo } = req.body;
    const res_todo = await Todo.create({ todo });
    res.status(200).json({ message: "success", res_todo });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/remove/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Todo.findByIdAndDelete({ _id: new mongo.ObjectId(id) });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("listening on port 3000"));
