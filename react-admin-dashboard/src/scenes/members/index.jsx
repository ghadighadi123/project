import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const Members = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [departmentList, setDepartmentList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  useEffect(() => {
    const fetchDepartmentList = async () => {
      try {
        const res = await axios.get("http://localhost:8800/departments");
        setDepartmentList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartmentList();
    const fetchPositionList = async () => {
      try {
        const res = await axios.get("http://localhost:8800/positions");
        setPositionList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPositionList();
  }, []);
  const handleFormSubmit1 = (values, actions) => {
    console.log("kifak lyom");
    console.log(values);
    axios
      .post("http://localhost:8800/employees", values)
      .then((response) => {
        console.log("Response:", response);

        if (response.data) {
          console.log("Data:", response.data);
        } else {
          console.error("Empty or invalid JSON response");
        }
      })
      .catch((err) => console.error("Error:", err));
    console.log("hi");
    actions.setSubmitting(false);
    actions.resetForm();
  };
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

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date Of Birth (yyyy/mm/dd)"
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
                    style: { maxHeight: "200px", fontSize: "small" }, // Adjust as needed
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select gender
                </MenuItem>
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
                value={values.department_id}
                name="department_id"
                error={!!touched.department_id && !!errors.department_id}
                helperText={touched.department_id && errors.department_id}
                sx={{ gridColumn: "span 2" }}
                SelectProps={{
                  MenuProps: {
                    style: { maxHeight: "300px", fontSize: "small" }, // Adjust as needed
                  },
                }}
              >
                {departmentList.map((department) => {
                  return (
                    <MenuItem value={department.department_id}>
                      {department.department}
                    </MenuItem>
                  );
                })}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                label="Position"
                select
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position_id}
                name="position_id"
                error={!!touched.position_id && !!errors.position_id}
                helperText={touched.position_id && errors.position_id}
                sx={{ gridColumn: "span 2" }}
                SelectProps={{
                  MenuProps: {
                    style: { maxHeight: "200px", fontSize: "small" }, // Adjust as needed
                  },
                }}
              >
                {positionList.map((position) => {
                  return (
                    <MenuItem value={position.position_id}>
                      {position.position}
                    </MenuItem>
                  );
                })}
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
const dateRegExp =
  /^(202[1-9]|20[3-9][0-9]|2100)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;
const dateRegExp1 =
  /^(196[0-9]|197[0-9]|198[0-9]|199[0-9]|200[0-9]|201[0-9]|202[0-9]|2030)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("required"),

  startdate: yup
    .string()
    .matches(dateRegExp, "wrong date format !")
    .required("required"),
  age: yup
    .string()
    .matches(dateRegExp1, "invalid date format!")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  gender: yup.string().required("required"),
  department_id: yup.string().required("required"),
  position_id: yup.string().required("required"),
});

const initialValues = {
  fullName: "",
  startdate: "",
  age: "",
  phone: "",
  email: "",
  gender: "",
  department_id: "",
  position_id: "",
};

export default Members;
