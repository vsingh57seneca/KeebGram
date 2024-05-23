const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: "keebgram-db-server.mysql.database.azure.com",
  user: "keebgram",
  password: "Password1",
  database: "KeebGram",
  port: 3306,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// API endpoint to add a row to the accounts table
app.post("/addAccount", (req, res) => {
  const { username, email, password } = req.body;
  const query =
    "INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)";

  connection.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err.stack);
      res.status(500).send("Error inserting data.");
      return;
    }
    res.status(200).send("Account added successfully.");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
