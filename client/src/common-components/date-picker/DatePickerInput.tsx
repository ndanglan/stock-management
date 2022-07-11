import { Popover, TextField } from '@mui/material';
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {}

const DatePickerInput = (props: Props) => {
  const { control, watch } = useFormContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <TextField
        onClick={handleClick}
        sx={{
          color: 'black',
        }}
        margin="dense"
        label="Ngày tháng nhập hàng"
        fullWidth
        variant="standard"
        value={moment(watch('toDateString') as any).format('DD-MM-YYYY')}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Controller
          control={control}
          name="toDateString"
          render={({ field: { onChange } }) => (
            <DatePicker
              selected={moment(watch('toDateString') as any).toDate()}
              onChange={(e) => {
                onChange(e);
                handleClose();
              }}
              inline
            />
          )}
        />
      </Popover>
    </>
  );
};

export default DatePickerInput;
