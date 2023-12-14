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
    "INSERT INTO employees(fullName, startdate, age, phone, email, gender, department, accesslevel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Data inserted successfully!");
  });
});

app.get("/attendance", (req, res) => {
  const q = "SELECT * FROM attendance";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/attendance", (req, res) => {
  const q =
    "INSERT INTO attendance(employee_id, dates, attendance, exit_time, arrival_time, shiftstarttime, shiftendtime, reason_for_absence, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.employee_id,
    req.body.dates,
    req.body.attendance,
    req.body.exit_time,
    req.body.arrival_time,
    req.body.shiftstarttime,
    req.body.shiftendtime,
    req.body.reason_for_absence,
    req.body.notes,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Data inserted successfully!");
  });
});

app.get("/attendance", (req, res) => {
  const q = "SELECT employee_id, arrival_time, exit_time FROM attendance;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    //i should write a functio that takes in parameters the value data fetched using query.db the return of the function

    return res.json(calculateTotalHoursWorked(data));
  });
});

app.listen(8800, () => {
  console.log("Connected to backend !");
});
