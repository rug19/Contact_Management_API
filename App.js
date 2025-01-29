import { initializeDb } from "./config/initializeDb.js";
import { syncModel } from "./models/syncModel.js";

initializeDb();
syncModel();
