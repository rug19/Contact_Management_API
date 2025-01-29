import { initializeDb } from "./src/config/initializeDb.js";
import { syncModel } from "./src/models/syncModel.js";

initializeDb();
syncModel();
