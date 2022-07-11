import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { PrimaryButton, SecondaryButton } from '../../../common-components/action-buttons/Buttons';

interface IDeleteModal {
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
}

const DeleteModal = (props: IDeleteModal) => {
  return (
    <Dialog open={props.isOpen} maxWidth={'sm'} onClose={props.onClose} fullWidth>
      <DialogTitle>Bạn có muốn xóa sản phẩm này không?</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: 'text.primary',
          }}
        >
          Sản phẩm này sẽ được xóa khỏi danh sách sản phẩm của bạn.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <>
          <SecondaryButton color="error" onClick={props.onClose}>
            Hủy bỏ
          </SecondaryButton>
          <PrimaryButton onClick={props.onSave}>Xác nhận</PrimaryButton>
        </>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
