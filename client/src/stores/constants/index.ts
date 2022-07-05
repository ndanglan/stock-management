enum EScreenResize {
  SCREEN_RESIZE = 'SCREEN_RESIZE',
}

enum EAuth {
  AUTH_REQUESTING = 'AUTH_REQUESTING',
  AUTH_DONE = 'AUTH_DONE',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  API_FAILED = 'API_FAILED',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}

const ActionTypes: {
  [key: string]: any;
} = {
  ...EScreenResize,
  ...EAuth,
};

export { ActionTypes };
