import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FaSearch } from "react-icons/fa";
import Sidebar from './SideBar';
import {useState ,useEffect} from 'react'
import axios from '../../../Utils/axios';
import { responsiveFontSizes } from '@mui/material';
import { getUsers } from '../../../Utils/urls';
import { FaUnlock, FaLock } from "react-icons/fa";
import './UserList.css'

export default function UserList() {

const columns = [
  { id: 'id', label: 'ID', minWidth: 3 },
  { id: 'email', label: 'Email', minWidth: 2},
  { id: 'first_name', label: 'First Name', minWidth: 2},
  { id: 'phone', label: 'Mobile', minWidth: 5},
  { id: 'date_joined', label: 'Joined Date', minWidth:5},
  { id: 'is_active', label: 'Action', minWidth: 5, renderCell: (params) => {
    return (
      <div className={`pill ${params.row.is_active ? "active" : "inactive"}`}>
        {params.is_active ? "Active" : "Inactive"
        (console.log(params.row.is_active,"heyyyyy"))}
      </div>
    );
  }
},
{ id: "action", label: "Action", minWidth: 10, renderCell: (params) => {
    return (
      <button
        className={`custom-button ${params.is_active ? "-inactive" : "-active"}`}
        onClick={(e) => handleBlockClick(e, params.row.id, params.row.is_active)
          
        }
      >
        {params.row.is_active ? <FaLock size={18} /> : <FaUnlock size={18} />}
      </button>
    );
  }
}


];



  
const search = {
  marginTop : "20px",
  marginRight: "50px"
}
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredRows,setFilteredRows] =  useState([]);
  const [blocked, setBlocked] = useState(false);

  const [rows, setRows] = useState([]);

useEffect(() => {
  setRows(filteredRows);
}, [filteredRows]);


// const handleBlockClick = async (e,userId,isBlocked)=>{
//   e.stopPropagation();
//   try{
//     setBlocked(!blocked)
//     const response = await axios.patch()
//   }

// }



const fetchData = async()=>{
  try{
    const url = searchTerm ?  getUsers+`/?search=${searchTerm}`: getUsers
    console.log(url)
    const res = await axios.get(url)
    console.log(getUsers+url)
    setFilteredRows(res.data)
  }catch(error){
    console.log(error,"the error")
  }
}


useEffect(()=>{
   fetchData()
},[blocked,searchTerm])


  return (
    <>
    <Sidebar/>
        <div className="data-grid-container">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <br/>
          <div className="d-flex align-items-center" style={search}>
            <input
              type="text"
              placeholder="Search User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control "
              style={{ marginRight: '8px' }}
            />
            <button className="btn btn-primary" >
              <FaSearch className="search-icon" />
            </button>
          </div>
        </div>
        </div>
        <div className="table-container">
  {/* Your table component */}

    <TableContainer sx={{ maxHeight: 550, marginLeft: '50px' }}>
    <Paper sx={{ width: '100%' ,paddingLeft: 10 }}>
   
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </TableContainer>
    </div>
    </>
  );
}











// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useState } from 'react';
// import Sidebar from './SideBar';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function UserList() {
//   return (
//     <>
//    <Sidebar/>
  
//     <TableContainer component={Paper}  sx={{ maxHeight: 550, marginLeft: '50px' }}>
  
//       <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </>
//   );
// }






















// import React, { useEffect, useState } from 'react'
// import { adminApi } from '../../axiosApi/axiosInstance';
// import { toast } from 'react-toastify'

// const AdminUsers = () => {

//   const [users,setUsers] = useState([]);

//   const handleBlock = async(userId)=>{
//     let res = await adminApi.put(`/block-user/${userId}`)
//     if(res){
//       toast.success("Updated Successfully")
//     }else{
//       toast.error("Failed to Update")
//     }
//   }

//   useEffect(() => {
//     const fetchUserData = async()=>{
//       const res = await adminApi.get('/userdata');
//       setUsers(res.data.userData)
//     };
//     fetchUserData()
//   },[handleBlock])
   
//   return (
//     <section className='container'>      
//       <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left text-gray-500">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-300">
//                   <tr>
//                       <th scope="col" className="px-6 py-3">
//                           Sl.No
//                       </th>
//                       <th scope="col" className="px-6 py-3">
//                           Name
//                       </th>
//                       <th scope="col" className="px-6 py-3">
//                           Email
//                       </th>
//                       <th scope="col" className="px-6 py-3">
//                           Blood Group
//                       </th>
//                       <th scope="col" className="px-6 py-3">
//                           Options
//                       </th>
//                   </tr>
//               </thead>
//               <tbody className='border-2'>
//                 {(users.length>0)?(
//                   users.map((user, index) => (
//                     <tr className="bg-white border-b  hover:bg-gray-200 " key={index}>
//                       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                         {index + 1}
//                       </th>
//                       <td className="px-6 py-4">
//                         {user.name}
//                       </td>
//                       <td className="px-6 py-4">
//                         {user.email}
//                       </td>
//                       <td className="px-6 py-4">
//                         {user.blood}
//                       </td>
//                       {
//                         (user.blocked)?(
//                           <td className="px-6 py-4">
//                             <button onClick={()=>{handleBlock(user._id)}} className="bg-yellow-100 hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
//                               Unblock
//                             </button>
//                           </td>
//                         ):(
//                           <td className="px-6 py-4">
//                             <button onClick={()=>{handleBlock(user._id)}} className="bg-red-100 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
//                               Block
//                             </button>
//                           </td>
//                         )
//                       }
                      
//                     </tr>
//                   ))
//                 ):(
//                   <tr className="bg-white border-b hover:bg-gray-200">
//                     <td colSpan={8} className="px-6 py-4 font-medium text-gray-900 text-center">
//                       No users Found
//                     </td>
//                   </tr>
//                 )
//               }
//               </tbody>
//           </table>
//       </div>
//     </section>
//   )
// }

// export default AdminUsers

















// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';




// const UserList = () => {
//   const rows = [
//     { name: 'Rihan', place: 'Some Place', email: 'rihan@example.com', role: 'User' },
//     // Add more rows as needed
//   ];




//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Place</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Role</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.place}</TableCell>
//               <TableCell>{row.email}</TableCell>
//               <TableCell>{row.role}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default UserList ;










// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   withStyles,
// } from '@mui/material';

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const UserList = () => {
//   const rows = [
//     { name: 'Rihan', place: 'Some Place', email: 'rihan@example.com', role: 'User' },
//     // Add more rows as needed
//   ];

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Name</StyledTableCell>
//             <StyledTableCell>Place</StyledTableCell>
//             <StyledTableCell>Email</StyledTableCell>
//             <StyledTableCell>Role</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.place}</TableCell>
//               <TableCell>{row.email}</TableCell>
//               <TableCell>{row.role}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default UserList;
