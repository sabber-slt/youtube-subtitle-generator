import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import userRoutes from "./modules/user.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
