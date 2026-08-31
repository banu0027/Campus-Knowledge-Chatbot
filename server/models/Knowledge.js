/**
 * ================= MODEL LAYER =================
 * Represents the KnowledgeDocument and ChatHistory entities and
 * encapsulates all business rules around them: how a question is
 * matched against the knowledge base (a simplified stand-in for the
 * embedding + vector-similarity retrieval step in the full RAG
 * pipeline), and how a Q&A exchange is logged. The Model is the only
 * thing that talks to the Database layer - Controllers never touch
 * db.js directly.
 * =================================================
 */
const { readDB, writeDB } = require("../database/db");

class KnowledgeModel {
  /** Return all documents in the knowledge base. */
  static getAllDocuments() {
    const db = readDB();
    return db.documents;
  }

  /** Business rule: add a new document to the knowledge base (admin action). */
  static addDocument(category, title, keywords, content) {
    const db = readDB();
    const doc = {
      id: db.nextDocId,
      category,
      title,
      keywords,
      content,
    };
    db.documents.push(doc);
    db.nextDocId += 1;
    writeDB(db);
    return doc;
  }

  /**
   * Business rule: retrieval + answer generation. Scores every
   * document by keyword overlap with the question (a simplified,
   * deterministic stand-in for embedding similarity search), returns
   * the best match, and logs the exchange to chat history.
   */
  static askQuestion(question) {
    const db = readDB();
    const questionLower = question.toLowerCase();

    let bestDoc = null;
    let bestScore = 0;
    for (const doc of db.documents) {
      const score = doc.keywords.filter((k) => questionLower.includes(k)).length;
      if (score > bestScore) {
        bestScore = score;
        bestDoc = doc;
      }
    }

    const answer = bestDoc
      ? `According to ${bestDoc.category} "${bestDoc.title}": ${bestDoc.content}`
      : "No matching document was found in the knowledge base for this question.";

    const entry = {
      id: db.nextHistoryId,
      question,
      answer,
      matchedDocId: bestDoc ? bestDoc.id : null,
      askedAt: new Date().toISOString(),
    };
    db.history.push(entry);
    db.nextHistoryId += 1;
    writeDB(db);

    return entry;
  }

  /** Return chat history, most recent first. */
  static getHistory() {
    const db = readDB();
    return [...db.history].reverse();
  }
}

module.exports = KnowledgeModel;
