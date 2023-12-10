import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from "../../config";
import { off } from 'firebase/database';



const Contacts = () => {

  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   fetch('https://tgrp-38a89-default-rtdb.firebaseio.com/UserData.json')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Network response was not ok, status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       // Set the retrieved data to state
  //       setUserData(data);
  //     })
  //     .catch(error => {
  //       console.error('Fetch error:', error);
  //     });
  // }, []); // Empty dependency array means this effect runs once when the component mounts

  // const rows = userData
  //   ? Object.keys(userData).map((id) => ({ id, ...userData[id] }))
  //   : [];

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Get a reference to the 'data/contact/' path
    const contactRef = ref(db, 'data/contact/');

    // Use 'onValue' to listen for changes in the data
    onValue(contactRef, (snapshot) => {
      const contactData = snapshot.val();
      if (contactData) {
        // Convert the object of objects into an array
        const contactArray = Object.entries(contactData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setContacts(contactArray);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      off(contactRef);
    };
  }, []); // Empty dependency array to run the effect only once

 const rows = contacts
    ? Object.keys(contacts).map((id) => ({ id, ...contacts[id] }))
    : []; 


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Identifier", flex: 1 },
    
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex:0.3,
    },
    {
      field: "contact",
      headerName: "Phone",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.25,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.75,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.75,
    },
    {
      field: "zipcode",
      headerName: "Zip Code",
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "brief description",
      flex: 1.5,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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

export default Contacts;
