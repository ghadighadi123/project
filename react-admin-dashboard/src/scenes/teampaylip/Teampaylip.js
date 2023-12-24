import { Box , Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, {useState,  useEffect } from 'react';
import axios from 'axios'

const Teampaylip = () => {

  const [paymentinfo, setPaymentinfo] = useState([]);

  useEffect(() => {

    const fetchemployees = async () =>{
      try{
          const res = await axios.get("http://localhost:8800/payroll")
          const filteredMembers = res.data.filter(member => member !== null);
          setPaymentinfo(filteredMembers)
          console.log(res)
      }catch(err){
          console.log(err)
      }
    }
  fetchemployees()
}, []);

const rows = paymentinfo
    ? Object.keys(paymentinfo).map((id) => ({ id, ...paymentinfo[id] }))
    : []; 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "employee_id",
      headerName: "Employee ID",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "total_hours_worked",
      headerName: "Worked Hours",
      flex: 1,
    },
    {
      field: "total_lateness_hours",
      headerName: "lateness time ",
      flex: 0.8,
    },
    {
      field: "total_extra_hours",
      headerName: "Extra Hours",
      flex: 0.8,
  
    },
    {
      field: "base_salary",
      headerName: "Base Salary",
      flex: 0.8,
      renderCell: (params) => (
        <Typography>
          ${params.row.base_salary}
        </Typography>
      ),
    },
    {
      field: "bonus",
      headerName: "Raise",
      flex: 0.5,
    },
    {
      field: "medical_absence_deduction",
      headerName: "Medicale Absence Handle",
      flex: 1.2,
      renderCell: (params) => (
        <Typography>
          ${params.row.medical_absence_deduction}
        </Typography>
      ),
    },
    {
      field: "total_deduction",
      headerName: "Deduction",
      flex: 0.8,
      renderCell: (params) => (
        <Typography >
          ${params.row.total_deduction}
        </Typography>
      ),
    },
    
    {
      field: "extra_hours_bonus",
      headerName: "Extra Hours Bonus",
      flex: 1,
      renderCell: (params) => (
        <Typography >
          ${params.row.extra_hours_bonus}
        </Typography>
      ),
    },
    {
      field: "deduction_absence",
      headerName: "Absence Deduction",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          ${params.row.deduction_absence}
        </Typography>
      ),
    },
    {
      field: "deduction_lateness",
      headerName: "Lateness Deduction",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          ${params.row.deduction_lateness}
        </Typography>
      ),
    },
    {
      field: "total_salary",
      headerName: "Total Salary",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          ${params.row.total_salary}
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="TEAM PAYLIP"
        subtitle="paylip list"
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

export default Teampaylip;
