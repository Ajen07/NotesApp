import express from "express";
import cors from "cors";

import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

//ROUTES
import authRouter from "./routes/authRoute.js";
import notesRouter from "./routes/noteRoute.js";

//MIDDLEWARE
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authentication from "./middleware/authentication.js";

//ConnectDB
import connectDB from "./db/connectDB.js";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", authentication, notesRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
