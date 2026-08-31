# Campus Knowledge — MVC Demo

A working 3-layer MVC demo: React (Presentation) -> Express (Application) -> JSON store (Model/Database).

## Run it

### 1. Start the backend
    cd server
    npm install
    node server.js
Leave this running — it serves the API at http://localhost:4000

### 2. Start the frontend (in a NEW terminal)
    cd client
    npm install
    npm run dev
Open the URL it prints — usually http://localhost:5173

### 3. Demo it
- Ask: "How much attendance do I need to maintain?"
- Ask: "What is the last date for exam registration?"
- Ask: "Am I eligible for the placement drive?"
Each answer is retrieved from server/database/db.json through the Model layer and displayed via the Controller -> Routes -> React UI chain.

Requires Node.js 18+ (v22 recommended). Get it from https://nodejs.org if you don't have it.
