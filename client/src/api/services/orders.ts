import API from '../axios';

const createOrders = async (payload: any) => {
  return await API.post(`/orders`, payload)
    .then((response) => {
      console.log(response);
      return { data: response, status: response.status };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};
const getOrders = async (value: any) => {
  return await API.post(`/orders/get`, { page: value.page })
    .then((response) => {
      return { data: response, status: response.status };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

const getSingleOrder = async (value: any) => {
  return await API.get(`/orders/${value.id}`)
    .then((response) => {
      return { data: response, status: response.status };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

const deleteOrder = async (payload: any) => {
  return await API.delete(`/orders`, {
    data: {
      id: payload.id,
    },
  })
    .then((response) => {
      return { data: response, status: response.status };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export { createOrders, getOrders, deleteOrder, getSingleOrder };
