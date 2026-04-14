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

module.exports = router;