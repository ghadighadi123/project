// function calculateHourDifference(startTimestamp, endTimestamp) {//zabta
//     const start = new Date(startTimestamp.replace(' ', 'T'));
//     const end = new Date(endTimestamp.replace(' ', 'T'));
//     const diffInMilliseconds = end - start;
//     return diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
// }

// Function to calculate total hours worked for a given month
// function calculateTotalHoursWorked(attendanceData) {
//   let totalHoursWorked = 0;

//   attendanceData.forEach((attendance) => {
//     const { arrival_time, exit_time } = attendance;

//     if (arrival_time && exit_time) {
//       totalHoursWorked += calculateHourDifference(arrival_time, exit_time);
//     }
//   });

//   return totalHoursWorked;
// }

// Function to calculate total lateness hours for a given month
// function calculateTotalLatenessHours(attendanceData) {
//   let totalLatenessHours = 0;

//   attendanceData.forEach((attendance) => {
//     const { shiftstarttime, shiftendtime, arrival_time, exit_time } = attendance;

//     if (shiftstarttime && shiftendtime && arrival_time && exit_time) {
//       const shiftDuration = calculateHourDifference(shiftstarttime, shiftendtime);
//       const workedHours = calculateHourDifference(arrival_time, exit_time);
//       const latenessHours = Math.max(0, workedHours - shiftDuration);
//       totalLatenessHours += latenessHours;
//     }
//   });

//   return totalLatenessHours;
// }

// Function to calculate total hours worked for a given month
// function calculateTotalHoursWorked(attendanceData) {
//   let totalHoursWorked = 0;

//   attendanceData.forEach((attendance) => {
//     const { arrival_time, exit_time } = attendance;

//     if (arrival_time && exit_time) {
//       totalHoursWorked += calculateHourDifference(arrival_time, exit_time);
//     }
//   });

//   return totalHoursWorked;
// }

// Function to calculate total lateness hours for a given month
// function calculateTotalLatenessHours(attendanceData) {
//   let totalLatenessHours = 0;

//   attendanceData.forEach((attendance) => {
//     const { shiftstarttime, shiftendtime, arrival_time, exit_time } =
//       attendance;

//     if (shiftstarttime && shiftendtime && arrival_time && exit_time) {
//       const shiftDuration = calculateHourDifference(
//         shiftstarttime,
//         shiftendtime
//       );
//       const workedHours = calculateHourDifference(arrival_time, exit_time);
//       const latenessHours = Math.max(0, workedHours - shiftDuration);
//       totalLatenessHours += latenessHours;
//     }
//   });

//   return totalLatenessHours;
// }

//   function calculateBaseSalary(employeeData, totalHoursWorked) {
//     const { department, accesslevel } = employeeData;

//     // Set base salary rates based on department and access level
//     const baseSalaryRates = {
//       'Software Development': {
//         'member': 1.4,
//         'Admin': 1.6,
//         'Manager': 1.8,
//       },
//       'Marketing': {
//         'member': 1.8,
//         'Admin': 2,
//         'Manager': 2.2,
//       },
//       'Sales': {
//         'member': 2.5,
//         'Admin': 2.7,
//         'Manager': 2.9,
//       },
//       'HR': {
//         'member': 2,
//         'Admin': 2.3,
//         'Manager': 2.5,
//       },
//     };

//     // Calculate the base salary
//     const baseSalary = baseSalaryRates[department][accesslevel] * totalHoursWorked;

//     return baseSalary;
//   }

// function calculateDeductions(attendanceData, latenessRate = 6, absentDayRate = 40) {
//     let totalLatenessDeduction = 0;
//     let totalAbsentDeduction = 0;

//     attendanceData.forEach((attendance) => {
//       const { attendance: hasAttendance, lateness_hours, reason_for_absence } = attendance;

//       if (hasAttendance) {
//         // Deduct based on lateness hours
//         totalLatenessDeduction += lateness_hours * latenessRate;
//       } else if (reason_for_absence === 'NoReason') {
//         // Deduct for days with attendance and absence reason is "NoReason"
//         totalAbsentDeduction += absentDayRate;
//       }
//     });

