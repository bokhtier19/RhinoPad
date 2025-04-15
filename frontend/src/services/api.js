import axios from "axios";

const API_URI = "https://rhinopad-backend.onrender.com/api/notes";

export const getNotes = async () => {
    try {
        const response = await axios.get(API_URI);
        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: "Server Error" };
        } else if (error.request) {
            return { error: "Database not connected !" };
        } else {
            return { error: "Unexpected Error" };
        }
    }
};

export const getNote = async (id) => {
    try {
        const response = await axios.get(`${API_URI}/${id}`);
        return response.data;
    } catch (error) {
        return { error: "Server Error" };
    }
};

export const createNote = async (note) => {
    try {
        const response = await axios.post(API_URI, note);
        return response.data;
    } catch (error) {
        return { error: "Server Error" };
    }
};

export const updateNote = async (note) => {
    try {
        const response = await axios.put(`${API_URI}/${note._id}`, note);
        return response.data;
    } catch (error) {
        return { error: "Server Error" };
    }
};

export const deleteNote = async (id) => {
    try {
        const response = await axios.delete(`${API_URI}/${id}`);
        return response.data;
    } catch (error) {
        return { error: "Server Error" };
    }
};
