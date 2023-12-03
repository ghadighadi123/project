// import React, { useEffect, useState } from 'react';
// import {dataRef} from './Firebase';
// import { Box } from '@mui/material';
// import Header from './components/Header';


// function Operations(){
//     const [name, setName] = useState('');
//     const handleAdd = () =>{
//         if(name !== ""){
//             dataRef.ref().child("hello").push(name);
//             setName("")
//         }
//     }
//     useEffect( () => {
//         dataRef.ref().child("hello").on('value', data =>{
//             const getData =  Object.values(data.val())
//         });
//     })

//     return (
        
//         <Box m="20px">
//         <Header title="INVOICES" subtitle="List of Invoice Balances" />
//         <Box
//           m="40px 0 0 0"
//           height="75vh"
//           sx={{
//             "& .MuiDataGrid-root": {
//               border: "none",
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: "none",
//             },
//             "& .name-column--cell": {
//               color:"black",
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor:"white",
//               borderBottom: "none",
//             },
//             "& .MuiDataGrid-virtualScroller": {
//               backgroundColor: "green",
//             },
//             "& .MuiDataGrid-footerContainer": {
//               borderTop: "none",
//               background:"green",
//             }
//           }}
//         >
//           <div>
//             <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
//             <button onClick={handleAdd}>Add</button>
//         </div>
//         </Box>
//       </Box>
//     );
// }
// export default Operations;