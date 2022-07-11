import React, { useEffect, useState } from 'react';
import {
  Chip,
  MenuItem,
  Paper,
  Skeleton,
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
import { ActionButtons, ProductStatus, ViewMode } from '../../utilities/enum-utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { green, red } from '@mui/material/colors';
import { StyledTableCell, StyledTableRow } from '../../themes/customStyled/tableComponents';
import AddEditModal from './modals/AddEditModal';
import { PrimaryButton } from '../../common-components/action-buttons/Buttons';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductAction,
  createProductsAction,
  updateProductActions,
  deleteProductAction,
} from '../../stores/actions';
import { AppState } from '../../stores/reducers';
import { IProduct } from '../../interfaces/product-interface';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import BasicPagination from '../../common-components/pagination/BasicPagination';
import DeleteModal from './modals/DeleteModal';
import { useLocation } from 'react-router-dom';
import { mainRoutes } from '../../routes/constants';

const HomePage = () => {
  const dispatch = useDispatch();
  const configTable: any = useSelector((state: AppState) => state.configTable);
  const { enqueueSnackbar } = useSnackbar();
  const { pathname } = useLocation();
  console.log('configTable', configTable['products']);
  const [typeOfData, setTypeOfData] = useState<any>('products');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [mode, setMode] = useState(null);
  const [selectedId, setSelectedId] = useState<any>();
  const [activePage, setActivePage] = useState(1);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setMode(null);
  };
  const handleOpenModal = (mode: any, id?: number | string) => {
    setIsOpenModal(true);
    setMode(mode);
    setSelectedId(id);
  };

  const handleOpenDeleteModal = (id: number | string) => {
    setIsOpenDeleteModal(true);
    setSelectedId(id);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const onSave: SubmitHandler<any> = (data) => {
    if (mode === ViewMode.ADD) {
      dispatch(createProductsAction(data, enqueueSnackbar));
      handleCloseModal();
      return;
    }
    dispatch(updateProductActions({ ...data, id: selectedId }, enqueueSnackbar));
    handleCloseModal();
  };
  const onReturn: SubmitHandler<any> = (data) => {
    dispatch(createProductsAction({ ...data, status: ProductStatus.REJECT }, enqueueSnackbar));
    handleCloseModal();
  };

  const onConfirmDelete = () => {
    dispatch(deleteProductAction({ id: selectedId }, enqueueSnackbar));
    handleCloseDeleteModal();
  };

  const onChangePage = (page: number) => {
    setActivePage(page);
    dispatch(getProductAction({ page }));
  };

  const handleChangeTable = () => {
    switch (pathname) {
      case mainRoutes.Home:
      case mainRoutes.Products:
        dispatch(getProductAction());
        setTypeOfData('products');
        break;
      case mainRoutes.Orders:
        // fetchOrder
        setTypeOfData('orders');

        break;
      case mainRoutes.Return:
        // fetchReturn
        setTypeOfData('returnProducts');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleChangeTable();
  }, [pathname]);

  const renderActionsButton = (prodId?: number | string) => {
    return [
      <MenuItem key={ActionButtons.EDIT} onClick={() => handleOpenModal(ViewMode.EDIT, prodId)}>
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
            marginLeft: '6px',
          }}
        >
          {ActionButtons.EDIT && 'Edit'}
        </Typography>
      </MenuItem>,
      <MenuItem
        key={ActionButtons.DELETE}
        onClick={() => {
          if (prodId) {
            handleOpenDeleteModal(prodId);
          }
        }}
      >
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
            marginLeft: '6px',
          }}
        >
          {ActionButtons.DELETE && 'Delete'}
        </Typography>
      </MenuItem>,
    ];
  };
  return (
    <>
      {isOpenDeleteModal && (
        <DeleteModal isOpen={isOpenDeleteModal} onClose={handleCloseDeleteModal} onSave={onConfirmDelete} />
      )}
      {isOpenModal && (
        <AddEditModal
          isOpen={isOpenModal}
          mode={mode}
          handleClose={handleCloseModal}
          onSave={onSave}
          onReturn={onReturn}
          selectedId={selectedId}
        />
      )}
      {!Object.values(mainRoutes).includes(pathname) && <>Page Not Found</>}
      {Object.values(mainRoutes).includes(pathname) && (
        <>
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
          {configTable[typeOfData].isLoading && <Skeleton variant="rectangular" width={210} height={118} />}
          {configTable[typeOfData]?.list?.length > 0 && !configTable.products.isLoading && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: 'primary.main',
                  }}
                >
                  <StyledTableRow>
                    <StyledTableCell align="center" size="small">
                      STT
                    </StyledTableCell>
                    {configTable[typeOfData].config.titleCell.map((item: any, index: number) => (
                      <StyledTableCell align="right" key={index}>
                        {item.name}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="right" size="small"></StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {configTable[typeOfData].list.map((prod: IProduct & any, index: any) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" size="small" align="center">
                        {index + 1}
                      </TableCell>
                      {configTable[typeOfData].config.titleCell.map((item: any, index: any) => {
                        if (item.props === 'createdAt') {
                          return (
                            <TableCell align="right" key={index}>
                              {moment(prod[item.props]).format('LT, DD-MM-YYYY')}
                            </TableCell>
                          );
                        }
                        if (item.props === 'type') {
                          return (
                            <TableCell align="right" key={index}>
                              <Chip label={prod[item.props]} />
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell align="right" key={index}>
                            {prod[item.props]}
                          </TableCell>
                        );
                      })}
                      <TableCell align="right" size="small">
                        <MoreButton menuItems={renderActionsButton(prod.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {configTable[typeOfData].numberOfPage > 1 && (
            <Stack
              direction="row"
              justifyContent={'end'}
              alignItems="center"
              sx={{
                marginTop: '10px',
              }}
            >
              <BasicPagination
                numberOfPage={configTable[typeOfData].numberOfPage}
                onChange={(e, page) => onChangePage(page)}
                page={activePage}
              />
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
