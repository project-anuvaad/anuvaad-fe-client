import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import PropTypes from 'prop-types';
import React from 'react';

class HorizontalLabelPositionBelowStepper extends React.Component {

  render() {
    const { steps, activeStep, style, alternativeLabel } = this.props;

    return (
      <div>
        <Stepper activeStep={activeStep} alternativeLabel={alternativeLabel} style={style}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconProps={{
                classes: { root: { color: "blue" } }
              }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object,
};

export default (HorizontalLabelPositionBelowStepper);
