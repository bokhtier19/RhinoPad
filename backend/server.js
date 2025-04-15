import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.send("Your api backend is live ! Happy Suffering!");
});

app.listen(port, () => {
    console.log(`app is listening at port:${port}`);
});
