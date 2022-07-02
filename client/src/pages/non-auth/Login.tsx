import React, { useEffect, useState } from 'react';
import { AuthMode } from 'utilities/enum-utils';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { IAuth } from 'interfaces/auth-interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, registerAction } from '../../stores/actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../stores/reducers';
import Form from './form/Form';

const LoginPage = () => {
  const [authMode, setAuthMode] = useState(AuthMode.LOGIN);
  const dispatch = useDispatch();
  const methods = useForm<IAuth>({
    reValidateMode: 'onChange',
  });

  let isLoginMode = authMode === AuthMode.LOGIN;

  const onSwitchMode = (mode: AuthMode) => {
    methods.clearErrors();
    methods.reset();
    setAuthMode(mode);
  };

  const onSubmit: SubmitHandler<any> = () => {
    const data: IAuth = {
      email: methods.watch('email'),
      password: methods.watch('password'),
      username: methods.watch('username'),
      confirmpassword: methods.watch('confirmpassword'),
    };
    if (isLoginMode) {
      dispatch(loginAction(data));
      methods.clearErrors();
      methods.reset();
    } else {
      dispatch(registerAction(data));
      methods.clearErrors();
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSwitchMode={(mode: AuthMode) => onSwitchMode(mode)} isLoginMode={isLoginMode} onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default LoginPage;