//     return totalLatenessDeduction + totalAbsentDeduction;
//   }

//   function calculateMedicalAbsenceHandle(attendanceData, medicalAbsenceMultiplier = 15) {
//     let medicalAbsenceCount = 0;

//     attendanceData.forEach((attendance) => {
//       const { attendance: hasAttendance, reason_for_absence } = attendance;

//       if (!hasAttendance && reason_for_absence === 'Medical') {
//         // Count days with attendance 0 and reason_for_absence is "Medical"
//         medicalAbsenceCount++;
//       }
//     });

//     // Multiply the count by the fixed rate
//     const medicalAbsenceDeduction = medicalAbsenceCount * medicalAbsenceMultiplier;

//     return medicalAbsenceDeduction;
//   }

//   function calculateSalaryWithBonusAndDeductions(employeeData, attendanceData) {
//     const { startdate } = employeeData;

//     // Calculate total hours worked using the provided function
//     const totalHoursWorked = calculateTotalHoursWorked(attendanceData);

//     // Calculate base salary without bonus
//     const baseSalary = calculateBaseSalary(employeeData, totalHoursWorked);

//     // Calculate the bonus based on the employee's start date
//     const currentDate = new Date();
//     const currentYear = currentDate.getFullYear();
//     const employeeStartDate = new Date(startdate);
//     const yearsInCompany = currentYear - employeeStartDate.getFullYear();
//     const bonus = 1 + yearsInCompany * bonusIncrementPerYear;

//     // Calculate the final salary including bonus
//     const salaryWithBonus = baseSalary * bonus;

//     // Calculate deductions
//     const latenessDeduction = calculateLatenessDeduction(attendanceData); // Assuming this function is defined
//     const absentDeduction = calculateAbsentDeduction(attendanceData); // Assuming this function is defined
//     const medicalAbsenceDeduction = calculateMedicalAbsenceDeduction(attendanceData);

//     const totalDeductions = latenessDeduction + absentDeduction + medicalAbsenceDeduction;

//     // Calculate the net salary
//     const netSalary = salaryWithBonus - totalDeductions;

//     return {
//       baseSalary,
//       salaryWithBonus,
//       latenessDeduction,
//       absentDeduction,
//       medicalAbsenceDeduction,
//       totalDeductions,
//       netSalary,
//     };
//   }

//   attendanceData.forEach((attendance) => {
//     const { employee_id, arrival_time, exit_time } = attendance;
//     if (employee_id === employeeId && arrival_time && exit_time) {
//       totalHoursWorked += calculateHourDifference(
//         arrival_time,
//         exit_time
//       );
//     }
//   });

//   return totalHoursWorked;
// }

// function calculateTotalLatenessHours(attendanceData, employeeId) {
//   let totalLatenessHours = 0;

//   attendanceData.forEach((attendance) => {
//     const {
//       shiftstarttime,
//       shiftendtime,
//       arrival_time,
//       exit_time,
//       employee_id,
//     } = attendance;
//     if (
//       shiftstarttime &&
//       shiftendtime &&
//       arrival_time &&
//       exit_time &&
//       employee_id === employeeId
//     ) {
//       const shiftDuration = calculateHourDifference(
//         shiftstarttime,
//         shiftendtime
//       );
//       const workedHours = calculateHourDifference(arrival_time, exit_time);
//       const latenessHours = Math.max(0, shiftDuration - workedHours);
//       totalLatenessHours += latenessHours;
//     }
//   });

// function calculateTotalLatenessHours(attendanceData, employeeId) {
//   let totalLatenessHours = 0;

//   attendanceData.forEach((attendance) => {
//     const {
//       shiftstarttime,
//       shiftendtime,
//       arrival_time,
//       exit_time,
//       employee_id,
//     } = attendance;
//     if (
//       shiftstarttime &&
//       shiftendtime &&
//       arrival_time &&
//       exit_time &&
//       employee_id === employeeId
//     ) {
//       const shiftDuration = calculateHourDifference(
//         shiftstarttime,
//         shiftendtime
//       );
//       const workedHours = calculateHourDifference(
//         arrival_time,
//         exit_time
//       );
//       const latenessHours = Math.max(0, shiftDuration - workedHours);
//       totalLatenessHours += latenessHours;
//     }
//   });

