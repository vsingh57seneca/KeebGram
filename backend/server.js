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
  multipleStatements: true,
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
  const { email, password } = req.body;

  // Call the stored procedure
  const query = "CALL create_account(?, ?, @ok); SELECT @ok AS ok;";
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding account");
    }

    // Extract the value of ok from the results
    const ok = results[1][0].ok;
    if (ok === 1) {
      return res.status(201).send("Account added successfully");
    } else if (ok === 0) {
      return res.status(409).send("Account with the same email already exists");
    }
  });
});

// Route to verify login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let query = "CALL login(?, ?, @ok); SELECT @ok as ok;";
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      res.status(500).send("Error during login");
      return;
    }

    const ok = results[1][0].ok;
    if (ok === 1) {
      // Login successful
      query = "SELECT * FROM accounts WHERE email = ?";
      connection.query(query, [email], (err, results) => {
        if (err) {
          res.status(500).send("Error during login");
          return;
        }
        if (results.length > 0) {
          const user = results[0];
          delete user.password;

          res.status(200).json(user);
        }
      });
    } else {
      return res.status(401).send("Invalid email or password");
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
