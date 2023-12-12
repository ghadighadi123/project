import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCallback } from "react";
import { db } from "../../config";
import { set, ref } from "firebase/database";
import { uid } from "uid";
const FAQ = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    companyName: "",
    agentFullName: "",
    agentNumber: "",
    city: "",
    email: "",
    address: "",
    totalCost: "",
    arrivalDate: "",
    payingInvoiceDate: "",
  };
  const handleFormSubmit1 = useCallback((values, actions) => {
    const {
      companyName,
      agentFullName,
      agentNumber,
      city,
      email,
      address,
      totalCost,
      arrivalDate,
      payingInvoiceDate,
    } = values;
    actions.setSubmitting(false);
    actions.resetForm();
    const id = uid();
    set(ref(db, `data/transaction/${id}`), {
      companyName,
      agentFullName,
      agentNumber,
      city,
      email,
      address,
      totalCost,
      arrivalDate,
      payingInvoiceDate,
    });
  }, []);

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
                type="text"
                label="Absence Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.absence_date}
                name="absence_date"
                error={!!touched.absence_date && !!errors.absence_date}
                helperText={touched.absence_date && errors.absence_date}
                sx={{ gridColumn: "span 2" }}/>
                
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Reason for Absence "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reason_for_absence}
                name="reason_for_absence"
                error={!!touched.reason_for_absence && !!errors.reason_for_absence}
                helperText={touched.reason_for_absence && errors.reason_for_absence}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label=" Attendance Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values. attendance_date}
                name=" attendance_date"
                error={!!touched. attendance_date && !!errors. attendance_date}
                helperText={touched. attendance_date && errors. attendance_date}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="IN Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.arrival_time }
                name="arrival_time "
                error={!!touched.arrival_time  && !!errors.arrival_time }
                helperText={touched.arrival_time  && errors.arrival_time }
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="OUT Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.exit_time }
                name="exit_time "
                error={!!touched.exit_time  && !!errors.exit_time }
                helperText={touched.exit_time  && errors.exit_time }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Shift Start Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shiftstarttime }
                name="shiftstarttime "
                error={!!touched.shiftstarttime  && !!errors.shiftstarttime }
                helperText={touched.shiftstarttime  && errors.shiftstarttime }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Shift end Time "
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
                type="Text"
                label="Notes"
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

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const dateRegExp = /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/(2100|20[3-9][0-9]|202[1-9])$/;


const checkoutSchema = yup.object().shape({
  companyName: yup.string().required("required"),
  agentFullName: yup.string().required("required"),
  agentNumber: yup.string() .matches(phoneRegExp, "Phone number is not valid").required("required"),
  city: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  address: yup.string().required("required"),
  arrivalDate: yup.string().matches(dateRegExp, "wrong date format !").required("required"),
  payingInvoiceDate: yup.string().matches(dateRegExp, "wrong date format !").required("required"),
});
// const initialValues = {
//   employee_id: "",
//   absence_date: "",
//   reason_for_absence: "",
//   attendance_date: "",
//   arrival_time: "",
//   start_time: "",
//   shiftendtime: "",
//   notes: "",
// };

export default FAQ;
