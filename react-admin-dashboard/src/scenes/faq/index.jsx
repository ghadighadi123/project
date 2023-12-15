import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { MenuItem } from "@mui/material";
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const todayDate = `${year}-${month}-${day}`;
const FAQ = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit1 = (values, actions) => {
    const {
      arrival_time,
      attendance,
      dates,
      employee_id,
      exit_time,
      notes,
      reason_for_absence,
      shiftendtime,
      shiftstarttime,
    } = values;
    const parsedValues = {
      dates,
      employee_id,
      notes,
      reason_for_absence: attendance === "true" ? "" : reason_for_absence,
      arrival_time:
        attendance === "false" ? "" : `${todayDate} ${arrival_time}`,
      exit_time: attendance === "false" ? "" : `${todayDate} ${exit_time}`,
      shiftendtime:
        attendance === "false" ? "" : `${todayDate} ${shiftendtime}`,
      shiftstarttime:
        attendance === "false" ? "" : `${todayDate} ${shiftstarttime}`,
      attendance: attendance === "true",
    };
    console.log(parsedValues);
    axios
      .post("http://localhost:8800/attendance", parsedValues)
      .then((response) => {
        console.log("Response:", response);

        if (response.data) {
          console.log("Data:", response.data);
        } else {
          console.error("Empty or invalid JSON response");
        }
      })
      .catch((err) => console.error("Error:", err));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Box m="20px">
      <Header title="Members Data Form" subtitle="Add Members Data" />

      <Formik
        onSubmit={handleFormSubmit1}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Employee ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.employee_id}
                name="employee_id"
                error={!!touched.employee_id && !!errors.employee_id}
                helperText={touched.employee_id && errors.employee_id}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                select
                label="Attendance"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.attendance}
                name="attendance"
                error={!!touched.attendance && !!errors.attendance}
                helperText={touched.attendance && errors.attendance}
                sx={{ gridColumn: "span 2" }}
                SelectProps={{
                  MenuProps: {
                    style: { maxHeight: "200px", fontSize: "small" },
                  },
                }}
              >
                <MenuItem disabled>Select Attendance</MenuItem>
                <MenuItem value="true">Present</MenuItem>
                <MenuItem value="false">Absent</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                select
                label="Reason for Absence"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reason_for_absence}
                name="reason_for_absence"
                error={
                  !!touched.reason_for_absence && !!errors.reason_for_absence
                }
                helperText={
                  touched.reason_for_absence && errors.reason_for_absence
                }
                sx={{ gridColumn: "span 2" }}
                SelectProps={{
                  MenuProps: {
                    style: { maxHeight: "200px", fontSize: "small" }, // Adjust as needed
                  },
                }}
              >
                <MenuItem value="selectReason" disabled>
                  Select Reason for Absence
                </MenuItem>
                <MenuItem value="NoReason">No Valid Reason</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="OffDay">OFF Day</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dates}
                name="dates"
                error={!!touched.dates && !!errors.dates}
                helperText={touched.dates && errors.dates}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="IN Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.arrival_time}
                name="arrival_time"
                error={!!touched.arrival_time && !!errors.arrival_time}
                helperText={touched.arrival_time && errors.arrival_time}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="OUT Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.exit_time}
                name="exit_time"
                error={!!touched.exit_time && !!errors.exit_time}
                helperText={touched.exit_time && errors.exit_time}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Shift Start Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shiftstarttime}
                name="shiftstarttime"
                error={!!touched.shiftstarttime && !!errors.shiftstarttime}
                helperText={touched.shiftstarttime && errors.shiftstarttime}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Shift end Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shiftendtime}
                name="shiftendtime"
                error={!!touched.shiftendtime && !!errors.shiftendtime}
                helperText={touched.shiftendtime && errors.shiftendtime}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="Notes"
                label="Brief Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.notes}
                name="notes"
                error={!!touched.notes && !!errors.notes}
                helperText={touched.notes && errors.notes}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Member Data
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const dateRegExp =
  /^(202[1-9]|20[3-9][0-9]|2100)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;
const time24hRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const checkoutSchema = yup.object().shape({
  employee_id: yup.string().required("required"),
  dates: yup
    .string()
    .matches(dateRegExp, "wrong date format !")
    .required("required"),
  attendance: yup.boolean().required("required"),
  arrival_time: yup
    .string()
    .matches(time24hRegex, "Time is invalid")
    .required("required"),
  exit_time: yup
    .string()
    .matches(time24hRegex, "Time is not valid")
    .required("required"),
  shiftstarttime: yup
    .string()
    .matches(time24hRegex, "Time is not valid")
    .required("required"),
  shiftendtime: yup
    .string()
    .matches(time24hRegex, "Time is not valid")
    .required("required"),
  reason_for_absence: yup.string().required("required"),
  notes: yup.string().required("required"),
});

const initialValues = {
  employee_id: "",
  dates: `${todayDate}`,
  attendance: "",
  arrival_time: "",
  exit_time: "",
  shiftstarttime: "",
  shiftendtime: "",
  reason_for_absence: "",
  notes: "",
};

export default FAQ;