//   return totalLatenessHours;
// }

// const employeeData = [
//   {
//     employee_id: 123,
//     phone: "123-456-7890",
//     fullName: "John Doe",
//     age: 25,
//     gender: "Male",
//     department: "Software_Development",
//     accesslevel: "member",
//     email: "john.doe@example.com",
//     startdate: "2022-12-31T22:00:00.000Z",
//   },
//   {
//     employee_id: 124,
//     phone: "412-522-2356",
//     fullName: "Ralph Merhi",
//     age: 21,
//     gender: "Male",
//     department: "Marketing",
//     accesslevel: "Admin",
//     email: "ralph@example.com",
//     startdate: "2022-12-31T22:00:00.000Z",
//   },
//   {
//     employee_id: 125,
//     phone: "234-802-2144",
//     fullName: "Ghadi Abou deleh",
//     age: 20,
//     gender: "Male",
//     department: "HR",
//     accesslevel: "Manager",
//     email: "ghadi@example.com",
//     startdate: "2022-12-31T22:00:00.000Z",
//   },
// ];
// const attendanceData = [
//   {
//     employee_id: 123,
//     arrival_time: "2023-12-15 10:00:00",
//     exit_time: "2023-12-15 12:00:00",
//     shiftstarttime: "2023-12-15 08:00:00",
//     shiftendtime: "2023-12-15 17:00:00",
//     attendance: true,
//     reason_for_absence: "",
//   },
//   {
//     employee_id: 123,
//     arrival_time: "",
//     exit_time: "",
//     shiftstarttime: "2023-12-16 08:00:00",
//     shiftendtime: "2023-12-16 17:00:00",
//     attendance: false,
//     reason_for_absence: "OffDay",
//   },
//   {
//     employee_id: 124,
//     arrival_time: "",
//     exit_time: "",
//     shiftstarttime: "2023-12-15 08:00:00",
//     shiftendtime: "2023-12-15 17:00:00",
//     attendance: false,
//     reason_for_absence: "NoReason",
//   },
//   {
//     employee_id: 125,
//     arrival_time: "2023-12-15 10:00:00",
//     exit_time: "2023-12-15 12:00:00",
//     shiftstarttime: "2023-12-15 08:00:00",
//     shiftendtime: "2023-12-15 17:00:00",
//     attendance: true,
//     reason_for_absence: "",
//   },
// ];

// function calculateBaseSalary(employeeData, totalHoursWorked) {

//   const { department, accesslevel } = employeeData;
//   let baseSalaryRate;
//   switch (department) {
//     case "Software_Development":
//       switch (accesslevel) {
//         case "member":
//           baseSalaryRate = 1.4;
//           break;
//         case "Admin":
//           baseSalaryRate = 1.6;
//           break;
//         case "Manager":
//           baseSalaryRate = 1.8;
//           break;
//         default:
//           console.log("Error");
//           break;
//       }
//       break;

//     case "Marketing":
//       switch (accesslevel) {
//         case "member":
//           baseSalaryRate = 1.8;
//           break;
//         case "Admin":
//           baseSalaryRate = 2;
//           break;
//         case "Manager":
//           baseSalaryRate = 2.2;
//           break;
//         default:
//           console.log("Error");
//           break;
//       }
//       break;

//     case "Sales":
//       switch (accesslevel) {
//         case "member":
//           baseSalaryRate = 2.5;
//           break;
//         case "Admin":
//           baseSalaryRate = 2.7;
//           break;
//         case "Manager":
//           baseSalaryRate = 2.9;
//           break;
//         default:
//           console.log("Error");
//           break;
//       }
//       break;

