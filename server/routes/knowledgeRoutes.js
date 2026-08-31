/**
 * ================= ROUTES (Application layer) =================
 * Maps URL + HTTP verb combinations to controller functions.
 * =================================================================
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/knowledgeController");

router.get("/documents", controller.getDocuments);
router.post("/documents", controller.addDocument);
router.post("/ask", controller.askQuestion);
router.get("/history", controller.getHistory);

module.exports = router;
