const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const connection = mysql.createConnection({
  host: "keebgram-db-server.mysql.database.azure.com",
  user: "keebgram",
  password: "Password1",
  database: "KeebGram",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Route to add an account
app.post("/addAccount", (req, res) => {
  const { username, email, password } = req.body;
  const query =
    "INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)";
  connection.query(query, [username, email, password], (err, result) => {
    if (err) {
      res.status(500).send("Error adding account");
      return;
    }
    res.send("Account added successfully");
  });
});

// Route to verify login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM accounts WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send("Error during login");
      return;
    }
    if (results.length > 0) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid username or password");
    }
  });
});

// Route to delete an account
app.post("/deleteAccount", (req, res) => {
  const { username } = req.body;
  const query = "DELETE FROM accounts WHERE username = ?";
  connection.query(query, [username], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting account");
      return;
    }
    res.send("Account deleted successfully");
  });
});

// Route to update an account
app.post("/updateAccount", (req, res) => {
  const { username, newUsername, newEmail, newPassword } = req.body;
  const query =
    "UPDATE accounts SET username = ?, email = ?, password = ? WHERE username = ?";
  connection.query(
    query,
    [newUsername, newEmail, newPassword, username],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating account");
        return;
      }
      res.send("Account updated successfully");
    }
  );
});

// Start the server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
