import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { db } from "../../config";
import { off } from 'firebase/database';
import { ref, onValue, remove } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { useCallback } from "react";


const Invoices = () => {

  const [Invoice, setInvoice] = useState([]);
 
  useEffect(() => {
    const InvoiceRef = ref(db, 'data/transaction/');

    onValue(InvoiceRef, (snapshot) => {
      const InvoiceData = snapshot.val();
      if (InvoiceData) {
        const InvoiceArray = Object.entries(InvoiceData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setInvoice(InvoiceArray);
      }
    });

    
    return () => {
      off(InvoiceRef);
    };
  }, []); 

 const rows = Invoice
    ? Object.keys(Invoice).map((id) => ({ id, ...Invoice[id] }))
    : []; 

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

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    // Use the functional form of setState to ensure the latest state
    setSelectedRows((prevSelectedRows) => [...prevSelectedRows, ...selectionModel]);
  };



  const deleteData = useCallback(() => {
    // Check if there are selected rows
    if (selectedRows.length > 0) {
      const transactionRefs = selectedRows.map((rowId) => ref(db, `data/transaction/${rowId}`));
  
      // Use Promise.all to wait for all remove operations to complete
      Promise.all(transactionRefs.map((transactionRef) => remove(transactionRef)))
        .then(() => {
          console.log('Selected transactions deleted successfully');
          // Clear the selected rows after deletio
          // Optionally, you can update your local state or perform other actions after deletion
        })
        .catch((error) => {
          console.error('Error deleting transactions:', error.message);
          // Handle errors or provide user feedback as needed
        });
    } else {
      console.warn('No rows selected for deletion');
      // Provide user feedback if there are no selected rows
    }
  }, [selectedRows]);

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
        <DataGrid checkboxSelection rows={rows} columns={columns} onRowSelectionModelChange={handleSelectionModelChange} />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
              <Button onClick={deleteData} color="secondary" variant="contained">
                Click to Delete Selected Data
              </Button>
            </Box>
    </Box>
  );
};

export default Invoices;
