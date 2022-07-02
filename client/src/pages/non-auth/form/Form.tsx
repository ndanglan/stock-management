import React from 'react';
import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { IAuth } from '../../../interfaces/auth-interfaces';
import { AuthMode } from '../../../utilities/enum-utils';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import Validate from '../validate/validate';

interface IForm {
  onSwitchMode: (mode: AuthMode) => void;
  isLoginMode: boolean;
  onSubmit: SubmitHandler<any>;
}

const Form = (props: IForm) => {
  const { onSwitchMode, isLoginMode, onSubmit } = props;
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const linkBtn = isLoginMode ? (
    <>
      <Typography component={'span'}>You don't have account yet?</Typography>
      <Button
        sx={{
          display: 'inline',
        }}
        variant="text"
        onClick={() => onSwitchMode(AuthMode.SIGNUP)}
      >
        {'Sign up now.'}
      </Button>
    </>
  ) : (
    <>
      <Typography component={'span'}>{"You've already have an account."}</Typography>
      <Button
        sx={{
          display: 'inline',
        }}
        variant="text"
        onClick={() => onSwitchMode(AuthMode.LOGIN)}
      >
        {'Login now.'}
      </Button>
    </>
  );

  return (
    <Paper
      elevation={10}
      style={{
        padding: 20,
        height: '50%',
        width: 400,
        margin: '80px auto',
      }}
    >
      <Stack spacing={2} direction="column" component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          component={'div'}
          align="center"
          variant="h4"
          sx={{
            fontWeight: '700',
          }}
        >
          Login
        </Typography>
        <Grid justifyContent={'center'} textAlign="center" alignItems="center" item>
          <TextField
            error={errors.email ? true : false}
            helperText={<>{errors.email ? errors.email.message : null}</>}
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email', {
              validate: Validate.email,
            })}
          />
        </Grid>
        {!isLoginMode && (
          <Grid justifyContent={'center'} textAlign="center" alignItems="center" item>
            <TextField
              error={errors.username ? true : false}
              helperText={<>{errors.username ? errors.username.message : null}</>}
              label="Usename"
              variant="outlined"
              fullWidth
              {...register('username', {
                validate: Validate.username,
              })}
            />
          </Grid>
        )}
        <Grid justifyContent={'center'} textAlign="center" alignItems="center" item>
          <TextField
            type={'password'}
            error={errors.password ? true : false}
            helperText={<>{errors.password ? errors.password.message : null}</>}
            label="Password"
            variant="outlined"
            fullWidth
            {...register('password', {
              validate: Validate.password,
            })}
          />
        </Grid>
        {!isLoginMode && (
          <Grid justifyContent={'center'} textAlign="center" alignItems="center" item>
            <TextField
              type={'password'}
              error={errors.confirmpassword ? true : false}
              helperText={<>{errors.confirmpassword ? errors.confirmpassword.message : null}</>}
              label="Confirm Password"
              variant="outlined"
              fullWidth
              {...register('confirmpassword', {
                validate: {
                  ...Validate.confirmpassword,
                  checkConfirm: (e: string) => {
                    if (e !== watch('password')) {
                      return 'Password not match with the first one';
                    }

                    return true;
                  },
                },
              })}
            />
          </Grid>
        )}
        <Grid justifyContent={'center'} textAlign="center" alignItems="center" item>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {isLoginMode ? 'Login' : 'Signup'}
          </Button>
        </Grid>
        <Grid justifyContent={'center'} textAlign="center" alignItems="center" item>
          {linkBtn}
        </Grid>
      </Stack>
    </Paper>
  );
};

export default Form;
