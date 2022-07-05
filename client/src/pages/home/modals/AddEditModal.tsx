import React, { useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { ViewMode } from '../../../utilities/enum-utils';
import { PrimaryButton, SecondaryButton } from '../../../common-components/action-buttons/Buttons';
import { SubmitHandler, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';

interface IAddEditModal {
  isOpen: boolean;
  mode?: ViewMode | null;
  handleClose: () => void;
  onSave: SubmitHandler<any>;
  onReturn?: SubmitHandler<any>;
}

const AddEditModal = (props: IAddEditModal) => {
  const { isOpen, mode = ViewMode.ADD, handleClose, onSave, onReturn } = props;
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
  });
  const renderTilteAndSub = useCallback(() => {
    return mode === ViewMode.ADD
      ? { title: 'Thêm mặt hàng', subtitle: 'Kiểm hàng trước khi thêm, có thể trả hàng' }
      : { title: 'Sửa thông tin mặt hàng', subtitle: 'Sửa thông tin mặt hàng đã nhập vào kho' };
  }, [mode]);
  const renderButtonActions = () => {
    const disable = !isValid;
    switch (mode) {
      case ViewMode.ADD:
        return (
          <>
            <SecondaryButton color="error" onClick={handleClose}>
              Hủy bỏ
            </SecondaryButton>
            <SecondaryButton
              disable={disable}
              onClick={() => {
                if (onReturn) {
                  return handleSubmit(onReturn);
                }
              }}
            >
              Trả hàng
            </SecondaryButton>
            <PrimaryButton disable={disable} onClick={handleSubmit(onSave)}>
              Nhập hàng
            </PrimaryButton>
          </>
        );
      case ViewMode.EDIT:
        return (
          <>
            <SecondaryButton color="error" onClick={handleClose}>
              Hủy bỏ
            </SecondaryButton>
            <PrimaryButton disable={disable} onClick={handleSubmit(onSave)}>
              Cập nhật
            </PrimaryButton>
          </>
        );
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (mode === ViewMode.EDIT) {
    }
  }, []);

  return (
    <Dialog open={isOpen} maxWidth={'sm'} onClose={handleClose} fullWidth>
      <DialogTitle>
        {renderTilteAndSub().title}{' '}
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
        <DialogContentText>{renderTilteAndSub().subtitle}</DialogContentText>
        <div>
          <TextField
            margin="dense"
            label="Mã số"
            type="text"
            fullWidth
            error={errors.passCode ? true : false}
            helperText={<>{errors.passCode ? 'Trường này đang trống' : null}</>}
            variant="standard"
            {...register('passCode', {
              required: true,
            })}
          />
        </div>
        <div>
          <TextField
            margin="dense"
            label="Loại hàng"
            type="text"
            fullWidth
            error={errors.type ? true : false}
            helperText={<>{errors.type ? 'Trường này đang trống' : null}</>}
            variant="standard"
            {...register('type', {
              required: true,
            })}
          />
        </div>
        <div>
          <TextField
            margin="dense"
            label="Số lượng"
            type="text"
            fullWidth
            error={errors.amount ? true : false}
            helperText={<>{errors.amount ? 'Trường này đang trống' : null}</>}
            variant="standard"
            {...register('amount', {
              required: true,
            })}
          />
        </div>
        <div>
          <TextField
            margin="dense"
            label="Ngày tháng nhập"
            type="email"
            fullWidth
            error={errors.importDate ? true : false}
            helperText={<>{errors.importDate ? 'Trường này đang trống' : null}</>}
            variant="standard"
            {...register('importDate', {
              required: true,
            })}
          />
        </div>
      </DialogContent>
      <DialogActions>{renderButtonActions()}</DialogActions>
    </Dialog>
  );
};

export default AddEditModal;
