import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const {
  defaultConfig: { PLATFORM },
} = require(`../../../../../../config/default`);
const {
  FormSteps,
} = require(`../../../../../../components/${PLATFORM}/atoms/form-steps`);
export const Screen = ({
  saveStepNo = () => {},
  stepIndex,
  errorsSync,
  setFormStep1Data,
  setFormStep2Data,
  setFormStep3Data,
  props,
}) => {
  return (
    <div className={"app-main_outer"}>
      <div className="container-fluid">
        <FormSteps
          saveStepNo={saveStepNo}
          stepIndex={stepIndex}
          errorsSync={errorsSync}
          setFormStep1Data={setFormStep1Data}
          setFormStep2Data={setFormStep2Data}
          setFormStep3Data={setFormStep3Data}
        />
      </div>
    </div>
  );
};
