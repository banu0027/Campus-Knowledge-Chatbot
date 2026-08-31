/**
 * ================= APPLICATION LAYER (entry point) =================
 * Wires the Express app together: middleware, routes, and the port
 * it listens on. This is the "Application" layer that sits between
 * the Presentation layer (React, running separately on Vite) and the
 * Model/Database layers.
 * ======================================================================
 */
const express = require("express");
const cors = require("cors");
const knowledgeRoutes = require("./routes/knowledgeRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", knowledgeRoutes);

app.get("/", (req, res) => {
  res.send("Campus Knowledge MVC demo API is running. Try GET /api/documents");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Campus Knowledge backend (Application layer) listening on http://localhost:${PORT}`);
});
