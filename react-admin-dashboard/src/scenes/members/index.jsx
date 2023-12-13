import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
<<<<<<< HEAD
import { useCallback, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./style.css";
import dayjs from "dayjs";
=======
import {MenuItem } from '@mui/material';
import axios from "axios";

>>>>>>> 939f1873107542bbfd016fac7f71e682c3877328
const Members = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const today = new Date();
  const minDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const startDate = useRef(dayjs(minDate));

<<<<<<< HEAD
  const handleFormSubmit = useCallback((values, actions) => {
    const { name, city, zipcode, email, contact, address, age } = values;
    const newDate = `${startDate.current.year()}-${
      startDate.current.month() + 1
    }-${startDate.current.date()}`;
    if (Date.parse(newDate) < Date.parse(minDate)) return;
    actions.setSubmitting(false);
    actions.resetForm();
    startDate.current = dayjs(minDate);
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     city,
    //     zipcode,
    //     email,
    //     contact,
    //     address,
    //     age,
    //     date,
    //   }),
    // };

    // fetch(
    //   "https://ghadiproject-default-rtdb.firebaseio.com/Data/userData.json",
    //   options
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Response from Firebase:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting form:", error);
    //   });
  }, []);

=======
  const handleFormSubmit1 = (values, actions) => {    
    console.log("kifak lyom")
    axios.post("http://localhost:8800/employees",values)
      .then((response) => {
        console.log("Response:", response);
  
        if (response.data) {
          console.log("Data:", response.data);

        } else {
          console.error("Empty or invalid JSON response");
        }
      })
      .catch((err) => console.error("Error:", err));
      console.log("hi")
      actions.setSubmitting(false);
          actions.resetForm();
  };
  
 
>>>>>>> 939f1873107542bbfd016fac7f71e682c3877328
  return (
    <Box m="20px">
      <Header title="ADD MEMBER" subtitle="Add a New Team Member Profile" />

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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
<<<<<<< HEAD
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="style"
                  sx={{ gridColumn: "span 2" }}
                  minDate={dayjs(minDate)}
                  label="Start Date"
                  value={startDate.current}
                  onChange={(newDate) => {
                    const change = `${newDate.year()}-${
                      newDate.month() + 1
                    }-${newDate.date()}`;
                    startDate.current = dayjs(change);
                  }}
                />
              </LocalizationProvider>
=======
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }} 
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Start Date (yyyy/mm/dd)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startdate}
                name="startdate"
                error={!!touched.startdate && !!errors.startdate}
                helperText={touched.startdate && errors.startdate}
                sx={{ gridColumn: "span 2" }}
              />

>>>>>>> 939f1873107542bbfd016fac7f71e682c3877328
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />

             <TextField
              fullWidth
              variant="filled"
              label="Gender"
              select
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.gender}
              name="gender"
              error={!!touched.gender && !!errors.gender}
              helperText={touched.gender && errors.gender}
              sx={{ gridColumn: "span 2" }}
              SelectProps={{
                MenuProps: {
                  style: { maxHeight: '200px', fontSize: 'small' } // Adjust as needed
                }
              }}
               >
              <MenuItem value="" disabled>Select gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
            
              <TextField
              fullWidth
              variant="filled"
              label="Department"
              select
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.department}
              name="department"
              error={!!touched.department && !!errors.department}
              helperText={touched.department && errors.department}
              sx={{ gridColumn: "span 2" }}
              SelectProps={{
                MenuProps: {
                  style: { maxHeight: '300px', fontSize: 'small' } // Adjust as needed
                }
              }}
              >
              <MenuItem value="" disabled>Select Department</MenuItem>
              <MenuItem value="HR Department">HR Department</MenuItem>
              <MenuItem value="Software Development Department">Software Development Department</MenuItem>
              <MenuItem value="Marketing Department">Marketing Department</MenuItem>
              <MenuItem value="Sales Department">Sales Department</MenuItem>
              <MenuItem value="Customer Service/Support Department">Customer Service/Support Department</MenuItem>
              <MenuItem value="Operations/Production Department">Operations/Production Department</MenuItem>
              <MenuItem value="Research and Development (R&D) Department">Research and Development (R&D) Department</MenuItem>
              <MenuItem value="Legal Department">Legal Department</MenuItem>
              <MenuItem value="Administration Department">Administration Department</MenuItem>
              <MenuItem value="Supply Chain/Logistics Department">Supply Chain/Logistics Department</MenuItem>
              <MenuItem value="Quality Assurance/Control Department">Quality Assurance/Control Department</MenuItem>
              <MenuItem value="Project Management Department">Project Management Department</MenuItem>
              <MenuItem value="Public Relations (PR) Department">Public Relations (PR) Department</MenuItem>
              <MenuItem value="Information Technology (IT) Department">Information Technology (IT) Department</MenuItem>
              <MenuItem value="Training and Development Department">Training and Development Department</MenuItem>
              <MenuItem value="Facilities Management Department">Facilities Management Department</MenuItem>
              <MenuItem value="Health and Safety Department">Health and Safety Department</MenuItem>
              <MenuItem value="Corporate Communications Department">Corporate Communications Department</MenuItem>
              <MenuItem value="Environmental, Social, and Governance (ESG) Department">Environmental, Social, and Governance (ESG) Department</MenuItem>
              <MenuItem value="IT Security/Cybersecurity Department">IT Security/Cybersecurity Department</MenuItem>
              <MenuItem value="Finance Department">Finance Department</MenuItem>
            </TextField>

            <TextField
              fullWidth
              variant="filled"
              label="Access Level"
              select
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.accesslevel}
              name="accesslevel"
              error={!!touched.accesslevel && !!errors.accesslevel}
              helperText={touched.accesslevel && errors.accesslevel}
              sx={{ gridColumn: "span 2" }}
              SelectProps={{
                MenuProps: {
                  style: { maxHeight: '200px', fontSize: 'small' } // Adjust as needed
                }
              }}
              >
              <MenuItem value="" disabled>Select Access Level</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="manager">manager</MenuItem>
              <MenuItem value="employee">employee</MenuItem>
            </TextField> 
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Member
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const ageRegExp = /^(1[8-9]|[2-9][0-9]|100)$/;
<<<<<<< HEAD

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  gender: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  Phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
=======
const dateRegExp = /^(202[1-9]|20[3-9][0-9]|2100)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;


const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  startdate: yup.string().matches(dateRegExp, "wrong date format !").required("required"),
>>>>>>> 939f1873107542bbfd016fac7f71e682c3877328
  age: yup.string().matches(ageRegExp, "invalid age").required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  gender: yup.string().required("required"),
  department:yup.string().required("required"),
  accesslevel: yup.string().required("required"),
});

const initialValues = {
<<<<<<< HEAD
  name: "",
=======
  fullName: "",
  startdate: "",
>>>>>>> 939f1873107542bbfd016fac7f71e682c3877328
  age: "",
  phone: "",
  email: "",
  gender: "",
  department: "",
  accesslevel:"",
};

export default Members;
