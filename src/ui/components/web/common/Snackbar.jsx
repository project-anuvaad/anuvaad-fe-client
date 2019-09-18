import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import React from "react";

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, onClose, variant, message } = props;
  const Icon = CheckCircleIcon;

  return (
    <div style={{ marginTop: '50px', marginRight: '30px' }}>
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        style={{ padding: '20px' }}
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </div>
  );
}

export default (withStyles(styles1)(MySnackbarContent))