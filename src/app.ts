import express from "express";
import myRoutes from "./routes/index";
import morgan from "morgan";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(myRoutes);
export default app;