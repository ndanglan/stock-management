import React, { useState } from 'react';
import { AuthMode } from 'utilities/enum-utils';

interface Props {}

const LoginPage = (props: Props) => {
  const [authMode, setAuthMode] = useState(AuthMode.LOGIN);
  let isLoginMode = authMode === AuthMode.LOGIN;
  const onSwitchMode = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card w-50">
        <div className="card-header text-center ">
          <p className="h2">{isLoginMode ? 'Login' : 'Sign up'}</p>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            {!isLoginMode && (
              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">
                  User name
                </label>
                <input type="password" className="form-control" id="confirmpassword" />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" />
            </div>
            {!isLoginMode && (
              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">
                  Confirm password
                </label>
                <input type="password" className="form-control" id="confirmpassword" />
              </div>
            )}
            <div className="text-center">
              <div className="text-center">
                <button type="submit" className="btn btn-info text-white">
                  {isLoginMode ? 'Login' : 'Sign up'}
                </button>
              </div>
              <a
                href="_"
                className="mt-2 text-decoration-underline text-primary"
                onClick={() => onSwitchMode(isLoginMode ? AuthMode.SIGNUP : AuthMode.LOGIN)}
              >
                {isLoginMode
                  ? "You don't have an account yet? Sign up here."
                  : "You've already have an account? Login now."}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
