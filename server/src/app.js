import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";

const app = express();
// app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json()); // if user post data, express json parsing
app.use(express.urlencoded({ extended: true })); // HTML Form parsing
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(helmet());

// router
app.use("/", globalRouter);

// bad path
app.use((req, res, next) => {
  res.status(404).send("Not found");
});
// Error detected
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("Sorry, try letter..");
});

export default app;
