import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//console.log(PORT);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev")); // log the requests to the console

app.get("/test", (req, res) => {
  console.log(res.getHeaders());
  res.send("Hello from the test route");

});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});