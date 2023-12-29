import express from "express";
import cors from "cors";
import "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/userRoute.js";
import routes from "./routes/openaiRoutes.js";

//
const app = express();
const PORT = process.env.PORT || 8000;

//configure evn file
dotenv.config();

//data base connection
connectDB();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//rest api
app.get("/", (req, res) => {
  res.send("hello i am server");
});

app.use("/api/v1/user", router);
app.use("/api/v1/openai", routes);

//listen
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.bgCyan.white);
});
