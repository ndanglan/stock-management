import API from '../axios';

const createProducts = async (payload: any) => {
  const newPayoad = {
    code: payload.passCode,
    amount: Number(payload.amount),
    type: payload.type,
    createdAt: payload?.toDateString,
    status: payload?.status,
  };
  return await API.post(`/products/create`, newPayoad)
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
const getProducts = async (payload: any) => {
  return await API.post(`/products`, payload)
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

const getSingleProduct = async (payload: any) => {
  return await API.get(`/products/${payload}`)
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

const deleteProduct = async (payload: any) => {
  return await API.delete(`/products`, {
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

const updateProduct = async (payload: any) => {
  const newPayload = {
    amount: payload.amount,
    id: payload.id,
    code: payload.passCode,
    type: payload.type,
    createdAt: payload.toDateString,
  };
  return await API.put(`/products`, newPayload)
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

const getCategories = async () => {
  return await API.get('/products/categories')
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

export { getProducts, createProducts, getSingleProduct, deleteProduct, updateProduct, getCategories };
