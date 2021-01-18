import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from '@material-ui/core';
import StepOne from './StepOne';

const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: '6rem auto',
    border: '1px solid #999',
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: 'red',
    },
    '& .MuiStepIcon-root.MuiStepIcon-completed': {
      color: 'red',
    },
  },
});

export default function MultistepForm() {
  const [activeStep, setActiveStep] = useState(0);

  function getSteps() {
    return ['SIGN UP', 'CHOOSE PLAN', 'CHECKOUT'];
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const steps = getSteps();

  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <StepOne
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 1:
        return 'Step Two (CHOOSE PLAN)';
      case 2:
        return 'Step Three (CHECKOUT)';
      default:
        return 'Unknown Step';
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          'The Steps Completed'
        ) : (
          <div className={classes.instructions}>
            {getStepsContent(activeStep)}
          </div>
        )}
      </>
    </div>
  );
}
