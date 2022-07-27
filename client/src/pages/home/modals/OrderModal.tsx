import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PrimaryButton, SecondaryButton } from '../../../common-components/action-buttons/Buttons';
import { useSelector } from 'react-redux';
import { AppState } from '../../../stores/reducers';

interface IOrderModal {
  isOpen: boolean;
  handleClose: () => void;
  onSave: (amount: number, id: number | string, orderCode: string) => void;
  selectedId?: number | string;
}

const OrderModal = (props: IOrderModal) => {
  const { handleClose, isOpen, onSave, selectedId } = props;
  const products = useSelector((state: AppState) => state.configTable.products.list);
  const selectedProduct = products.find((item) => item.id === selectedId);
  const [amount, setAmount] = useState(1);
  const [orderCode, setOrderCode] = useState('');
  return (
    <Dialog open={isOpen} maxWidth={'sm'} onClose={handleClose} fullWidth>
      <DialogTitle>
        Bạn muốn xuất sản phẩm này khỏi kho ?
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'black',
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>

      <DialogContent>
        {selectedProduct ? (
          <DialogContentText
            sx={{
              color: 'text.primary',
            }}
          >
            Sản phẩm <b>{selectedProduct?.code}</b> còn lại <b>{selectedProduct?.amount}</b> sản phẩm. Nhập số lượng sản
            phẩm bạn muốn xuất
          </DialogContentText>
        ) : (
          <>Không có sản phẩm nào được tìm thấy</>
        )}
        <div>
          <TextField
            sx={{
              color: 'black',
            }}
            margin="dense"
            label="Mã đơn hàng"
            type="text"
            fullWidth
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            sx={{
              color: 'black',
            }}
            margin="dense"
            label="Số lượng sản phẩm"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            helperText={`Vui lòng không nhập quá ${selectedProduct?.amount} sản phẩm`}
            variant="standard"
          />
        </div>
      </DialogContent>

      <DialogActions>
        <SecondaryButton color="error" onClick={handleClose}>
          Hủy bỏ
        </SecondaryButton>

        <PrimaryButton
          disable={orderCode === ''}
          onClick={() => {
            if (selectedId) {
              onSave(amount, selectedId, orderCode);
            }
          }}
        >
          Xuất sản phẩm
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
