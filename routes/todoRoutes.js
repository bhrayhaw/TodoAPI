const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const checkVerified = require("../middleware/checkVerification");
const Todo = require("../models/Todo");
const router = express.Router();

// Apply both authentication and verification middleware
router.use(authMiddleware, checkVerified);

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTodo = new Todo({
      userId: req.user._id,
      title,
      description,
      dueDate,
    });

    await newTodo.save();
    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: `${error.message} this is the error` });
  }
});

// Get all todos for the authenticated user
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a todo by id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, dueDate, completed } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description, dueDate, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a todo by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark a todo as done
router.patch("/:id/mark-done", async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { completed: true },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo marked as done", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
