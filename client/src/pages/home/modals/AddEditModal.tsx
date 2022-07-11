import React, { useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import { ViewMode } from '../../../utilities/enum-utils';
import { PrimaryButton, SecondaryButton } from '../../../common-components/action-buttons/Buttons';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import DatePickerInput from '../../../common-components/date-picker/DatePickerInput';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProductAction } from '../../../stores/actions';
import { AppState } from '../../../stores/reducers';
import moment from 'moment';

interface IAddEditModal {
  isOpen: boolean;
  mode?: ViewMode | null;
  handleClose: () => void;
  onSave: SubmitHandler<any>;
  onReturn?: SubmitHandler<any>;
  selectedId?: number | string;
}

const AddEditModal = (props: IAddEditModal) => {
  const { isOpen, mode = ViewMode.ADD, handleClose, onSave, onReturn } = props;
  const dispatch = useDispatch();
  const { selectedSingle, isActionLoading } = useSelector((state: AppState) => state.configTable.products);
  const methods = useForm({
    defaultValues: {
      toDateString: new Date(),
      passCode: '',
      type: '',
      amount: null,
    },
  });

  const renderTilteAndSub = useCallback(() => {
    return mode === ViewMode.ADD
      ? { title: 'Thêm mặt hàng', subtitle: 'Kiểm hàng trước khi thêm, có thể trả hàng' }
      : { title: 'Sửa thông tin mặt hàng', subtitle: 'Sửa thông tin mặt hàng đã nhập vào kho' };
  }, [mode]);

  const renderButtonActions = () => {
    switch (mode) {
      case ViewMode.ADD:
        return (
          <>
            <SecondaryButton color="error" onClick={handleClose}>
              Hủy bỏ
            </SecondaryButton>
            <SecondaryButton
              onClick={() => {
                if (onReturn) {
                  console.log('Return');
                  methods.handleSubmit(onReturn)();
                }
              }}
            >
              Trả hàng
            </SecondaryButton>
            <PrimaryButton onClick={methods.handleSubmit(onSave)}>Nhập hàng</PrimaryButton>
          </>
        );
      case ViewMode.EDIT:
        return (
          <>
            <SecondaryButton color="error" onClick={handleClose}>
              Hủy bỏ
            </SecondaryButton>
            <PrimaryButton onClick={methods.handleSubmit(onSave)}>Cập nhật</PrimaryButton>
          </>
        );
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (mode === ViewMode.EDIT && props.selectedId) {
      dispatch(getSingleProductAction(props.selectedId));
    }
  }, []);

  useEffect(() => {
    if (selectedSingle && mode === ViewMode.EDIT) {
      methods.setValue('passCode', selectedSingle.code);
      methods.setValue('amount', selectedSingle.amount as any);
      methods.setValue('type', selectedSingle.type);
      methods.setValue('toDateString', moment(selectedSingle.createdAt).toDate());
    }
  }, [selectedSingle]);

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
      {isActionLoading ? (
        <Stack alignItems={'center'} spacing={2}>
          <Skeleton animation="wave" variant="rectangular" width={400} height={30} />
          <Skeleton animation="wave" variant="rectangular" width={400} height={30} />
        </Stack>
      ) : (
        <>
          <DialogContent>
            <DialogContentText
              sx={{
                color: 'text.primary',
              }}
            >
              {renderTilteAndSub().subtitle}
            </DialogContentText>
            <FormProvider {...methods}>
              <div>
                <TextField
                  sx={{
                    color: 'black',
                  }}
                  margin="dense"
                  label="Mã số"
                  type="text"
                  fullWidth
                  error={methods.formState.errors.passCode ? true : false}
                  helperText={<>{methods.formState.errors.passCode ? 'Trường này đang trống' : null}</>}
                  variant="standard"
                  {...methods.register('passCode', {
                    required: true,
                  })}
                />
              </div>
              <div>
                <TextField
                  sx={{
                    color: 'black',
                  }}
                  margin="dense"
                  label="Loại hàng"
                  type="text"
                  fullWidth
                  error={methods.formState.errors.type ? true : false}
                  helperText={<>{methods.formState.errors.type ? 'Trường này đang trống' : null}</>}
                  variant="standard"
                  {...methods.register('type', {
                    required: true,
                  })}
                />
              </div>
              <div>
                <TextField
                  sx={{
                    color: 'black',
                  }}
                  margin="dense"
                  label="Số lượng"
                  type="number"
                  fullWidth
                  inputProps={{
                    inputMode: 'numeric',
                  }}
                  error={methods.formState.errors.amount ? true : false}
                  helperText={<>{methods.formState.errors.amount ? 'Trường này đang trống' : null}</>}
                  variant="standard"
                  {...methods.register('amount', {
                    required: true,
                  })}
                />
              </div>
              <div>
                <DatePickerInput />
              </div>
            </FormProvider>
          </DialogContent>
        </>
      )}
      <DialogActions>{renderButtonActions()}</DialogActions>
    </Dialog>
  );
};

export default AddEditModal;
