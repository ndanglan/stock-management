import React, { useEffect, useState } from 'react';
import { AuthMode } from 'utilities/enum-utils';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { IAuth } from 'interfaces/auth-interfaces';
import { useDispatch } from 'react-redux';
import { authAction } from '../../stores/actions';
import Form from './form/Form';
import PureLayout from '../../common-components/layout/PureLayout';
import { useSnackbar } from 'notistack';

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
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

    dispatch(authAction(data, enqueueSnackbar));
    methods.clearErrors();
    methods.reset();
  };

  return (
    <PureLayout>
      <FormProvider {...methods}>
        <Form onSwitchMode={(mode: AuthMode) => onSwitchMode(mode)} isLoginMode={isLoginMode} onSubmit={onSubmit} />
      </FormProvider>
    </PureLayout>
  );
};

export default LoginPage;
