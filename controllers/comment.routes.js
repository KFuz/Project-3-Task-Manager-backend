const router = require("express").Router();
const Comment = require("../models/Comment");
const verifyToken = require("../middleware/verify-token");

router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.User = req.user._id;
    const createdComment = await Comment.create(req.body);
    res.status(201).json(createdComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.find().populate("User Task");
    res.json(allComments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundComment = await Comment.findById(req.params.id).populate("User Task");
    res.json(foundComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const foundComment = await Comment.findById(req.params.id).populate("User");

    if (!foundComment.User._id.equals(req.user._id)) {
      return res
        .status(403)
        .json({ err: `nope you're not ${foundComment.User.username} no update for you` });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const foundComment = await Comment.findById(req.params.id).populate("User");

    if (!foundComment.User._id.equals(req.user._id)) {
      return res
        .status(403)
        .json({ err: `nope you're not ${foundComment.User.username} no delete for you` });
    }

    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    res.json(deletedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;