//     case "HR":
//       switch (accesslevel) {
//         case "member":
//           baseSalaryRate = 2;
//           break;
//         case "Admin":
//           baseSalaryRate = 2.3;
//           break;
//         case "Manager":
//           baseSalaryRate = 2.5;
//           break;
//         default:
//           console.log("Error");
//           break;
//       }
//       break;

//     default:
//       console.log("Error");
//       break;
//   }

//   const baseSalary = baseSalaryRate * totalHoursWorked;
//   return baseSalary;
// }

// const latenessRate = 6;
// const absentDayRate = 40;

// function calculateDeductions(attendanceData) {
//   let totalLatenessDeduction = 0;
//   let totalAbsentDeduction = 0;
//   totalLatenessDeduction += calculateTotalLatenessHours(attendanceData) * latenessRate;
//   attendanceData.forEach((attendance) => {
//     const {
//       reason_for_absence,
//       employee_id,
//     } = attendance;
//     if (reason_for_absence === "NoReason") {
//       // Deduct for days with attendance and absence reason is "NoReason"
//       totalAbsentDeduction += absentDayRate;
//     }
//   });
//   const total = totalLatenessDeduction + totalAbsentDeduction;
//   return [total, totalAbsentDeduction, totalLatenessDeduction];
// }
// //   console.log(calculateDeductions(attendanceData, 125));

//   return baseSalaryList;
// }
// // mechyet
// function calculateTotalHoursWorked(attendanceData) {
//   let totalHoursByEmployee = [];

//   attendanceData.forEach((attendance) => {
//     const { employee_id, arrival_time, exit_time } = attendance;

// const medicalAbsenceMultiplier = 15;
// function calculateMedicalAbsenceHandle(attendanceData, employeeID) {
//   let medicalAbsenceCount = 0;

//   attendanceData.forEach((attendance) => {
//     const {
//       attendance: hasAttendance,
//       reason_for_absence,
//       employee_id,
//     } = attendance;
//     if (employee_id === employeeID) {
//       if (!hasAttendance && reason_for_absence === "Medical") {
//         // Count days with attendance 0 and reason_for_absence is "Medical"
//         medicalAbsenceCount++;
//       }
//     }
//   });

//   // Multiply the count by the fixed rate
//   const medicalAbsenceDeduction =
//     medicalAbsenceCount * medicalAbsenceMultiplier;

//   return medicalAbsenceDeduction;
// }

// function calculateBonus(employeeStartDate) {
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const startDate = new Date(employeeStartDate);
//   const yearsInCompany = currentYear - startDate.getFullYear();

//   // Bonus increment per year
//   const bonusIncrementPerYear = 0.5;

//   // Calculate the bonus
//   const bonus = 1 + yearsInCompany * bonusIncrementPerYear;

//   return bonus;
// }

// function calculateSalaryWithBonusAndDeductions(
//   employeeData,
//   attendanceData,
//   employeeID
// ) {
//   const startdate = employeeData.startdate;

//   // Calculate total hours worked using the provided function
//   const totalHoursWorked = calculateTotalHoursWorked(
//     attendanceData,
//     employeeID
//   );
//   // Calculate base salary without bonus
//   const baseSalary = calculateBaseSalary(employeeData, totalHoursWorked);

//   // Calculate the bonus based on the employee's start date

//   const bonus = calculateBonus(startdate);

//   // Calculate the final salary including bonus
//   const salaryWithBonus = baseSalary * bonus;

//   // Calculate deductions
//   const [total, totalAbsentDeduction, totalLatenessDeduction] =
//     calculateDeductions(attendanceData, employeeID);
//   const medicalAbsenceDeduction = calculateMedicalAbsenceHandle(
//     attendanceData,
//     employeeID
//   );

//   const totalDeductions =
//     totalLatenessDeduction +
//     totalAbsentDeduction +
//     medicalAbsenceDeduction;

//   // Calculate the net salary
//   const netSalary = salaryWithBonus - totalDeductions;

//   return {
//     baseSalary,
//     salaryWithBonus,
//     totalLatenessDeduction,
//     totalAbsentDeduction,
//     medicalAbsenceDeduction,
//     totalDeductions,
//     netSalary,
//   };
// }

