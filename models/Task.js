const mongoose = require("mongoose");

// Task Schema

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskStatus: {
      type: String,
      enum: ["To Do", "In Progress", "Complete"],
      required: true,
      default: "To Do",
    },
  },
  { timestamps: true },
);

// model
const Task = mongoose.model("Task", taskSchema);

// export the model
module.exports = Task;
