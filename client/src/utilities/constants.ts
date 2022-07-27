export class CONSTANTS {
  static BASEAPI = 'http://localhost:5000/api/v1';
}

export const DataTableConfig: any = {
  products: {
    title: 'Danh sách sản phẩm',
    value: 'products',
    titleCell: [
      { name: 'Mã số', props: 'code' },
      { name: 'Loại Hàng', props: 'type' },
      { name: 'Số lượng', props: 'amount' },
      { name: 'Thời gian nhập', props: 'createdAt' },
    ],
  },
  orders: {
    title: 'Đơn hàng đã xuất',
    value: 'orders',
    titleCell: [
      { name: 'Mã đơn hàng', props: 'orderCode' },
      { name: 'Tổng số sản phẩm', props: 'amount' },
      { name: 'Người xuất', props: 'author' },
      { name: 'Trạng thái', props: 'status' },
      { name: 'Thời gian xuất', props: 'createdAt' },
    ],
  },
  returnProducts: {
    title: 'Sản phẩm đã trả lại',
    value: 'return',
    titleCell: [
      { name: 'Mã số', props: 'code' },
      { name: 'Loại Hàng', props: 'type' },
      { name: 'Số lượng', props: 'amount' },
      { name: 'Thời gian nhập', props: 'createdAt' },
    ],
  },
};
