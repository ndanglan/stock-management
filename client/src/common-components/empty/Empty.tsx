import { Box, Typography } from '@mui/material';
import React from 'react';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
interface Props {}

const Empty = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <NotInterestedIcon
          sx={{
            fontSize: '80px',
            marginBottom: '10px',
          }}
        />
        <Typography>Không còn sản phẩm nào trong kho. Hãy nhập thêm sản phẩm</Typography>
      </div>
    </div>
  );
};

export default Empty;
