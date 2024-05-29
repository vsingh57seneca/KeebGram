const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Database connection
const db = mysql.createConnection({
  host: "keebgram-db-server.mysql.database.azure.com",
  user: "keebgram",
  password: "Password1",
  database: "KeebGram",
  multipleStatements: true,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Route to add an account
app.post("/addAccount", (req, res) => {
  const { email, password } = req.body;

  // Check that password is less than 45 characters
  if (password.length > 45) {
    return res.status(400).send("Password must be less than 45 characters.");
  }

  // Prepare the call to the stored procedure
  // @ok is the output parameter that we capture in the SELECT statement.
  const sql = "CALL create_account(?, ?, @ok); SELECT @ok AS ok;";

  db.query(sql, [email, password], (err, results) => {
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
  db.query(query, [email, password], (err, results) => {
    if (err) {
      res.status(500).send("Error during login");
      return;
    }

    const ok = results[1][0].ok;
    if (ok === 1) {
      // Login successful
      query = "SELECT * FROM accounts WHERE email = ?";
      db.query(query, [email], (err, results) => {
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
  db.query(query, [username], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting account");
      return;
    }
    res.send("Account deleted successfully");
  });
});

app.post("/updateAccountDetails", upload.single("displayImage"), (req, res) => {
  const {
    email,
    firstName,
    lastName,
    displayName,
    country,
    birthdate,
    gender,
    language,
  } = req.body;
  const displayImage = req.file ? req.file.buffer : null;

  const query = `
    UPDATE accounts 
    SET 
      first_name = ?, 
      last_name = ?, 
      display_name = ?, 
      country = ?, 
      birthdate = ?, 
      display_image = ?, 
      gender = ?, 
      language = ?, 
      setup_finished = 1
    WHERE email = ?;
  `;

  db.query(
    query,
    [
      firstName,
      lastName,
      displayName,
      country,
      birthdate,
      displayImage,
      gender,
      language,
      email,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating account details");
        return;
      }
      res.send("Account details updated successfully");
    }
  );
});

// Start the server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
