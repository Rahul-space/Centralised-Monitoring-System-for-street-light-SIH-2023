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
import { useParams } from "react-router-dom";
const List = ({zone}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("http://localhost:8800/api/user/all");
        setData(res.data);
      }catch(err){
        console.log(err.message)
      }
    };
    getData(); 
    console.log(data)

  },[]);
  console.log("params",zone);
  const w = data.filter((d) => d.zone == zone.zone); 
  console.log("w",w);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">email</TableCell>
            <TableCell className="tableCell">phone</TableCell>
            <TableCell className="tableCell">role</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {w.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.username}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">{row.phone}</TableCell>
              <TableCell className="tableCell">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
