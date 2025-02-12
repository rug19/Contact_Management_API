import { initializeDb } from "./config/initializeDb.js";
import { syncModel } from "./models/syncModel.js";
import express from "express";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts Manangement API",
      version: "1.0.0",
      description: " An API for managing contacts",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Path to fins the routes where the documentation is.
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
