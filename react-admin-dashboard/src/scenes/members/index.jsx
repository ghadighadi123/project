import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCallback, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./style.css";
import dayjs from "dayjs";
const Members = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const today = new Date();
  const minDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const startDate = useRef(dayjs(minDate));

  const handleFormSubmit = useCallback((values, actions) => {
    const { name, city, zipcode, email, contact, address, age } = values;
    const newDate = `${startDate.current.year()}-${
      startDate.current.month() + 1
    }-${startDate.current.date()}`;
    if (Date.parse(newDate) <= Date.parse(today)) return;
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

  return (
    <Box m="20px">
      <Header title="ADD MEMBER" subtitle="Add a New Team Member Profile" />

      <Formik
        onSubmit={handleFormSubmit}
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
                label=" Name"
                onBlur={handleBlur}
                onChange={handleChange}
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
                value={values.Phone}
                name="Phone"
                error={!!touched.Phone && !!errors.Phone}
                helperText={touched.Phone && errors.Phone}
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
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add new Member
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

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  gender: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  Phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  age: yup.string().matches(ageRegExp, "invalid age").required("required"),
  position: yup.string().required("required"),
});
const initialValues = {
  name: "",
  age: "",
  Phone: "",
  email: "",
  gender: "",
  position: "",
};

export default Members;
