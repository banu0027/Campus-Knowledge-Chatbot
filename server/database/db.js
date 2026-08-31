/**
 * ================= DATABASE LAYER =================
 * Lowest layer of the MVC architecture. Its only job is reading and
 * writing raw data to persistent storage (a JSON file, standing in
 * for a real database like MongoDB/PostgreSQL for this lab demo).
 * Nothing above this layer should know HOW the data is stored - only
 * the Model layer talks to this file directly.
 * ===================================================
 */
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "db.json");

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = {
      documents: [
        {
          id: 1,
          category: "Regulation",
          title: "Minimum Attendance Requirement",
          keywords: ["attendance", "minimum", "eligibility"],
          content:
            "Students must maintain a minimum of 75% attendance in each course to be eligible to appear for the semester examination.",
        },
        {
          id: 2,
          category: "Circular",
          title: "Semester Exam Registration",
          keywords: ["exam", "registration", "last date", "deadline"],
          content:
            "The last date for semester exam registration is 15th September 2026. Late registration with a fine is allowed until 20th September 2026.",
        },
        {
          id: 3,
          category: "Placement",
          title: "Placement Drive Eligibility",
          keywords: ["placement", "eligibility", "cgpa", "drive"],
          content:
            "Students with a CGPA of 6.5 or above and no active backlogs are eligible to register for the campus placement drive.",
        },
      ],
      nextDocId: 4,
      history: [],
      nextHistoryId: 1,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
