import express from "express";
import multer from "multer";
import cors from "cors";
import mysql from "mysql";
import { processExcelFile } from "./excelhandler.js";

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "festival-app-webdb",
});

app.get("/", (req, res) => {
  res.send("Welcome to the upload server!");
});

app.get("/upload", (req, res) => {
  res.send("Upload");
});

function insertRow(row) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO contestants (`place`,`name`,`city`, `barcode`) VALUES (?)";
    const values = [row.place, row.name, row.city, row.barcode];
    db.query(query, [values], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function truncateDB() {
  return new Promise((res, rej) => {
    db.query("DELETE FROM contestants", (err) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
}

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    await truncateDB();
    const jsonData = await processExcelFile(req.file.path);

    for (const row of jsonData) {
      await insertRow(row);
    }

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/contestants", (req, res) => {
  const query = "SELECT * FROM contestants";
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
