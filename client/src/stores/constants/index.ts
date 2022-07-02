enum EScreenResize {
  SCREEN_RESIZE = 'SCREEN_RESIZE',
}

enum EAuth {
  LOGIN_ACTION = 'LOGIN_ACTION',
  API_REQUESTING = 'API_REQUESTING',
  API_FAILED = 'API_FAILED',
}

const ActionTypes = {
  ...EScreenResize,
  ...EAuth,
};

export { ActionTypes };
