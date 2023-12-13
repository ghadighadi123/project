
// function calculateHourDifference(startTimestamp, endTimestamp) {//zabta
//     const start = new Date(startTimestamp.replace(' ', 'T'));
//     const end = new Date(endTimestamp.replace(' ', 'T'));
//     const diffInMilliseconds = end - start;
//     return diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
// }
  
//   // Function to calculate total hours worked for a given month
//   function calculateTotalHoursWorked(attendanceData) {
//     let totalHoursWorked = 0;
  
//     attendanceData.forEach((attendance) => {
//       const { arrival_time, exit_time } = attendance;
  
//       if (arrival_time && exit_time) {
//         totalHoursWorked += calculateHourDifference(arrival_time, exit_time);
//       }
//     });
  
//     return totalHoursWorked;
//   }
  
//   // Function to calculate total lateness hours for a given month
//   function calculateTotalLatenessHours(attendanceData) {
//     let totalLatenessHours = 0;
  
//     attendanceData.forEach((attendance) => {
//       const { shiftstarttime, shiftendtime, arrival_time, exit_time } = attendance;
  
//       if (shiftstarttime && shiftendtime && arrival_time && exit_time) {
//         const shiftDuration = calculateHourDifference(shiftstarttime, shiftendtime);
//         const workedHours = calculateHourDifference(arrival_time, exit_time);
//         const latenessHours = Math.max(0, workedHours - shiftDuration);
//         totalLatenessHours += latenessHours;
//       }
//     });
  
//     return totalLatenessHours;
//   }


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
  
