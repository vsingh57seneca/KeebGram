const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const accountRoutes = require("./apis/AccountAPI");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/accounts", accountRoutes);

// Start the server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
