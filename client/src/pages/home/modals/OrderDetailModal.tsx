import React from 'react';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../stores/reducers';
import moment from 'moment';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const OrderDetailModal = (props: Props) => {
  const { isOpen, handleClose } = props;
  const { selectedSingle, isActionLoading } = useSelector((state: AppState) => state.configTable.orders);

  return (
    <Dialog open={isOpen} maxWidth={'sm'} onClose={handleClose} fullWidth>
      <DialogTitle>Chi tiết đơn hàng</DialogTitle>
      {isActionLoading && (
        <Stack alignItems={'center'} spacing={2}>
          <Skeleton animation="wave" variant="rectangular" width={400} height={30} />
          <Skeleton animation="wave" variant="rectangular" width={400} height={30} />
        </Stack>
      )}
      {!isActionLoading && selectedSingle && (
        <DialogContent>
          <div
            style={{
              paddingTop: '20px',
              marginBottom: '10px',
            }}
          >
            <TextField aria-readonly fullWidth label="Mã sản phẩm" value={selectedSingle?.orderCode} />
          </div>
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            <TextField
              aria-readonly
              fullWidth
              label="Tổng số lượng sản phẩm trong đơn hàng"
              value={selectedSingle?.amount}
            />
          </div>
          <div
            style={{
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                id="demo-multiple-chip-label"
                sx={{
                  marginBottom: '5px',
                }}
              >
                Sản phẩm
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedSingle?.products}
                renderValue={(selected: any) => {
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value: any, index: any) => (
                        <Chip key={index} label={value.code} />
                      ))}
                    </Box>
                  );
                }}
                readOnly
              />
            </FormControl>
          </div>
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            <TextField aria-readonly fullWidth label="Người nhập" value={selectedSingle?.author?.username} />
          </div>
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            <TextField
              aria-readonly
              fullWidth
              label="Ngày nhập"
              value={moment(selectedSingle?.createdAt).format('DD-MMM-YYYY')}
            />
          </div>
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            <TextField aria-readonly fullWidth label="Trạng thái" value={selectedSingle?.status} />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default OrderDetailModal;
