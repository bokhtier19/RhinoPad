import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { updateNote, deleteNote } from "../services/api.js";
import { toast } from "react-toastify";

const Viewnote = ({ selectedNote, onclose, refreshNotes, darkMode }) => {
    const [currentNote, setCurrentNote] = useState(selectedNote);
    const [editTitle, setEditTitle] = useState(selectedNote.title);
    const [editContent, setEditContent] = useState(selectedNote.content);
    const textareaRef = useRef(null);

    //  Function to resize the textArea
    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        resizeTextarea();
    }, [editContent]);

    useEffect(() => {
        setCurrentNote(selectedNote);
        setEditTitle(selectedNote.title);
        setEditContent(selectedNote.content);
    }, [selectedNote]);

    const handleUpdate = async (id) => {
        await updateNote({ _id: id, title: editTitle, content: editContent });
        refreshNotes();
        setCurrentNote({ ...currentNote, title: editTitle, content: editContent });
        toast.success("Note Updated Successfully!");
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        refreshNotes();
        onclose();
        toast.error("Note Deleted!");
    };

    if (!selectedNote) {
        return null;
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [selectedNote]);

    return (
        <>
            <div className="z-10 flex items-center justify-center bg-transparent ">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`flex flex-col items-center justify-center w-full gap-6 p-4 px-8 leading-5 tracking-wider text-justify border rounded-2xl ${darkMode ? "bg-white" : ""}`}
                >
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="items-center w-full font-bold text-center underline bg-transparent border-none outline-none underline-offset-4"
                    />
                    <textarea
                        ref={textareaRef}
                        value={editContent}
                        onChange={(e) => {
                            setEditContent(e.target.value);
                            resizeTextarea();
                        }}
                        className="w-full overflow-hidden bg-transparent border-none outline-none resize-none"
                    ></textarea>
                    <div className="flex items-center justify-between w-full gap-4 mx-auto">
                        <p className="text-sm text-gray-400"> Noted On : {new Date(selectedNote.time).toLocaleDateString()}</p>
                        <div className="flex gap-2">
                            <button onClick={() => handleDelete(selectedNote._id)} className="hover:cursor-pointer">
                                <MdDelete size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => handleUpdate(selectedNote._id)} className="flex items-center justify-center gap-2 px-3 py-1 text-white bg-blue-500 rounded hover:cursor-pointer">
                            Save
                        </button>
                        <button onClick={onclose} className="flex items-center justify-center gap-2 px-3 py-1 text-white bg-blue-500 rounded hover:cursor-pointer">
                            Close
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Viewnote;
