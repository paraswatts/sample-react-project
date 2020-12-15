import React, { useState, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import "./styles.scss";
const {
  defaultConfig: { PLATFORM, LOCATION, VERSION },
} = require(`../../../../config/default`);
const {
  FormStep1,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/add-new-list/formStep1`);
const {
  FormStep2,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/add-new-list/formStep2`);
const {
  FormStep3,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/add-new-list/formStep3`);
const {
  FormStep4,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/add-new-list/formStep4`);
const {
  MessagePopUp,
} = require(`../../../../components/${PLATFORM}/atoms/message-pop-up`);

function getSteps() {
  return [
    "Add a new listing:",
    "Step 1",
    "Step 2 (optional)",
    "Step 3",
    "Step 4",
  ];
}
const pageComponet = (activeStep, setActiveStep, saveStepNo) => {
  switch (activeStep) {
    case 0:
      return;
    case 1:
      return (
        <FormStep1
          onSubmit={() => {
            setActiveStep(activeStep + 1);
            saveStepNo(activeStep + 1);
            document.getElementsByTagName("body")[0].scrollTo(0, 0);
          }}
        />
      );
    case 2:
      return (
        <FormStep2
          onBack={() => {
            setActiveStep(activeStep - 1);
            saveStepNo(activeStep - 1);
            document.getElementsByTagName("body")[0].scrollTo(0, 0);
          }}
          onSubmit={() => {
            setActiveStep(activeStep + 1);
            saveStepNo(activeStep + 1);
            document.getElementsByTagName("body")[0].scrollTo(0, 0);
          }}
        />
      );
    case 3:
      return (
        <FormStep3
          onBack={() => {
            setActiveStep(activeStep - 1);
            saveStepNo(activeStep - 1);
            document.getElementsByTagName("body")[0].scrollTo(0, 0);
          }}
          onSubmit={() => {
            setActiveStep(activeStep + 1);
            saveStepNo(activeStep + 1);
            document.getElementsByTagName("body")[0].scrollTo(0, 0);
          }}
        />
      );
    case 4:
      return (
        <FormStep4
          onBack={() => {
            setActiveStep(activeStep - 1);
            saveStepNo(activeStep - 1);
            document.getElementsByTagName("body")[0].scrollTo(0, 0);
          }}
          onSubmit={() => {
            setActiveStep(activeStep + 1);
            saveStepNo(activeStep + 1);
            document.getElementsByTagName("body")[0].scrollTo(0, 0);
          }}
          onChange={() => {
            setActiveStep(1);
            saveStepNo(1);
            document.getElementsByTagName("body")[0].scrollTo(0, 0);
          }}
        />
      );
    default:
      return (
        <FormStep1
          onSubmit={() => {
            setActiveStep(activeStep + 1);
            saveStepNo(activeStep + 1);
          }}
        />
      );
  }
};

export const FormSteps = ({
  saveStepNo,
  stepIndex,
  errorsSync,
  setFormStep1Data,
  setFormStep2Data,
  setFormStep3Data,
}) => {
  const [activeStep, setActiveStep] = React.useState(stepIndex);
  const [messagePopVisibility, setMessagePopVisibility] = React.useState(false);
  const [messageDescription, setMessageDescription] = React.useState("");
  const steps = getSteps();
  const errorsCheck = Object.values(errorsSync);
  useEffect(() => {
    setActiveStep(stepIndex);
  }, [stepIndex]);
  return (
    <div>
      {messagePopVisibility && (
        <MessagePopUp
          rightButtonLabel={"OK"}
          messageDescription={messageDescription}
          messageTitle={""}
          rightButtonAction={() => {
            setMessagePopVisibility(false);
          }}
        />
      )}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <StepLabel
              className={(index === activeStep) && 'active-step'}
              {...labelProps}
              key={index + ""}
              onClick={() => {
                if (index > 0 && index <= 4) {
                  if (activeStep < index) {
                    if (
                      errorsCheck &&
                      errorsCheck[0] &&
                      errorsCheck[0].hasOwnProperty("syncErrors")
                    ) {
                      let messageError =
                        errorsCheck &&
                        errorsCheck[0] &&
                        errorsCheck[0].syncErrors;
                      setMessageDescription(Object.values(messageError)[0]);
                      setMessagePopVisibility(
                        errorsCheck &&
                        errorsCheck[0] &&
                        errorsCheck[0].hasOwnProperty("syncErrors")
                      );
                    } else {
                      activeStep === 1
                        ? setFormStep1Data(errorsCheck[0].values)
                        : activeStep == 2
                          ? setFormStep2Data(errorsCheck[0].values)
                          : activeStep == 3 &&
                          setFormStep3Data(errorsCheck[0].values);
                      setActiveStep(index);
                      saveStepNo(index);
                    }
                  } else {
                    activeStep === 1
                      ? setFormStep1Data(errorsCheck[0].values)
                      : activeStep == 2
                        ? setFormStep2Data(errorsCheck[0].values)
                        : activeStep == 3 &&
                        setFormStep3Data(errorsCheck[0].values);
                    setActiveStep(index);
                    saveStepNo(index);
                  }
                }
              }}
            >
              {label}
            </StepLabel>
          );
        })}
      </Stepper>
      {pageComponet(activeStep, setActiveStep, saveStepNo)}
    </div>
  );
};
