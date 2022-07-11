import { styled, TableCell, tableCellClasses, TableHead, TableRow, tableHeadClasses } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// export const StyledTableHeader = styled(TableHead)(({ theme }) => ({
//   [`&.${tableHeadClasses.root}`]: {
//     backgroundColor: `${theme.palette.primary}`,
//   },
// }));
