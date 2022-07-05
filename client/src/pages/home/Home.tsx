import React, { useState } from 'react';
import {
  Button,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import MoreButton from '../../common-components/action-buttons/MoreButton';
import { ActionButtons, ViewMode } from '../../utilities/enum-utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { green, red } from '@mui/material/colors';
import { StyledTableCell, StyledTableRow } from '../../themes/customStyled/tableComponents';
import AddEditModal from './modals/AddEditModal';
import { PrimaryButton } from '../../common-components/action-buttons/Buttons';
import { SubmitHandler } from 'react-hook-form';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mode, setMode] = useState(null);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setMode(null);
  };
  const handleOpenModal = (mode: any) => {
    setIsOpenModal(true);
    setMode(mode);
  };

  const onSave: SubmitHandler<any> = (data) => {
    console.log('@@SaveData', data);
  };
  const onReturn: SubmitHandler<any> = (data) => {
    console.log('@@ReturnData', data);
  };

  const renderActionsButton = () => {
    return [
      <MenuItem key={ActionButtons.EDIT}>
        <EditIcon
          sx={{
            fontSize: '16px',
            color: green[500],
          }}
        />
        <Typography
          color={'primary'}
          sx={{
            fontSize: '16px',
            marginLeft: '4px',
          }}
        >
          {ActionButtons.EDIT && 'Edit'}
        </Typography>
      </MenuItem>,
      <MenuItem key={ActionButtons.DELETE}>
        <DeleteIcon
          sx={{
            fontSize: '16px',
            color: red[500],
          }}
        />
        <Typography
          color={'primary'}
          sx={{
            fontSize: '16px',
            marginLeft: '4px',
          }}
        >
          {ActionButtons.DELETE && 'Delete'}
        </Typography>
      </MenuItem>,
    ];
  };
  return (
    <>
      {isOpenModal && (
        <AddEditModal
          isOpen={isOpenModal}
          mode={mode}
          handleClose={handleCloseModal}
          onSave={onSave}
          onReturn={onReturn}
        />
      )}
      <Stack
        direction="row"
        justifyContent={'end'}
        alignItems="center"
        sx={{
          marginBottom: '10px',
        }}
      >
        <PrimaryButton onClick={() => handleOpenModal(ViewMode.ADD)}>
          <AddIcon />
          Nhập hàng
        </PrimaryButton>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: '#87805E',
            }}
          >
            <StyledTableRow>
              {/* lấy api trả về */}
              <StyledTableCell>STT</StyledTableCell>
              <StyledTableCell align="right">Mã số</StyledTableCell>
              <StyledTableCell align="right">Loại hàng</StyledTableCell>
              <StyledTableCell align="right">Số lượng</StyledTableCell>
              <StyledTableCell align="right">Thời gian nhập</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {/* lấy api trả về */}
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <MoreButton menuItems={renderActionsButton()} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HomePage;
