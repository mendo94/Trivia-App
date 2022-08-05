import * as React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function RankingTable({ rankingsData }) {
  const googleToken = localStorage.getItem("username");

  return (
    <TableContainer
      style={{ maxWidth: "100rem", marginLeft: "15rem" }}
      component={Paper}
    >
      <Table
        sx={{ minWidth: 150, maxWidth: "100rem" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ fontSize: "2rem" }}>
              Nobleman
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: "2rem" }}>
              Difficulty
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: "2rem" }}>
              Score
            </StyledTableCell>
          </TableRow>
        </TableHead>
        {rankingsData.map((player) => {
          return (
            <TableBody>
              <StyledTableRow
                component="th"
                scope="row"
                key={player.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {googleToken}
                </StyledTableCell>
                <StyledTableCell>{player.difficulty}</StyledTableCell>
                <StyledTableCell>{player.result}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          );
        })}
      </Table>
    </TableContainer>
  );
}
