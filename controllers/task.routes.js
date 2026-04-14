const router = require("express").Router();
const Task = require("../models/Task");

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const createdTask = await Task.create({
      taskName: req.body.taskName,
      taskStatus: req.body.taskStatus || "To Do",
      user: req.user._id,
    });

    res.status(201).json({ task: createdTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// GET /tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ err: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        taskName: req.body.taskName,
        taskStatus: req.body.taskStatus,
      },
      { new: true, runValidators: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ err: "Task not found" });
    }

    res.status(200).json({ task: updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
