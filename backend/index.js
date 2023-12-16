import express from "express";
import mysql from "mysql";
import cors from "cors";

function calculateHourDifference(startTimestamp, endTimestamp) {
  const start = new Date(startTimestamp);
  const end = new Date(endTimestamp);
  const diffInMilliseconds = end - start;
  return diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
}

function calculateTotalHoursWorked(attendanceData) {
  let totalHoursByEmployee = [];

  attendanceData.forEach((attendance) => {
    const { employee_id, arrival_time, exit_time } = attendance;

    if (arrival_time && exit_time) {
      const hoursWorked = calculateHourDifference(arrival_time, exit_time);

      if (!totalHoursByEmployee[employee_id]) {
        totalHoursByEmployee[employee_id] = 0;
      }

      totalHoursByEmployee[employee_id] += hoursWorked;
    }
  });

  // Convert the result to an array of objects
  const totalHoursList = Object.keys(totalHoursByEmployee).map(
    (employeeId) => ({
      employee_id: parseInt(employeeId, 10),
      total_hours_worked: totalHoursByEmployee[employeeId],
    })
  );

  return totalHoursList;
}

function calculateTotalLatenessHours(attendanceData) {
  let totalLatenessByEmployee = [];

  attendanceData.forEach((attendance) => {
    const {
      employee_id,
      shiftstarttime,
      shiftendtime,
      arrival_time,
      exit_time,
    } = attendance;

    if (shiftstarttime && shiftendtime && arrival_time && exit_time) {
      const shiftDuration = calculateHourDifference(
        shiftstarttime,
        shiftendtime
      );
      const workedHours = calculateHourDifference(arrival_time, exit_time);
      const latenessHours = Math.max(0, shiftDuration - workedHours);

      if (!totalLatenessByEmployee[employee_id]) {
        totalLatenessByEmployee[employee_id] = 0;
      }

      totalLatenessByEmployee[employee_id] += latenessHours;
    }
  });

  const totalLatenessList = Object.keys(totalLatenessByEmployee).map(
    (employeeId) => ({
      employee_id: parseInt(employeeId, 10),
      total_lateness_hours: totalLatenessByEmployee[employeeId],
    })
  );

  return totalLatenessList;
}

function calculateBaseSalary(employeeData) {
  let totalBaseSalaryByEmployee = [];
  // 1:merge 2 tables
  // 2:employee_id, arrival_time, exit_time, department, accessLevel
  employeeData.forEach((employe) => {
    const { department, accesslevel, exit_time, employee_id, arrival_time } =
      employe;
    console.log(employe);
    let baseSalaryRate;

    switch (department) {
      case "Software Development Department":
        switch (accesslevel) {
          case "employee":
            baseSalaryRate = 1.4;
            break;
          case "admin":
            baseSalaryRate = 1.6;
            break;
          case "manager":
            baseSalaryRate = 1.8;
            break;
          default:
            console.log("Error");
            break;
        }
        break;

      case "Marketing Department":
        switch (accesslevel) {
          case "employee":
            baseSalaryRate = 1.8;
            break;
          case "admin":
            baseSalaryRate = 2;
            break;
          case "manager":
            baseSalaryRate = 2.2;
            break;
          default:
            console.log("Error");
            break;
        }
        break;

      case "Sales Department":
        switch (accesslevel) {
          case "employee":
            baseSalaryRate = 2.5;
            break;
          case "admin":
            baseSalaryRate = 2.7;
            break;
          case "manager":
            baseSalaryRate = 2.9;
            break;
          default:
            console.log("Error");
            break;
        }
        break;

      case "HR Department":
        switch (accesslevel) {
          case "employee":
            baseSalaryRate = 2;
            break;
          case "admin":
            baseSalaryRate = 2.3;
            break;
          case "manager":
            baseSalaryRate = 2.5;
            break;
          default:
            console.log("Error");
            break;
        }
        break;

      default:
        console.log("Error");
        break;
    }

    if (arrival_time && exit_time) {
      if (!totalBaseSalaryByEmployee[employee_id]) {
        totalBaseSalaryByEmployee[employee_id] = 0;
      }
      const totalHoursWorked = calculateTotalHoursWorked(employeeData);
      let value;
      totalHoursWorked.forEach((employee) => {
        const employee_id_1 = employee.employee_id;
        const totalHours = employee.total_hours_worked; // Assuming the property name is totalHours
        if (employee_id_1 === employee_id) value = totalHours;
        // console.log(employee_id_1, totalHours);
      });
      const baseSalary = baseSalaryRate * value;
      totalBaseSalaryByEmployee[employee_id] = baseSalary;
    }
  });

  const baseSalaryList = Object.keys(totalBaseSalaryByEmployee).map(
    (employeeId) => ({
      employee_id: parseInt(employeeId, 10),
      baseSalary: totalBaseSalaryByEmployee[employeeId],
    })
  );

  return baseSalaryList;
}

