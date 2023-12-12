import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "project_schema",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello i am backend");
});

app.get("/employees", (req, res) => {
  const q = "SELECT * FROM employees";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/employees", (req, res) => {
  const q =
    "INSERT INTO employees(`fullName`,`startdate`,`age`,`phone`,email`,`gender`,`department`,`accesslevel`) VALUES (?)";
  const values = [
    req.body.fullName,
    req.body.startdate,
    req.body.age,
    req.body.phone,
    req.body.email,
    req.body.gender,
    req.body.department,
    req.body.accesslevel,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("meche lhal");
  });
});

app.listen(8801, () => {
  console.log("Connected to backend !");
});
