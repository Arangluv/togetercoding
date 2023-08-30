import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/togethercoding", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const handleOpen = () =>
  console.log("Database connection has been succeeded 🟢");

db.on("error", (error) => console.log("DB connect error 🔴", error));
db.once("open", handleOpen);
