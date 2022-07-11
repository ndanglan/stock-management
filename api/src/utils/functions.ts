export const serialize = (data: any) => {
  const json = JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() + 'n' : value));
  return json;
};

export const formatPayload = (status: boolean, data?: any, message?: string) => {
  const payload: any = {
    status: status,
  };
  if (data) {
    payload.data = data;
  }
  if (message) {
    payload.message = message;
  }
  return JSON.parse(serialize(payload));
};
