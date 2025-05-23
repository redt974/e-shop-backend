import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import Article from "./articles.model.js";

dotenv.config();

let env = {
    port: process.env.PORT,
    token: process.env.TOKEN,
    mysqlURI: process.env.MONGO_URI,
    DB_name: process.env.DB_NAME
};

const post = async (a, b) => {
    try {
        let c = await Article.create({ ...a.body });
        b.status(201).json({ message: "Article has been created!", article: c })
    } 
    catch (a) { 
        console.log(a) 
    }
}, getArticle = async (a, b) => {
    try {
        let a = await Article.find();
        b.status(200).json(a)
    } 
    catch (a) { 
        console.log(a) 
    }
}, getArticleById = async (a, b) => {
    try {
        let c = await Article.findById(a.params.id);
        b.status(200).json(c)
    } 
    catch (a) { 
        console.log(a) 
    }
}, deleteArticle = async (a, b) => {
    checkIdArticle(a, b);
    try {
        let c = await Article.findByIdAndDelete(a.params.id);
        if (!c) return b.status(404).json("Article not found!");
        b.status(200).json("Article deleted")
    } 
    catch (a) { 
        console.log(a) 
    }
}, updateArticle = async (a, b) => {
    checkIdArticle(a, b);
    try {
        let c = await Article.findByIdAndUpdate(a.params.id, { $set: a.body }, { new: !0 });
        if (!c) return b.status(404).json("Article not found");
        b.status(200).json({ message: "Article updated", updateArticle: c })
    } 
    catch (a) { 
        console.log(a) 
    }
}, checkIdArticle = (a, b) => {
    let c = a.params.id.length;
    if (24 < c || 24 > c) return b.status(404).json("Article not found!")
};

let routerArticle = express.Router();

routerArticle.post("/add", post),
    routerArticle.get("/get", getArticle),
    routerArticle.get("/get/:id", getArticleById),
    routerArticle.delete("/delete/:id", deleteArticle),
    routerArticle.put("/update/:id", updateArticle);

let app = express();

const PORT = env.port || 8080;

mongoose.connect(env.mysqlURI, { dbName: env.DB_name })
    .then(() =>
        console.log("Connected to MongoDB successfully!"))
    .catch(a =>
        console.log(a)),
    app.use(express.json()),
    app.use(cors()),
    app.use(cookieParser()),
    app.use("/api/article", routerArticle),
    app.listen(PORT, () => {
        console.log(`LISTENING AT http://localhost:${PORT}`)
    }
    );
