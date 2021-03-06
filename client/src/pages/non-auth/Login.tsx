import React, { useState } from 'react';
import { AuthMode } from 'utilities/enum-utils';
import { useForm, SubmitHandler } from 'react-hook-form';
import Validate from './validate/validate';
import { IAuth } from 'interfaces/auth-interfaces';
import { login, signup } from '../../api/services/auth';

const LoginPage = () => {
  const [authMode, setAuthMode] = useState(AuthMode.LOGIN);
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm<IAuth>({
    reValidateMode: 'onChange',
  });
  let isLoginMode = authMode === AuthMode.LOGIN;

  const onSwitchMode = (mode: AuthMode) => {
    clearErrors();
    reset();
    setAuthMode(mode);
  };

  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    if (isLoginMode) {
      const response = await login(data);
      console.log('login', response);
    } else {
      const response = await signup(data);
      console.log('signup', response);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card w-50">
        <div className="card-header text-center ">
          <p className="h2">{isLoginMode ? 'Login' : 'Sign up'}</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className={`form-label ${errors.email && 'text-danger'}`}>
                Email
              </label>
              <input
                placeholder="Enter your email..."
                type="text"
                className={`form-control ${errors.email && 'border-danger'}`}
                id="email"
                {...register('email', {
                  validate: Validate.email,
                })}
              />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            {!isLoginMode && (
              <div className="mb-3">
                <label htmlFor="username" className={`form-label ${errors.username && 'text-danger'}`}>
                  User name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.username && 'border-danger'}`}
                  id="username"
                  placeholder="Enter your username..."
                  {...register('username', {
                    validate: Validate.username,
                  })}
                />
                {errors.username && <span className="text-danger">{errors.username.message}</span>}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="password" className={`form-label ${errors.password && 'text-danger'}`}>
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password && 'border-danger'}`}
                id="password"
                placeholder="Enter your password..."
                {...register('password', {
                  validate: Validate.password,
                })}
              />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </div>
            {!isLoginMode && (
              <div className="mb-3">
                <label htmlFor="confirmpassword" className={`form-label ${errors.confirmPassword && 'text-danger'}`}>
                  Confirm password
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword && 'border-danger'}`}
                  id="confirmpassword"
                  placeholder="Enter your confirmpassword..."
                  {...register('confirmPassword', {
                    validate: {
                      ...Validate.confirmPassword,
                      checkConfirm: (e) => {
                        if (e === watch('password')) {
                          return true;
                        }

                        return 'Password is not match';
                      },
                    },
                  })}
                />
                {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
              </div>
            )}
            <div className="text-center">
              <div className="text-center">
                <button type="submit" className="btn btn-info text-white" disabled={!errors}>
                  {isLoginMode ? 'Login' : 'Sign up'}
                </button>
              </div>
              <div className="mt-2 cursor-pointer">
                <a
                  href="#"
                  className=" text-decoration-underline link-primary"
                  onClick={() => onSwitchMode(isLoginMode ? AuthMode.SIGNUP : AuthMode.LOGIN)}
                >
                  {isLoginMode
                    ? "You don't have an account yet? Sign up here."
                    : "You've already have an account? Login now."}
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