function calculateBonus(employeeStartDate) {
  //mnerja3la
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startDate = new Date(employeeStartDate);
  const yearsInCompany = currentYear - startDate.getFullYear();

  // Bonus increment per year
  const bonusIncrementPerYear = 0.5;

  // Calculate the bonus
  const bonus = 1 + yearsInCompany * bonusIncrementPerYear;

  return bonus;
}

function calculateMedicalAbsenceHandle(attendanceData) {
  let medicalAbsenceCountByEmployee = [];
  let medicalAbsenceDeductionByEmployee = [];
  const medicalAbsenceMultiplier = 15;
  attendanceData.forEach((attendance) => {
    const {
      attendance: hasAttendance,
      reason_for_absence,
      employee_id,
    } = attendance;
    if (!medicalAbsenceCountByEmployee[employee_id]) {
      medicalAbsenceCountByEmployee[employee_id] = 0;
    }
    if (!medicalAbsenceDeductionByEmployee[employee_id]) {
      medicalAbsenceDeductionByEmployee[employee_id] = 0;
    }
    if (!hasAttendance && reason_for_absence === "Medical") {
      // Count days with attendance 0 and reason_for_absence is "Medical"
      console.log("hello");
      medicalAbsenceCountByEmployee[employee_id]++;
    }
    console.log(medicalAbsenceCountByEmployee[employee_id]);
    medicalAbsenceDeductionByEmployee[employee_id] =
      medicalAbsenceCountByEmployee[employee_id] * medicalAbsenceMultiplier;
  });
  const medicalAbsenceDeductionList = Object.keys(
    medicalAbsenceDeductionByEmployee
  ).map((employeeId) => ({
    employee_id: parseInt(employeeId, 10),
    total_medical_payment_handle: medicalAbsenceDeductionByEmployee[employeeId],
  }));
  return medicalAbsenceDeductionList;
}

function calculateDeductions(attendanceData) {
  const latenessRate = 6;
  const absentDayRate = 40;
  let totalDeductionByEmployee = [];
  let totalAbsentDeductionByEmployee = [];
  let totalLatenessDeductionByEmployee = [];
  //  employee_id,shiftstarttime,shiftendtime,arrival_time,exit_time,
  attendanceData.forEach((attendance) => {
    const {
      reason_for_absence,
      employee_id,
      arrival_time,
      exit_time,
      shiftstarttime,
      shiftendtime,
    } = attendance;
    if (!totalDeductionByEmployee[employee_id]) {
      totalDeductionByEmployee[employee_id] = 0;
    }
    if (!totalAbsentDeductionByEmployee[employee_id]) {
      totalAbsentDeductionByEmployee[employee_id] = 0;
    }
    if (!totalLatenessDeductionByEmployee[employee_id]) {
      totalLatenessDeductionByEmployee[employee_id] = 0;
    }
    if (arrival_time && exit_time && shiftendtime && shiftstarttime) {
      if (
        Date.parse(exit_time) - Date.parse(arrival_time) <
        Date.parse(shiftendtime) - Date.parse(shiftstarttime)
      ) {
        const shiftDuration = calculateHourDifference(
          shiftstarttime,
          shiftendtime
        );
        const workedHours = calculateHourDifference(arrival_time, exit_time);
        const latenessHours = Math.max(0, shiftDuration - workedHours);
        totalLatenessDeductionByEmployee[employee_id] +=
          latenessHours * latenessRate;
      }
    }

    if (reason_for_absence === "NoReason") {
      // Deduct for days with attendance and absence reason is "NoReason"
      totalAbsentDeductionByEmployee[employee_id] += absentDayRate;
    }
    totalDeductionByEmployee[employee_id] =
      totalAbsentDeductionByEmployee[employee_id] +
      totalLatenessDeductionByEmployee[employee_id];
  });
  const totalDeductionsList = Object.keys(totalDeductionByEmployee).map(
    (employeeId) => ({
      employee_id: parseInt(employeeId, 10),
      total_deduction: totalDeductionByEmployee[employeeId],
    })
  );
  const totalAbsentDeductionsList = Object.keys(
    totalAbsentDeductionByEmployee
  ).map((employeeId) => ({
    employee_id: parseInt(employeeId, 10),
    deduction_absence: totalAbsentDeductionByEmployee[employeeId],
  }));
  const totalLatenessDeductionsList = Object.keys(
    totalLatenessDeductionByEmployee
  ).map((employeeId) => ({
    employee_id: parseInt(employeeId, 10),
    deduction_latenance: totalLatenessDeductionByEmployee[employeeId],
  }));
  return {
    totalDeductionsList,
    totalAbsentDeductionsList,
    totalLatenessDeductionsList,
  };
}

