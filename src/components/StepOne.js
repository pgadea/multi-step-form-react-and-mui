import React, { useState } from 'react';
import useForm from './useForm';
import { makeStyles } from '@material-ui/core/styles';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import {
  Typography,
  Button,
  Grid,
  Checkbox,
  TextField,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import BlockSharpIcon from '@material-ui/icons/BlockSharp';

const useStyles = makeStyles({
  mainContainer: {
    display: 'grid',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 5,
  },
  formContainer: {
    position: 'relative',
    width: '28.125rem',
    height: 'auto',
    padding: '2rem',
  },
  inputField: {
    width: '100%',
    marginBottom: '1rem',
  },
  btn: {
    width: '100%',
    height: '3rem',
    background: 'red',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'red',
      opacity: '.7',
      transition: '.3s ease-in-out'
    },
  },
  disabledBtn: {
    background: 'rgba(0,0,0,0.38)',
    width: '100%',
    height: '3rem',
  },
});

const StepOne = ({activeStep, steps, handleNext}) => {
  // Define the state schema
  const stateSchema = {
    firstName: { value: '', error: '' },
    lastName: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    confirmPassword: { value: '', error: '' },
  };

  const stateValidatorSchema = {
    firstName: {
      required: true,
      validator: {
        func: (value) =>
          /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-]+)*/.test(value),
        error: 'First name must be more than 1 character',
      },
    },
    lastName: {
      required: true,
      validator: {
        func: (value) =>
          /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-]+)+([A-Za-z][A-Za-z'-]+)*/.test(
            value
          ),
        error: 'Last name must be more than 3 characters',
      },
    },
    email: {
      required: true,
      validator: {
        func: (value) =>
          /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
            value
          ),
        error: 'Invalid email format',
      },
    },
    password: {
      required: true,
      validator: {
        func: (value) =>
          /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value),
        error: `Minimum 6 characters and at least one number and one special character '@,$,!,%,*,#,?,&'`,
      },
    },
  };

  const { values, errors, dirty, handleOnChange } = useForm(
    stateSchema,
    stateValidatorSchema
  );

  const [showPasswordValue, setShowPasswordValue] = useState({
    showPassword: false,
  });

  const [showConfirmPasswordValue, setShowConfirmPasswordValue] = useState({
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setShowPasswordValue({
      showPassword: !showPasswordValue.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPasswordValue({
      showConfirmPassword: !showConfirmPasswordValue.showConfirmPassword,
    });
  };

  const { firstName, lastName, email, password, confirmPassword } = values;
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Typography variant='h5' style={{ color: '#999', textAlign: 'center' }}>
        Sign Up With Email
      </Typography>
      <div className={classes.formContainer}>
        <form>
          <TextField
            className={classes.inputField}
            label='First Name'
            variant='outlined'
            name='firstName'
            value={firstName}
            onChange={handleOnChange}
          />
          {errors.firstName && dirty.firstName && (
            <Typography
              style={{ marginTop: '0', color: 'red', fontWeight: '200' }}
            >
              {errors.firstName}
            </Typography>
          )}
          <TextField
            className={classes.inputField}
            label='Last Name'
            variant='outlined'
            name='lastName'
            value={lastName}
            onChange={handleOnChange}
          />
          {errors.lastName && dirty.lastName && (
            <Typography
              style={{ marginTop: '0', color: 'red', fontWeight: '200' }}
            >
              {errors.lastName}
            </Typography>
          )}
          <IntlTelInput preferredCountries={['us']} />
          <TextField
            className={classes.inputField}
            label='Email'
            variant='outlined'
            name='email'
            value={email}
            onChange={handleOnChange}
          />
          {errors.email && dirty.email && (
            <Typography
              style={{ marginTop: '0', color: 'red', fontWeight: '200' }}
            >
              {errors.email}
            </Typography>
          )}
          <FormControl variant='outlined' className={classes.inputField}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              labelWidth={70}
              name='password'
              value={password}
              onChange={handleOnChange}
              type={showPasswordValue.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowPassword}>
                    {showPasswordValue.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && dirty.password && (
              <Typography
                style={{ marginTop: '0', color: 'red', fontWeight: '200' }}
              >
                {errors.password}
              </Typography>
            )}
          </FormControl>
          <FormControl variant='outlined' className={classes.inputField}>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              labelWidth={135}
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleOnChange}
              type={
                showConfirmPasswordValue.showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPasswordValue.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {confirmPassword !== password ? (
              <Typography style={{ color: 'red' }}>
                Passwords do not match
              </Typography>
            ) : null}
          </FormControl>

          {!firstName ||
          !lastName ||
          !email ||
          !password ||
          !confirmPassword ||
          confirmPassword !== password ? (
            <Button
              className={classes.disabledBtn}
              variant='contained'
              disabled
              type='submit'
              endIcon={<BlockSharpIcon />}
            >
              {activeStep === steps?.length ? 'Finish' : 'Sign Up'}
            </Button>
          ) : (
            <Button
              className={classes.btn}
              variant='contained'
              onClick={handleNext}
              type='submit'
              endIcon={<SendSharpIcon />}
            >
              {activeStep === steps?.length ? 'Finish' : 'Sign Up'}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default StepOne;
