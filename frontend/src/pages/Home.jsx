import React from "react";
import Write from "../components/Write";
import NoteNote from "../components/NoteNote.jsx";
import { ToastContainer } from "react-toastify";

const Home = ({ darkMode, loading, notes, fetchNotes, searchTerm }) => {
    return (
        <div className="flex flex-col items-center min-h-screen my-2">
            <ToastContainer />
            <Write refreshNotes={fetchNotes} darkMode={darkMode} />
            {loading ? <p className="mt-4 text-gray-500">Loading Notes...</p> : <NoteNote searchTerm={searchTerm} notes={notes} refreshNotes={fetchNotes} darkMode={darkMode} />}
        </div>
    );
};

export default Home;
