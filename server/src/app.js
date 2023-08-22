import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import expressSession from "express-session";
import globalRouter from "./routers/globalRouter";
import studentRouter from "./routers/studentRouter";
import adminRouter from "./routers/adminRouter";
import lectureRouter from "./routers/lectureRouter";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
const app = express();
// app.use(morgan("combined"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json()); // if user post data, express json parsing
app.use(express.urlencoded({ extended: true })); // HTML Form parsing
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
// req.session : 세션값들을 다 볼 수 있음
// req.sessionID : 세션 아이디 확인 (세션쿠키 value)
// req.session.destroy() : 세션 모두 제거

app.use(
  expressSession({
    resave: false, // 요청이 왔을때 세션에 수정사항이 생기지 않아도 다시 저장할지 여부
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 저장할지 여부
    secret: process.env.COOKIE_SECRET, //쿠키 암호화
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/togethercoding",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: null,
      path: "/",
    },
  })
);

// router
app.use("/", globalRouter);
app.use("/students", studentRouter);
app.use("/admin", adminRouter);
app.use("/lectures", lectureRouter);
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
