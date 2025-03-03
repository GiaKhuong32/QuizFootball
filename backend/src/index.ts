import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456", 
  database: "backend"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error: ", err);
    return;
  }
  console.log("Connected to MySQL successfully!");
});

app.get("/players", (req, res) => {
  db.query("SELECT * FROM players", (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    console.log("Returned data:", results);
    res.json(results);
  });
});

app.get("/images", (req, res) => {
  db.query("SELECT * FROM images", (err, results) => {
    if (err) {
      console.error("Error querying images:", err);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
