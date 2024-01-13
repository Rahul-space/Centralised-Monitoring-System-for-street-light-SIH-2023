import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios"
import { useEffect, useState } from "react";
const Listlight = ({zone}) => {
  console.log("params",zone);
  const w = zone.lights
  for(let i=0;i<w.length;i++){
    w[i]={...w[i],lightno:i+1};
  }
  const precautions={
    "working":"-","bulb dead":"take a new bulb","flickering":"loose contact","line breakage":"check the power line cautiously"
  }
  console.log("w",w);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> light no</TableCell>
            <TableCell className="tableCell">status</TableCell>
            <TableCell className="tableCell">fault details</TableCell>
            <TableCell className="tableCell">precautions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {w.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.lightno}</TableCell>
              <TableCell className="tableCell">{row.light_status}</TableCell>
              <TableCell className="tableCell">{row.light_status=="working"?"working perfectly":row.fault}</TableCell>
              <TableCell className="tableCell">{row.light_status=="working"?"-":"take precautions for "+row.fault}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Listlight;
