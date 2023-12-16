import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Contactsdata = () => {
  const [contactsData, setcontactsData] = useState([]);

  useEffect(() => {
    const fetchemployees = async () => {
      try {
        const res = await axios.get("http://localhost:8800/contacts");
        const filteredMembers = res.data.filter((member) => member !== null);
        setcontactsData(filteredMembers);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchemployees();
  }, []);

  const rows = contactsData
    ? Object.keys(contactsData).map((id) => ({ id, ...contactsData[id] }))
    : [];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      flex: 1.3,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1.3,
    },
    {
      field: "zipcode",
      headerName: "Zip code",
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.8,
    },
    {
      field: "contact",
      headerName: "Contact Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Brief Description",
      flex: 1.5,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS DATA"
        subtitle="Contacts Data For Future References"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contactsdata;