//==========================================================================================================================
//==========================================================================================================================
//==========================================================================================================================
//==========================================================================================================================

//   function calculateHourDifference(startTimestamp, endTimestamp) {
//     const start = new Date(startTimestamp.replace(" ", "T"));
//     const end = new Date(endTimestamp.replace(" ", "T"));
//     const diffInMilliseconds = end - start;
//     return diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
//   }

//   export function calculateTotalHoursWorked(attendanceData) {
//     let totalHoursByEmployee = [];

//     attendanceData.forEach((attendance) => {
//       const { employee_id, arrival_time, exit_time } = attendance;

//       if (arrival_time && exit_time) {
//         const hoursWorked = calculateHourDifference(arrival_time, exit_time);

//         if (!totalHoursByEmployee[employee_id]) {
//           totalHoursByEmployee[employee_id] = 0;
//         }

//         totalHoursByEmployee[employee_id] += hoursWorked;
//       }
//     });

//     // Convert the result to an array of objects
//     const totalHoursList = Object.keys(totalHoursByEmployee).map((employeeId) => ({
//       employee_id: parseInt(employeeId, 10),
//       total_hours_worked: totalHoursByEmployee[employeeId],
//     }));

//     return totalHoursList;
//   }

// export function calculateTotalLatenessHours(attendanceData) {
//   let totalLatenessByEmployee = [];

//   attendanceData.forEach((attendance) => {
//     const { employee_id, shiftstarttime, shiftendtime, arrival_time, exit_time } = attendance;

//     if (shiftstarttime && shiftendtime && arrival_time && exit_time) {
//       const shiftDuration = calculateHourDifference(shiftstarttime, shiftendtime);
//       const workedHours = calculateHourDifference(arrival_time, exit_time);
//       const latenessHours = Math.max(0, workedHours - shiftDuration);

//       if (!totalLatenessByEmployee[employee_id]) {
//         totalLatenessByEmployee[employee_id] = 0;
//       }

//       totalLatenessByEmployee[employee_id] += latenessHours;
//     }
//   });

//   const totalLatenessList = Object.keys(totalLatenessByEmployee).map((employeeId) => ({
//     employee_id: parseInt(employeeId, 10),
//     total_lateness_hours: totalLatenessByEmployee[employeeId],
//   }));

//   return totalLatenessList;
// }

// export function calculateSalaryWithBonusAndDeductions(joinedData) {
//   let netSalaryByEmploye = [];
//   joinedData.forEach((employee) => {
//     const { startdate, employee_id } = employee;

//     // Calculate total hours worked using the provided function
//     // const totalHoursWorked = calculateTotalHoursWorked(joinedData);
//     // Calculate base salary without bonus
//     const baseSalary = calculateBaseSalary(joinedData);

//     // Calculate the bonus based on the employee's start date

//     const bonus = calculateBonus(startdate);

//     // Calculate the final salary including bonus
//     const salaryWithBonus = baseSalary[employee_id] * bonus;

//     // Calculate deductions
//     const [
//       totalDeductionsList,
//       totalAbsentDeductionsList,
//       totalLatenessDeductionsList,
//     ] = calculateDeductions(joinedData);
//     const medicalAbsenceDeduction = calculateMedicalAbsenceHandle(joinedData);

//     const totalDeductions =
//       totalLatenessDeductionsList[employee_id] +
//       totalAbsentDeductionsList[employee_id] +
//       medicalAbsenceDeduction[employee_id];

//     // Calculate the net salary
//     netSalaryByEmploye[employee_id] = salaryWithBonus - totalDeductions;
//   });
//   const netSalaryList = Object.keys(netSalaryByEmploye).map((employeeId) => ({
//     employee_id: parseInt(employeeId, 10),
//     net_salary: netSalaryByEmploye[employeeId],
//   }));
//   return netSalaryList;
// }
// export function calculateBonus(employeeStartDate) {
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const startDate = new Date(employeeStartDate);
//   const yearsInCompany = currentYear - startDate.getFullYear();