function calculateEmployeePayroll(joinedData) {
  let payRollByEmployee = [];
  joinedData.forEach((employee) => {
    const { employee_id, startdate } = employee;
    const totalHoursList = calculateTotalHoursWorked(joinedData);
    const totalLatenessList = calculateTotalLatenessHours(joinedData);
    const baseSalaryList = calculateBaseSalary(joinedData);
    const bonus = calculateBonus(startdate);
    const medicalAbsenceDeductionList =
      calculateMedicalAbsenceHandle(joinedData);
    const {
      totalDeductionsList,
      totalAbsentDeductionsList,
      totalLatenessDeductionsList,
    } = calculateDeductions(joinedData);

    const totalHours = totalHoursList.find(
      (item) => item.employee_id === employee_id
    );
    const totalLateness = totalLatenessList.find(
      (item) => item.employee_id === employee_id
    );
    const baseSalary = baseSalaryList.find(
      (item) => item.employee_id === employee_id
    );
    const medicalAbsenceDeduction = medicalAbsenceDeductionList.find(
      (item) => item.employee_id === employee_id
    );
    const totalDeduction = totalDeductionsList.find(
      (item) => item.employee_id === employee_id
    );
    const deductionAbsence = totalAbsentDeductionsList.find(
      (item) => item.employee_id === employee_id
    );
    const deductionLateness = totalLatenessDeductionsList.find(
      (item) => item.employee_id === employee_id
    );

    const totalSalary =
      baseSalary.baseSalary * bonus -
      totalDeduction.total_deduction +
      medicalAbsenceDeduction.total_medical_payment_handle;
    payRollByEmployee[employee_id] = {
      employee_id: employee_id,
      total_hours_worked: totalHours.total_hours_worked || 0,
      total_lateness_hours: totalLateness.total_lateness_hours || 0,
      base_salary: baseSalary.baseSalary || 0,
      bonus: bonus,
      medical_absence_deduction:
        medicalAbsenceDeduction.total_medical_payment_handle || 0,
      total_deduction: totalDeduction.total_deduction || 0,
      deduction_absence: deductionAbsence.deduction_absence || 0,
      deduction_lateness: deductionLateness.deduction_latenance || 0,
      total_salary: totalSalary < 0 ? 0 : totalSalary,
    };
  });
  return payRollByEmployee;
}

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

app.get("/totalhoursworked", (req, res) => {
  const q = "SELECT employee_id, arrival_time, exit_time FROM attendance";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    // Call the function to calculate total hours worked and return the result
    const result = calculateTotalHoursWorked(data);

    return res.json(result);
  });
});

app.get("/totalLatenessHours", (req, res) => {
  const q =
    "SELECT employee_id, shiftstarttime, shiftendtime, arrival_time, exit_time FROM attendance";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    // Call the function to calculate total hours worked and return the result
    const result = calculateTotalLatenessHours(data);

    return res.json(result);
  });
});

app.get("/baseSalary", (req, res) => {
  const q =
    "SELECT e.department, e.accesslevel, a.exit_time, a.employee_id, a.arrival_time FROM employees e JOIN attendance a ON e.employee_id = a.employee_id";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    // Call the function to calculate total hours worked and return the result
    const result = calculateBaseSalary(data);

    return res.json(result);
  });
});

app.get("/medicalhandle", (req, res) => {
  const q =
    "SELECT employee_id, attendance, reason_for_absence  FROM  attendance ";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    // Call the function to calculate total hours worked and return the result
    const result = calculateMedicalAbsenceHandle(data);

    return res.json(result);
  });
});

app.get("/calculateDeductions", (req, res) => {
  const q =
    "SELECT employee_id, reason_for_absence, arrival_time, exit_time, shiftstarttime, shiftendtime  FROM  attendance ";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    // Call the function to calculate total hours worked and return the result
    const result = calculateDeductions(data);

    return res.json(result);
  });
});

app.get("/payroll", (req, res) => {
  const q =
    "SELECT e.employee_id, e.accesslevel, e.department, e.startdate, a.dates, a.attendance, a.arrival_time, a.exit_time, a.shiftstarttime, a.shiftendtime, a.reason_for_absence FROM employees e JOIN attendance a ON e.employee_id = a.employee_id;";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    // Call the function to calculate total hours worked and return the result
    const result = calculateEmployeePayroll(data);

    return res.json(result);
  });
});

app.post("/contacts", (req, res) => {
  const q =
    "INSERT INTO contactsdata(`firstName`, `lastName`, `city`, `zipcode`, `email`, `contact`, `address`, `age`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.city,
    req.body.zipcode,
    req.body.email,
    req.body.contact,
    req.body.address,
    req.body.age,
    req.body.description,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Data inserted successfully!");
  });
});
app.get("/contacts", (req, res) => {
  const q = "SELECT * FROM contactsdata";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend !");
});
