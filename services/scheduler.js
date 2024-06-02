const cron = require("node-cron");
const mongoose = require("mongoose");
const Todo = require("../models/Todo");
const { sendReminderEmail } = require("./email");
const User = require("../models/User");

// Scheduler: Runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    // Find tasks that are due in 1 or 2 days
    const now = new Date();
    const day1 = new Date(now);
    const day2 = new Date(now);
    day1.setDate(now.getDate() + 1);
    day2.setDate(now.getDate() + 2);

    const todos = await Todo.find({
      dueDate: { $in: [day1, day2] },
      completed: false,
    }).populate("userId");

    // Send reminder emails
    for (const todo of todos) {
      const user = await User.findById(todo.userId);
      if (user) {
        sendReminderEmail(user.email, todo.title, todo.dueDate);
      }
    }
  } catch (error) {
    console.error("Error sending reminder emails:", error);
  }
});
