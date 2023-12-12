import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useState } from "react";

const Invoices = () => {

  const [Invoice, setInvoice] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { 
      field: "id",
      headerName: "ID",
      flex:1, 
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "name-column--cell", 
    },
    {
      field: "agentFullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "agentNumber",
      headerName: "Phone Number",
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.3,
    },
    {
      field: "totalCost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.totalCost}
        </Typography>
      ),
    },
    {
      field: "arrivalDate",
      headerName: "Shipping Arrival Date",
      flex: 1,
    },
    {
      field: "payingInvoiceDate",
      headerName: "Paying Invoice Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
         <DataGrid checkboxSelection rows={rows} columns={columns}  />
      </Box>
    </Box>
  );
};

export default Invoices;
