import React, { useEffect, useRef, useState } from "react";
import { createNote } from "../services/api.js";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Write = ({ refreshNotes, darkMode }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
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
    }, [content]);

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!title || !content) return alert("Please fill all fields");

        await createNote({ title, content, category: "General" });
        setTitle("");
        setContent("");
        toast.success("Note Added Successfully!");
        refreshNotes();
    };

    return (
        <motion.form
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
            }}
            onSubmit={handleAddNote}
            className={`flex flex-col w-1/3 gap-2 p-4 mx-auto my-8 border  shadow-md rounded-xl ${darkMode ? "bg-white text-black border-gray-700" : "bg-[#202124] text-white border-gray-500"}`}
        >
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title..."
                className={`w-full p-2 border-none outline-none ${
                    darkMode ? "bg-white text-black border-gray-700 placeholder-gray-700" : "bg-[#202124] text-white border-gray-500 placeholder-gray-200"
                }`}
            />
            <hr className="w-full bg-gray-500" />
            <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    resizeTextarea();
                }}
                rows={2}
                placeholder="Notes..."
                className={`w-full p-2 border-none outline-none ${darkMode ? "bg-white text-black border-gray-700 placeholder-gray-700" : "bg-[#202124] placeholder-white text-white border-gray-500"}`}
            />
            <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:cursor-pointer">
                Create Note
            </button>
        </motion.form>
    );
};

export default Write;
