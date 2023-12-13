import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, {useState,  useEffect } from 'react';
import axios from 'axios'

const Membersinfo = () => {

  const [Memberinfo, setMembersinfo] = useState([]);

  useEffect(() => {

    const fetchemployees = async () =>{
      try{
          const res = await axios.get("http://localhost:8800/attendance")
          setMembersinfo(res.data)
          console.log(res)
      }catch(err){
          console.log(err)
      }
    }
  fetchemployees()
}, []);

const rows = Memberinfo
    ? Object.keys(Memberinfo).map((id) => ({ id, ...Memberinfo[id] }))
    : []; 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "employee_id",
      headerName: "Employee ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "attendance",
      headerName: "Attendance",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "reason_for_absence",
      headerName: "Reason for Absence ",
      flex: 1.3,
    },
    {
      field: "dates",
      headerName: "Date",
      flex: 1.3,
    },
    {
      field: "arrival_time",
      headerName: "IN Time",
      flex: 0.7,
    },
    {
      field: "exit_time",
      headerName: "OUT Time",
      flex: 0.8,
    },
    {
      field: "shiftstarttime",
      headerName: "Shift Start Time",
      flex: 1,
    },
    {
      field: "shiftendtime",
      headerName: "Shift end Time",
      flex: 1,
    },
    {
      field: "notes",
      headerName: "Notes",
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

export default Membersinfo;
