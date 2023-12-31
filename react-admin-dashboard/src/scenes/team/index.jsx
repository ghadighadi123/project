import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Team = () => {

  const [Member, setMembers] = useState([]);

  useEffect(() => {

      const fetchemployees = async () =>{
        try{
            const res = await axios.get("http://localhost:8800/employees")
            setMembers(res.data)
            console.log(res)
        }catch(err){
            console.log(err)
        }
      }
    fetchemployees()
  }, []);



 const rows = Member
    ? Object.keys(Member).map((id) => ({ id, ...Member[id] }))
    : []; 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { 
      field: "employee_id", 
      headerName: "employee_id",
      flex:0.8, 
    },
    {
      field: "fullName",
      headerName: "Fullname",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.5,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.4,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 0.7,
    },
    {
      field: "startdate",
      headerName: "Start Date",
      flex: 0.6,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { accesslevel  } }) => {
        return (
          <Box
            width="60%"
            // m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              accesslevel === "admin"
                ? colors.greenAccent[600]
                : accesslevel === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {accesslevel === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {accesslevel === "manager" && <SecurityOutlinedIcon />}
            {accesslevel === "employee" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {accesslevel}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