//   // Bonus increment per year
//   const bonusIncrementPerYear = 0.5;

//   // Calculate the bonus
//   const bonus = 1 + yearsInCompany * bonusIncrementPerYear;

//   return bonus;
// }

// export function calculateMedicalAbsenceHandle(attendanceData) {
//   let medicalAbsenceCountByEmployee = [];
//   let medicalAbsenceDeductionByEmployee = [];
//   const medicalAbsenceMultiplier = 15;
//   attendanceData.forEach((attendance) => {
//     const {
//       attendance: hasAttendance,
//       reason_for_absence,
//       employee_id,
//     } = attendance;
//     if (!medicalAbsenceCountByEmployee[employee_id]) {
//       medicalAbsenceCountByEmployee[employee_id] = 0;
//     }
//     if (!medicalAbsenceDeductionByEmployee[employee_id]) {
//       medicalAbsenceDeductionByEmployee[employee_id] = 0;
//     }
//     if (!hasAttendance && reason_for_absence === "Medical") {
//       // Count days with attendance 0 and reason_for_absence is "Medical"
//       medicalAbsenceCountByEmployee[employee_id]++;
//     }
//     medicalAbsenceDeductionByEmployee[employee_id] +=
//       medicalAbsenceCountByEmployee[employee_id] * medicalAbsenceMultiplier;
//   });
//   const medicalAbsenceDeductionList = Object.keys(
//     medicalAbsenceDeductionByEmployee
//   ).map((employeeId) => ({
//     employee_id: parseInt(employeeId, 10),
//     total_deduction_hours: medicalAbsenceDeductionByEmployee[employeeId],
//   }));
//   return medicalAbsenceDeductionList;
// }
// export function calculateDeductions(attendanceData) {
//   const latenessRate = 6;
//   const absentDayRate = 40;
//   let totalDeductionByEmployee = [];
//   let totalAbsentDeductionByEmployee = [];
//   let totalLatenessDeductionByEmployee = [];
//   //  employee_id,shiftstarttime,shiftendtime,arrival_time,exit_time,
//   attendanceData.forEach((attendance) => {
//     const {
//       reason_for_absence,
//       employee_id,
//       arrival_time,
//       exit_time,
//       shiftstarttime,
//       shiftendtime,
//     } = attendance;
//     if (!totalDeductionByEmployee[employee_id]) {
//       totalDeductionByEmployee[employee_id] = 0;
//     }
//     if (!totalAbsentDeductionByEmployee[employee_id]) {
//       totalAbsentDeductionByEmployee[employee_id] = 0;
//     }
//     if (!totalLatenessDeductionByEmployee[employee_id]) {
//       totalLatenessDeductionByEmployee[employee_id] = 0;
//     }
//     if (arrival_time && exit_time && shiftendtime && shiftstarttime) {
//       if (
//         Date.parse(exit_time) - Date.parse(arrival_time) <
//         Date.parse(shiftendtime) - Date.parse(shiftstarttime)
//       ) {
//         const shiftDuration = calculateHourDifference(
//           shiftstarttime,
//           shiftendtime
//         );
//         const workedHours = calculateHourDifference(arrival_time, exit_time);
//         const latenessHours = Math.max(0, workedHours - shiftDuration);
//         totalLatenessDeductionByEmployee[employee_id] +=
//           latenessHours * latenessRate;
//       }
//     }

//     if (reason_for_absence === "NoReason") {
//       // Deduct for days with attendance and absence reason is "NoReason"
//       totalAbsentDeductionByEmployee[employee_id] += absentDayRate;
//     }
//     totalDeductionByEmployee[employee_id] +=
//       totalAbsentDeductionByEmployee[employee_id] +
//       totalLatenessDeductionByEmployee[employee_id];
//   });
//   const totalDeductionsList = Object.keys(totalDeductionByEmployee).map(
//     (employeeId) => ({
//       employee_id: parseInt(employeeId, 10),
//       total_deduction_hours: totalDeductionByEmployee[employeeId],
//     })
//   );
//   const totalAbsentDeductionsList = Object.keys(
//     totalAbsentDeductionByEmployee
//   ).map((employeeId) => ({
//     employee_id: parseInt(employeeId, 10),
//     total_deduction_hours: totalAbsentDeductionByEmployee[employeeId],
//   }));
//   const totalLatenessDeductionsList = Object.keys(
//     totalLatenessDeductionByEmployee
//   ).map((employeeId) => ({
//     employee_id: parseInt(employeeId, 10),
//     total_deduction_hours: totalLatenessDeductionByEmployee[employeeId],
//   }));
//   return {
//     totalDeductionsList,
//     totalAbsentDeductionsList,
//     totalLatenessDeductionsList,
//   };
// }

