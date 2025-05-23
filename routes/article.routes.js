import express from "express";
import { Article } from "../models/article.model.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ message: "Article created", article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get", async (_, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: "Not found" });
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const [updated] = await Article.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Not found" });
    const updatedArticle = await Article.findByPk(req.params.id);
    res.status(200).json({ message: "Article updated", updatedArticle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Article.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
