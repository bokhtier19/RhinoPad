import express from "express";
import Note from "../models/noteModel.js";

const router = express.Router();

// Creating a new note in the database

router.post("/", async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const note = new Note({
            title,
            content,
            category,
        });
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// Fetching all notes from the database

router.get("/", async (req, res) => {
    try {
        const notes = await Note.find({});
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;

//Get a single note from the database

router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// Update a note in the database

router.put("/:id", async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.title = title;
        note.content = content;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete a note from the database

router.delete("/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
