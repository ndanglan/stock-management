import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface IPagination {
  numberOfPage: number;
  onChange: (e: any, page: number) => void;
  page: number;
}
function BasicPagination(props: IPagination) {
  return (
    <Stack spacing={2}>
      <Pagination count={props.numberOfPage} color="primary" onChange={props.onChange} page={props.page} />
    </Stack>
  );
}

export default React.memo(BasicPagination);
