const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const accountRoutes = require("./apis/AccountAPI");
const postRoutes = require("./apis/PostsAPI");
const fileRoutes = require('./apis/FileAPI');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/accounts", accountRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/images", fileRoutes);

app.use(express.static(__dirname + '/public'));

// Start the server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
