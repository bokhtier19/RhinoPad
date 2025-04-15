import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { getNotes } from "./services/api.js";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchNotes = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getNotes();
            if (data && Array.isArray(data)) {
                setNotes(data.reverse());
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            toast.error("Error fetching notes");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <div className={darkMode ? "dark-theme" : "light-theme"}>
            <Navbar darkMode={darkMode} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setDarkMode={setDarkMode} fetchNotes={fetchNotes} />
            <Home darkMode={darkMode} notes={notes} loading={loading} fetchNotes={fetchNotes} searchTerm={searchTerm} />
            <Footer darkMode={darkMode} />
        </div>
    );
};

export default App;
