import { initializeDb } from "./config/initializeDb.js";
import { syncModel } from "./models/syncModel.js";
import express from "express";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from './routes/userRoutes.js';

const app = express();

//Enable Json in the request body
app.use(express.json());

//Routes
app.use("/auth", userRoutes);
app.use("/api", contactRoutes);


//Server 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in the port ${PORT}`);
});

//Initialize the database
initializeDb();
//Synchronize models
syncModel();

