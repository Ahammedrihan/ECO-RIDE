import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const steps = [
  {
    label: 'Saftey',
    description: `
    Ensuring the safety of cab drivers is paramount in
     creating a secure and reliable transportation ecosystem. Cab drivers, as frontline service providers,
      face various challenges during their shifts.
       From navigating busy streets to interacting with diverse passengers, 
       their well-being directly impacts the overall safety of the community.
        `
  },
  {
    label: 'Driving Manners',
    description:
      `
      Driving manners are the cornerstone of a
       safe and pleasant road experience. Practicing good 
       driving manners involves being courteous, patient,
        and respectful towards fellow road users.
         It means adhering to traffic rules, yielding when appropriate,
          and refraining from aggressive behavior. Simple gestures,
           like using turn signals, allowing others to merge, 
           and maintaining a safe following distance.`,
  },
  {
    label: 'Speed',
    description: `
    Maintaining a safe and appropriate speed is paramount
     for responsible driving. Speed directly impacts reaction
      time and the ability to stop quickly, influencing overall 
      road safety. By being aware of the 
       speed and driving responsibly, drivers contribute to reducing accidents,
        protecting lives, and promoting a safer road environment for all. Remember,
         arriving safely is always more important than arriving quickly.
    
    `,
  },
];

export  function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="vertical" >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel  
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Read Again
          </Button>
        </Paper>
      )}
    </Box>
  );
}




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 630,
  height: 530,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ handleClose }) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rules
            
          </Typography>
          <VerticalLinearStepper/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="success" onClick={()=>handleClose()}>
            close
            </Button>
         </Typography>
        </Box>
      </Modal>
    </div>
  );
}