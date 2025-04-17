import React, { useContext, useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { updateNote, deleteNote } from "../services/api.js";
import { motion, AnimatePresence } from "framer-motion";
import Viewnote from "./Viewnote.jsx";
import { AnimationContext } from "../context/AnimationContext.jsx";
import { toast } from "react-toastify";

const NoteNote = ({ notes, refreshNotes, darkMode, searchTerm }) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const { containerVariants, childVariants } = useContext(AnimationContext);

    const viewNoteRef = useRef(null);

    // Handle note deletion
    const handleDelete = async (id) => {
        await deleteNote(id);
        refreshNotes();
        setSelectedNote(null);
        toast.error("Note Deleted!");
    };

    // Handle edit button click
    const handleEdit = (note) => {
        setEditMode(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (viewNoteRef.current && !viewNoteRef.current.contains(event.target)) {
                setSelectedNote(null);
            }
        };

        if (selectedNote) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedNote]);

    if (!notes.length) {
        return (
            <>
                <div className="h-[50vh] flex items-center justify-center">
                    <p className="text-center text-gray-500">No notes available.</p>
                </div>
            </>
        );
    }

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <AnimatePresence>
                <div className="flex justify-between w-full gap-4 p-4 lg:w-4/5">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        viewport={{ once: true }}
                        className={`
                            ${selectedNote ? "hidden md:grid" : "grid"}
                            gap-2
                            grid-cols-1
                            sm:grid-cols-2
                            md:${selectedNote ? "grid-cols-2" : "grid-cols-3"}
                            lg:${selectedNote ? "grid-cols-2" : "grid-cols-4"}
                            flex-1
                        `}
                    >
                        {filteredNotes.map((note) => (
                            <motion.div
                                variants={childVariants}
                                onClick={() => setSelectedNote(note)}
                                key={note._id}
                                className={`flex flex-col justify-around gap-4 p-4 border border-gray-400 shadow-md rounded-2xl hover:cursor-pointer ${darkMode ? "bg-white" : "bg-#202124"}`}
                            >
                                <p className="text-lg font-bold text-center underline underline-offset-4">{note.title}</p>
                                <p className="mx-4">{note.content.slice(0, 200)}...</p>
                                <div className="flex items-center justify-between w-full gap-4 mx-auto">
                                    <p className="text-sm text-gray-400"> Noted On : {new Date(note.time).toLocaleDateString()}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(note)} className="hover:cursor-pointer">
                                            <MdEdit size={20} />
                                        </button>
                                        <button onClick={() => handleDelete(note._id)} className="hover:cursor-pointer">
                                            <MdDelete size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    {selectedNote && (
                        <div className="w-full lg:flex-1" ref={viewNoteRef}>
                            {<Viewnote darkMode={darkMode} selectedNote={selectedNote} onclose={() => setSelectedNote(null)} refreshNotes={refreshNotes} />}
                        </div>
                    )}
                </div>
            </AnimatePresence>
        </>
    );
};

export default NoteNote;
