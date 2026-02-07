
import { verifyJWT } from "../middleware/auth.js";
import Note from "../models/notes.model.js";
import express from "express";

const router = express.Router();

router.post("/add", verifyJWT, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      user: req.userId,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/show-all", verifyJWT, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId })
      .sort({ updatedAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/show/:id", verifyJWT, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note)
      return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/edit/:id", verifyJWT, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, content },
      { new: true }
    );

    if (!note)
      return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete/:id", verifyJWT, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note)
      return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/notes/public/:id", async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    isPublic: true,
  });

  if (!note)
    return res.status(404).json({ message: "Not found" });

  res.json(note);
});


export default router;