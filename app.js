import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerArticle from "./routes/article.routes.js";
import { sequelize } from "./models/article.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send("Bienvenue sur l'API backend de eshop !");
});

app.get('/api', (req, res) => {
  res.status(200).send("Bienvenue sur l'API backend de eshop !");
});

app.use("/api/article", routerArticle);

sequelize.sync().then(() => {
  console.log("Connected to MySQL");
  app.listen(PORT, () => {
    console.log(`LISTENING AT http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Unable to connect to DB:", err);
});