// export function calculateBaseSalary(employeeData) {
//   let totalBaseSalaryByEmployee = [];

//   // 1:merge 2 tables
//   // 2:employee_id, arrival_time, exit_time, department, accessLevel
//   employeeData.forEach((employeeData) => {
//     const { department, accesslevel, exit_time, employee_id, arrival_time } =
//       employeeData;
//     let baseSalaryRate;

//     switch (department) {
//       case "Software_Development":
//         switch (accesslevel) {
//           case "member":
//             baseSalaryRate = 1.4;
//             break;
//           case "Admin":
//             baseSalaryRate = 1.6;
//             break;
//           case "Manager":
//             baseSalaryRate = 1.8;
//             break;
//           default:
//             console.log("Error");
//             break;
//         }
//         break;

//       case "Marketing":
//         switch (accesslevel) {
//           case "member":
//             baseSalaryRate = 1.8;
//             break;
//           case "Admin":
//             baseSalaryRate = 2;
//             break;
//           case "Manager":
//             baseSalaryRate = 2.2;
//             break;
//           default:
//             console.log("Error");
//             break;
//         }
//         break;

//       case "Sales":
//         switch (accesslevel) {
//           case "member":
//             baseSalaryRate = 2.5;
//             break;
//           case "Admin":
//             baseSalaryRate = 2.7;
//             break;
//           case "Manager":
//             baseSalaryRate = 2.9;
//             break;
//           default:
//             console.log("Error");
//             break;
//         }
//         break;

//       case "HR":
//         switch (accesslevel) {
//           case "member":
//             baseSalaryRate = 2;
//             break;
//           case "Admin":
//             baseSalaryRate = 2.3;
//             break;
//           case "Manager":
//             baseSalaryRate = 2.5;
//             break;
//           default:
//             console.log("Error");
//             break;
//         }
//         break;

//       default:
//         console.log("Error");
//         break;
//     }
//     //for base salary 7a tekhod bel parameter attendancedata li huwe ghalat aana two cases ya
//     //  mnaamel destructuring mara tenye mnekhod lrows li hiye btekhedon aw deghre mn chuf eza
//     //  btekhod ljoined table wlvariable li khala2neha lfiya 5columns
//     if (arrival_time && exit_time) {
//       if (!totalBaseSalaryByEmployee[employee_id]) {
//         totalBaseSalaryByEmployee[employee_id] = 0;
//       }
//       const baseSalary =
//         baseSalaryRate * calculateTotalHoursWorked(employeeData);
//       totalBaseSalaryByEmployee[employee_id] += baseSalary;
//     }
//     //lcalcule lezem ykoun bel foreach li foe
//     // lian aam bebrom aa kel employee id nasted for each
//     // return baseSalary; //hayda lreturn ghalat lezem yenaamal return array of object mlelements li balbo (for employee 1: base salary)...
//   });
//   const baseSalaryList = Object.keys(totalBaseSalaryByEmployee).map(
//     (employeeId) => ({
//       employee_id: parseInt(employeeId, 10),
//       baseSalary: totalBaseSalaryByEmployee[employeeId],
//     })
//   );

//   return baseSalaryList;
// };

// export function calculateEmployeePayroll(employeeData, attendanceData, employeeStartDate) {
//   // Calculate total hours worked
//   const totalHoursList = calculateTotalHoursWorked(attendanceData);

