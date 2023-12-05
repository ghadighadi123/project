import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCallback } from "react";

const FAQ = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    companyName: "",
    agentFullName: "",
    city: "",
    email: "",
    contact: "",
    address: "",
    totalCost: "",
    arrivalDate: "",
    payingInvoiceDate: "",
  };
  const handleFormSubmit1 = useCallback((values) => {
    console.log("hello");
    // console.log(actions);
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
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "aplication/json",
    //   },

    //   body: JSON.stringify({
    //     companyName,
    //     agentFullName,
    //     agentNumber,
    //     city,
    //     email,
    //     address,
    //     totalCost,
    //     arrivalDate,
    //     payingInvoiceDate,
    //   }),
    // };
    // fetch("https://tgrp-38a89-default-rtdb.firebaseio.com/sales.json", options);
  }, []);

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Agent Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.agentFullName}
                name="agentFullName"
                error={!!touched.agentFullName && !!errors.agentFullName}
                helperText={touched.agentFullName && errors.agentFullName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label=" Sales Agent Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
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
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Products Delivered Total Cost"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.totalCost}
                name="totalCost"
                error={!!touched.totalCost && !!errors.totalCost}
                helperText={touched.totalCost && errors.totalCost}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="Text"
                label="Shipping Arrival Date (dd/mm/yyyy)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.arrivalDate}
                name="arrivalDate"
                error={!!touched.arrivalDate && !!errors.arrivalDate}
                helperText={touched.arrivalDate && errors.arrivalDate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="Text"
                label="Paying Invoice Date (dd/mm/yyyy)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.payingInvoiceDate}
                name="payingInvoiceDate"
                error={
                  !!touched.payingInvoiceDate && !!errors.payingInvoiceDate
                }
                helperText={
                  touched.payingInvoiceDate && errors.payingInvoiceDate
                }
                sx={{ gridColumn: "span 1.5" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add transaction
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
const dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
const costRegExp = /^\d+$/;

const checkoutSchema = yup.object().shape({
  companyName: yup.string().required("required"),
  agentfullName: yup.string().required("required"),
  city: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  totalCost: yup.string().matches(costRegExp, "Not valid").required("required"),
  arrivalDate: yup
    .string()
    .matches(dateRegExp, "wrong date format !")
    .required("required"),
  payingInvoiceDate: yup
    .string()
    .matches(dateRegExp, "wrong date format !")
    .required("required"),
});

export default FAQ;
