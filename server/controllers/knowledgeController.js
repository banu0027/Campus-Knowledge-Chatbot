/**
 * ================= CONTROLLER LAYER (part of Application layer) =================
 * Receives HTTP requests from the routes, validates input, calls the
 * Model to do the actual work, and shapes the JSON response sent back
 * to the Presentation (React) layer. Contains NO business rules and
 * NO direct database access of its own.
 * ==================================================================
 */
const KnowledgeModel = require("../models/Knowledge");

function getDocuments(req, res) {
  const documents = KnowledgeModel.getAllDocuments();
  res.json({ documents });
}

function addDocument(req, res) {
  const { category, title, keywords, content } = req.body;
  if (!category || !title || !content) {
    return res.status(400).json({ error: "category, title and content are required" });
  }
  const doc = KnowledgeModel.addDocument(category, title, keywords || [], content);
  res.status(201).json({ document: doc });
}

function askQuestion(req, res) {
  const { question } = req.body;
  if (!question || !question.trim()) {
    return res.status(400).json({ error: "question is required" });
  }
  const entry = KnowledgeModel.askQuestion(question);
  res.status(201).json({ entry });
}

function getHistory(req, res) {
  const history = KnowledgeModel.getHistory();
  res.json({ history });
}

module.exports = { getDocuments, addDocument, askQuestion, getHistory };