function calculateHourDifference(startTimestamp, endTimestamp) {
    const start = new Date(startTimestamp.replace(" ", "T"));
    const end = new Date(endTimestamp.replace(" ", "T"));
    const diffInMilliseconds = end - start;
    return diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
  }


  function calculateTotalHoursWorked(attendanceData, employeeId) {
    let totalHoursWorked = 0;

    attendanceData.forEach((attendance) => {
      const { employee_id, arrival_time, exit_time } = attendance;
      if (employee_id === employeeId && arrival_time && exit_time) {
        totalHoursWorked += calculateHourDifference(
          arrival_time,
          exit_time
        );
      }
    });

    return totalHoursWorked;
  }


  function calculateTotalLatenessHours(attendanceData, employeeId) {
    let totalLatenessHours = 0;

    attendanceData.forEach((attendance) => {
      const {
        shiftstarttime,
        shiftendtime,
        arrival_time,
        exit_time,
        employee_id,
      } = attendance;
      if (
        shiftstarttime &&
        shiftendtime &&
        arrival_time &&
        exit_time &&
        employee_id === employeeId
      ) {
        const shiftDuration = calculateHourDifference(
          shiftstarttime,
          shiftendtime
        );
        const workedHours = calculateHourDifference(
          arrival_time,
          exit_time
        );
        const latenessHours = Math.max(0, shiftDuration - workedHours);
        totalLatenessHours += latenessHours;
      }
    });

    return totalLatenessHours;
  }


  const employeeData = [
    {
      employee_id: 123,
      phone: "123-456-7890",
      fullName: "John Doe",
      age: 25,
      gender: "Male",
      department: "Software_Development",
      accesslevel: "member",
      email: "john.doe@example.com",
      startdate: "2022-12-31T22:00:00.000Z",
    },
    {
      employee_id: 124,
      phone: "412-522-2356",
      fullName: "Ralph Merhi",
      age: 21,
      gender: "Male",
      department: "Marketing",
      accesslevel: "Admin",
      email: "ralph@example.com",
      startdate: "2022-12-31T22:00:00.000Z",
    },
    {
      employee_id: 125,
      phone: "234-802-2144",
      fullName: "Ghadi Abou deleh",
      age: 20,
      gender: "Male",
      department: "HR",
      accesslevel: "Manager",
      email: "ghadi@example.com",
      startdate: "2022-12-31T22:00:00.000Z",
    },
  ];
  const attendanceData = [
    {
      employee_id: 123,
      arrival_time: "2023-12-15 10:00:00",
      exit_time: "2023-12-15 12:00:00",
      shiftstarttime: "2023-12-15 08:00:00",
      shiftendtime: "2023-12-15 17:00:00",
      attendance: true,
      reason_for_absence: "",
    },
    {
      employee_id: 123,
      arrival_time: "",
      exit_time: "",
      shiftstarttime: "2023-12-16 08:00:00",
      shiftendtime: "2023-12-16 17:00:00",
      attendance: false,
      reason_for_absence: "OffDay",
    },
    {
      employee_id: 124,
      arrival_time: "",
      exit_time: "",
      shiftstarttime: "2023-12-15 08:00:00",
      shiftendtime: "2023-12-15 17:00:00",
      attendance: false,
      reason_for_absence: "NoReason",
    },
    {
      employee_id: 125,
      arrival_time: "2023-12-15 10:00:00",
      exit_time: "2023-12-15 12:00:00",
      shiftstarttime: "2023-12-15 08:00:00",
      shiftendtime: "2023-12-15 17:00:00",
      attendance: true,
      reason_for_absence: "",
    },
  ];


  function calculateBaseSalary(employeeData, totalHoursWorked) {
    const { department, accesslevel } = employeeData;
    let baseSalaryRate;
    switch (department) {
      case "Software_Development":
        switch (accesslevel) {
          case "member":
            baseSalaryRate = 1.4;
            break;
          case "Admin":
            baseSalaryRate = 1.6;
            break;
          case "Manager":
            baseSalaryRate = 1.8;
            break;
          default:
            console.log("Error");
            break;
        }
        break;

      case "Marketing":
        switch (accesslevel) {
          case "member":
            baseSalaryRate = 1.8;
            break;
          case "Admin":
            baseSalaryRate = 2;
            break;
          case "Manager":
            baseSalaryRate = 2.2;
            break;
          default:
            console.log("Error");
            break;
        }
        break;

      case "Sales":
        switch (accesslevel) {
          case "member":
            baseSalaryRate = 2.5;
            break;
          case "Admin":
            baseSalaryRate = 2.7;
            break;
          case "Manager":
            baseSalaryRate = 2.9;
            break;
          default:
            console.log("Error");
            break;
        }
        break;

      case "HR":
        switch (accesslevel) {
          case "member":
            baseSalaryRate = 2;
            break;
          case "Admin":
            baseSalaryRate = 2.3;
            break;
          case "Manager":
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

    const baseSalary = baseSalaryRate * totalHoursWorked;
    return baseSalary;
  }


  const latenessRate = 6;
  const absentDayRate = 40;
  function calculateDeductions(attendanceData, employeeID) {
    let totalLatenessDeduction = 0;
    let totalAbsentDeduction = 0;

    attendanceData.forEach((attendance) => {
      const {
        attendance: hasAttendance,
        reason_for_absence,
        employee_id,
      } = attendance;
      if (employee_id === employeeID) {
        if (hasAttendance) {
          // Deduct based on lateness hours
          totalLatenessDeduction +=
            calculateTotalLatenessHours(attendanceData, employeeID) *
            latenessRate;
        } else if (reason_for_absence === "NoReason") {
          // Deduct for days with attendance and absence reason is "NoReason"
          totalAbsentDeduction += absentDayRate;
        }
      }
    });
    const total = totalLatenessDeduction + totalAbsentDeduction;
    return [total, totalAbsentDeduction, totalLatenessDeduction];
  }
  //   console.log(calculateDeductions(attendanceData, 125));



  const medicalAbsenceMultiplier = 15;
  function calculateMedicalAbsenceHandle(attendanceData, employeeID) {
    let medicalAbsenceCount = 0;

    attendanceData.forEach((attendance) => {
      const {
        attendance: hasAttendance,
        reason_for_absence,
        employee_id,
      } = attendance;
      if (employee_id === employeeID) {
        if (!hasAttendance && reason_for_absence === "Medical") {
          // Count days with attendance 0 and reason_for_absence is "Medical"
          medicalAbsenceCount++;
        }
      }
    });

    // Multiply the count by the fixed rate
    const medicalAbsenceDeduction =
      medicalAbsenceCount * medicalAbsenceMultiplier;

    return medicalAbsenceDeduction;
  }


  function calculateBonus(employeeStartDate) {
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

  
  function calculateSalaryWithBonusAndDeductions(
    employeeData,
    attendanceData,
    employeeID
  ) {
    const startdate = employeeData.startdate;

    // Calculate total hours worked using the provided function
    const totalHoursWorked = calculateTotalHoursWorked(
      attendanceData,
      employeeID
    );
    // Calculate base salary without bonus
    const baseSalary = calculateBaseSalary(employeeData, totalHoursWorked);

    // Calculate the bonus based on the employee's start date

    const bonus = calculateBonus(startdate);

    // Calculate the final salary including bonus
    const salaryWithBonus = baseSalary * bonus;

    // Calculate deductions
    const [total, totalAbsentDeduction, totalLatenessDeduction] =
      calculateDeductions(attendanceData, employeeID);
    const medicalAbsenceDeduction = calculateMedicalAbsenceHandle(
      attendanceData,
      employeeID
    );

    const totalDeductions =
      totalLatenessDeduction +
      totalAbsentDeduction +
      medicalAbsenceDeduction;

    // Calculate the net salary
    const netSalary = salaryWithBonus - totalDeductions;

    return {
      baseSalary,
      salaryWithBonus,
      totalLatenessDeduction,
      totalAbsentDeduction,
      medicalAbsenceDeduction,
      totalDeductions,
      netSalary,
    };
  }
  



