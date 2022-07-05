export const serialize = (data: any) => {
  const json = JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() + 'n' : value));
  return json;
};
