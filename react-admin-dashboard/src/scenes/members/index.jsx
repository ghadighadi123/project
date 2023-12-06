import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCallback } from "react";

const Members = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = useCallback((values) => {
    console.log("Submitting form with values:", values);

    const { firstName, lastName, city, zipcode, email, contact, address, age } =
      values;

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        city,
        zipcode,
        email,
        contact,
        address,
        age,
      }),
    };

    fetch(
      "https://ghadiproject-default-rtdb.firebaseio.com/Data/userData.json",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from Firebase:", data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
                value={values.Name}
                name="name"
                error={!!touched.Name && !!errors.Name}
                helperText={touched.Name && errors.Name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Start Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startdate}
                name="startdate"
                error={!!touched.startdate && !!errors.startdate}
                helperText={touched.startdate && errors.startdate}
                sx={{ gridColumn: "span 2" }}
              />

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
const dateRegExp = /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  startdate: yup
    .string()
    .matches(dateRegExp, "wrong date format !")
    .required("required"),
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
  startdate: "",
  age: "",
  Phone: "",
  email: "",
  gender: "",
  position: "",
};

export default Members;
