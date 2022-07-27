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
import { green, red, amber, blue } from '@mui/material/colors';
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
  getOrdersAction,
} from '../../stores/actions';
import { AppState } from '../../stores/reducers';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import BasicPagination from '../../common-components/pagination/BasicPagination';
import DeleteModal from './modals/DeleteModal';
import { useLocation } from 'react-router-dom';
import { mainRoutes } from '../../routes/constants';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import OrderModal from './modals/OrderModal';
import { createOrder, getSingleOrder } from '../../stores/actions/orderActions';
import Empty from '../../common-components/empty/Empty';
import { getCategories } from '../../stores/actions/productActions';
import InfoIcon from '@mui/icons-material/Info';
import OrderDetailModal from './modals/OrderDetailModal';

const HomePage = () => {
  const dispatch = useDispatch();
  const configTable: any = useSelector((state: AppState) => state.configTable);
  const categories: any = useSelector((state: AppState) => state.configTable.categories);
  const { enqueueSnackbar } = useSnackbar();
  const { pathname } = useLocation();
  const [typeOfData, setTypeOfData] = useState<any>('products');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [mode, setMode] = useState(null);
  const [selectedId, setSelectedId] = useState<any>();
  const [activePage, setActivePage] = useState(1);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openOrderDetail, setOpenModalDetail] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setMode(null);
  };
  const handleOpenModal = (mode: any, id?: number | string) => {
    setIsOpenModal(true);
    setMode(mode);
    setSelectedId(id || null);
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
    if (typeOfData === 'products') {
      dispatch(getProductAction({ page }));
    }
    if (typeOfData === 'orders') {
      dispatch(getOrdersAction({ page }));
    }
    if (typeOfData === 'returnProducts') {
      dispatch(getProductAction({ page, status: 'REJECT' }));
    }
  };

  const onOpenOrderModal = (id: number | string) => {
    setOpenOrderModal(true);
    setSelectedId(id);
  };
  const onCloseOrderModal = () => {
    setOpenOrderModal(false);
    setSelectedId(null);
  };

  const handleChangeTable = () => {
    switch (pathname) {
      case mainRoutes.Home:
      case mainRoutes.Products:
        dispatch(getProductAction());
        setTypeOfData('products');
        break;
      case mainRoutes.Orders:
        dispatch(getOrdersAction({ page: 1 }));
        setTypeOfData('orders');

        break;
      case mainRoutes.Return:
        dispatch(getProductAction({ page: 1, status: 'REJECT' }));
        setTypeOfData('returnProducts');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getCategories());
    handleChangeTable();
  }, [pathname]);

  const renderActionsButton = (prodId?: number | string) => {
    return typeOfData === 'products'
      ? [
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
              {ActionButtons.EDIT && 'Sửa thông tin'}
            </Typography>
          </MenuItem>,
          <MenuItem
            key={ActionButtons.ORDER}
            onClick={() => {
              if (prodId) {
                onOpenOrderModal(prodId);
              }
            }}
          >
            <AddShoppingCartIcon
              sx={{
                fontSize: '16px',
                color: amber,
              }}
            />
            <Typography
              color={'primary'}
              sx={{
                fontSize: '16px',
                marginLeft: '6px',
              }}
            >
              {ActionButtons.ORDER && 'Xuất hàng'}
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
              {ActionButtons.DELETE && 'Xóa sản phẩm'}
            </Typography>
          </MenuItem>,
        ]
      : [
          <MenuItem
            key={ActionButtons.DETAIL}
            onClick={() => {
              if (prodId) {
                setOpenModalDetail(true);
                dispatch(getSingleOrder({ id: prodId }));
              }
            }}
          >
            <InfoIcon
              sx={{
                fontSize: '16px',
                color: blue[500],
              }}
            />
            <Typography
              color={'primary'}
              sx={{
                fontSize: '16px',
                marginLeft: '6px',
              }}
            >
              {ActionButtons.DETAIL && 'Xem chi tiết đơn hàng'}
            </Typography>
          </MenuItem>,
        ];
  };
  return (
    <>
      {openOrderDetail && <OrderDetailModal isOpen={openOrderDetail} handleClose={() => setOpenModalDetail(false)} />}
      {openOrderModal && (
        <OrderModal
          isOpen={openOrderModal}
          handleClose={onCloseOrderModal}
          selectedId={selectedId}
          onSave={(amount: number, id: number | string, orderCode: string) => {
            dispatch(
              createOrder({
                amount,
                products: [
                  {
                    id: id,
                    amount: amount,
                  },
                ],
                orderCode,
              }),
            );
            onCloseOrderModal();
          }}
        />
      )}
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
          {typeOfData === 'products' && (
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
          )}

          {configTable[typeOfData]?.isLoading && <Skeleton variant="rectangular" width={210} height={118} />}
          {configTable[typeOfData]?.list?.length > 0 && !configTable?.products?.isLoading ? (
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
                  {configTable[typeOfData].list.map((prod: any, index: any) => (
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
                            <TableCell
                              align="center"
                              key={index}
                              style={{
                                overflowX: 'hidden',
                              }}
                            >
                              <Stack direction={'row'} alignItems="center" justifyContent={'end'}>
                                {prod[item.props]?.length > 1 && (
                                  <Chip label={`${prod[item.props]?.length} thể loại`} />
                                )}
                                {prod[item.props]?.length === 1 &&
                                  prod[item.props].map((t: any) => {
                                    const c: any = categories.find((i: any) => i.id === t);
                                    return <Chip label={c?.name} />;
                                  })}
                              </Stack>
                            </TableCell>
                          );
                        }

                        if (item.props === 'author') {
                          return (
                            <TableCell align="right" key={index}>
                              <Chip label={prod[item.props]?.username} />
                            </TableCell>
                          );
                        }

                        if (item.props === 'status') {
                          return (
                            <TableCell align="right" key={index}>
                              <Chip label={prod[item.props]} color="success" variant="filled" />
                            </TableCell>
                          );
                        }

                        if (item.props === 'amount') {
                          return (
                            <TableCell
                              align="right"
                              key={index}
                              style={{
                                paddingRight: '60px',
                              }}
                            >
                              {prod[item.props]}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell align="right" key={index}>
                            {prod[item.props]}
                          </TableCell>
                        );
                      })}
                      {typeOfData !== 'returnProducts' && (
                        <TableCell align="right" size="small">
                          <MoreButton menuItems={renderActionsButton(prod.id)} />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <Empty />
            </>
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