//   // Calculate total lateness hours
//   const totalLatenessList = calculateTotalLatenessHours(attendanceData);

//   // Calculate base salary
//   const baseSalaryList = calculateBaseSalary(employeeData);

//   // Calculate bonus
//   const bonus = calculateBonus(employeeStartDate);

//   // Calculate medical absence deduction
//   const medicalAbsenceDeductionList = calculateMedicalAbsenceHandle(attendanceData);

//   // Calculate total deductions, including absent and lateness deductions
//   const {
//     totalDeductionsList,
//     totalAbsentDeductionsList,
//     totalLatenessDeductionsList,
//   } = calculateDeductions(attendanceData);

//   // Combine the results using employee_id as the key
//   const combinedResults = employeeData.map((employee) => {
//     const employeeId = employee.employee_id;

//     const totalHours = totalHoursList.find((item) => item.employee_id === employeeId)?.total_hours_worked || 0;
//     const totalLateness = totalLatenessList.find((item) => item.employee_id === employeeId)?.total_lateness_hours || 0;
//     const baseSalary = baseSalaryList.find((item) => item.employee_id === employeeId)?.baseSalary || 0;
//     const medicalAbsenceDeduction = medicalAbsenceDeductionList.find((item) => item.employee_id === employeeId)?.total_deduction_hours || 0;
//     const totalDeduction = totalDeductionsList.find((item) => item.employee_id === employeeId)?.total_deduction || 0;
//     const deductionAbsence = totalAbsentDeductionsList.find((item) => item.employee_id === employeeId)?.deduction_absence || 0;
//     const deductionLateness = totalLatenessDeductionsList.find((item) => item.employee_id === employeeId)?.deduction_latenance || 0;

//     const totalSalary = baseSalary + bonus - totalDeduction - medicalAbsenceDeduction;

//     return {
//       employee_id: employeeId,
//       total_hours_worked: totalHours,
//       total_lateness_hours: totalLateness,
//       base_salary: baseSalary,
//       bonus: bonus,
//       medical_absence_deduction: medicalAbsenceDeduction,
//       total_deduction: totalDeduction,
//       deduction_absence: deductionAbsence,
//       deduction_lateness: deductionLateness,
//       total_salary: totalSalary,
//     };
//   });

//   return combinedResults;
// }

//   // Iterate through each entry in the attendanceData array
//   attendanceData.forEach((attendance) => {
//     // Destructure properties from the attendance object
//     const {
//       employee_id,
//       shiftstarttime,
//       shiftendtime,
//       arrival_time,
//       exit_time,
//     } = attendance;

//     // Check if all necessary time values are present
//     if (shiftstarttime && shiftendtime && arrival_time && exit_time) {
//       // Calculate the shift duration using the calculateHourDifference function
//       const shiftDuration = calculateHourDifference(
//         shiftstarttime,
//         shiftendtime
//       );

//       // Calculate the worked hours using the calculateHourDifference function
//       const workedHours = calculateHourDifference(arrival_time, exit_time);

//       // Calculate the lateness hours as the difference between worked hours and shift duration (max 0)
//       const latenessHours = Math.max(0, workedHours - shiftDuration);

//       // If the employee_id is not present in the totalLatenessByEmployee array, initialize it to 0
//       if (!totalLatenessByEmployee[employee_id]) {
//         totalLatenessByEmployee[employee_id] = 0;
//       }

//       // Accumulate the lateness hours to the total for the corresponding employee_id
//       totalLatenessByEmployee[employee_id] += latenessHours;
//     }
//   });

//   // Convert the totalLatenessByEmployee array to an array of objects
//   const totalLatenessList = Object.keys(totalLatenessByEmployee).map(
//     (employeeId) => ({
//       // Convert the employeeId to an integer (assuming it was a string)
//       employee_id: parseInt(employeeId, 10),
//       // Create an object with employee_id and total_lateness_hours properties
//       total_lateness_hours: totalLatenessByEmployee[employeeId],
//     })
//   );

//   // Return the final list of total lateness hours for each employee
//   return totalLatenessList;
// }
