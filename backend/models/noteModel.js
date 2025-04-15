import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    time: { type: Date, default: Date.now },
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
