/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import {
    WeekView, Appointments, Toolbar
  } from '@devexpress/dx-react-scheduler-material-ui';
import { styled, alpha } from '@mui/material/styles';
import { Button, ButtonGroup, TextField } from '@mui/material';

const TYPES = [
    "Visite Technique",
    "Visite Commercial",
]

const isRestTime = date => (
    date.getDay() === 0 || date.getDay() === 6 || date.getHours() < 9 || date.getHours() >= 18
);

const PREFIX = 'Creo';
const classes = {
    flexibleSpace: `${PREFIX}-flexibleSpace`,
    textField: `${PREFIX}-textField`,
    locationSelector: `${PREFIX}-locationSelector`,
    button: `${PREFIX}-button`,
    selectedButton: `${PREFIX}-selectedButton`,
    longButtonText: `${PREFIX}-longButtonText`,
    shortButtonText: `${PREFIX}-shortButtonText`,
    title: `${PREFIX}-title`,
    textContainer: `${PREFIX}-textContainer`,
    time: `${PREFIX}-time`,
    text: `${PREFIX}-text`,
    container: `${PREFIX}-container`,
    weekendCell: `${PREFIX}-weekendCell`,
    weekEnd: `${PREFIX}-weekEnd`,
};

export const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({
    theme: { palette },
  }) => ({
    [`&.${classes.weekendCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      '&:focus': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
    },
}));

export const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({
    theme: { palette },
  }) => ({
    [`&.${classes.weekEnd}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06),
    },
}));

export const StyledAppointmentsAppointmentContent = styled(Appointments.AppointmentContent)(() => ({
    [`& .${classes.title}`]: {
      fontWeight: 'bold',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    [`& .${classes.textContainer}`]: {
      lineHeight: 1,
      whiteSpace: 'pre-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
    },
    [`& .${classes.time}`]: {
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    [`& .${classes.text}`]: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    [`& .${classes.container}`]: {
      width: '100%',
    },
  }));

export const StyledTextField = styled(TextField)(({
    theme: { spacing },
  }) => ({
    [`&.${classes.textField}`]: {
      width: '75px',
      marginLeft: spacing(1),
      marginTop: 0,
      marginBottom: 0,
      height: spacing(4.875),
    },
  }));

export const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
    [`&.${classes.flexibleSpace}`]: {
      margin: '0 auto 0 0',
      display: 'flex',
      alignItems: 'center',
    },
}));

export const StyledButtonGroup = styled(ButtonGroup)(({
    theme: { spacing, palette },
  }) => ({
    [`&.${classes.locationSelector}`]: {
      marginLeft: spacing(1),
      height: spacing(4.875),
    },
    [`& .${classes.longButtonText}`]: {
      '@media (max-width: 800px)': {
        display: 'none',
      },
    },
    [`& .${classes.shortButtonText}`]: {
      '@media (min-width: 800px)': {
        display: 'none',
      },
    },
    [`& .${classes.button}`]: {
      paddingLeft: spacing(1),
      paddingRight: spacing(1),
      marginRight: spacing(1),
      fontSize: '0.6rem',
      border: `1px solid ${palette.grey[400]}!important`,
      borderRadius: '5px !important',
      width: spacing(16),
      '@media (max-width: 800px)': {
        width: spacing(2),
        fontSize: '0.6rem',
      },
    },
    [`& .${classes.selectedButton}`]: {
      background: palette.primary[500],
      color: palette.primary[50],
      '&:hover': {
        backgroundColor: palette.primary[500],
      },
      border: `1px solid ${palette.primary[400]}!important`,
      borderLeft: `1px solid ${palette.primary[50]}!important`,
      '&:first-of-type': {
        borderLeft: `1px solid ${palette.primary[50]}!important`,
      },
    },
}));

export const Filter = ({ onCurrentFilterChange, currentFilter }) => (
    <StyledTextField
      size="small"
      placeholder="Filter"
      className={classes.textField}
      value={currentFilter}
      onChange={({ target }) => onCurrentFilterChange(target.value)}
      variant="outlined"
      hiddenLabel
      margin="dense"
    />
);

export const LocationSelector: React.FunctionComponent<{ontypesChange: (type: string) => void}> = ({ 
    ontypesChange 
}) => (
    <StyledButtonGroup className={classes.locationSelector}>
      {TYPES.map(type => (
        <Button
          className={classes.button}
          onClick={() => ontypesChange(type)}
          key={type}
        >
          <React.Fragment>
            <span className={classes.longButtonText}>{type}</span>
          </React.Fragment>
        </Button>
      ))}
    </StyledButtonGroup>
);

export const TimeTableCell = (({ ...restProps }) => {
    const { startDate } = restProps;
    if (isRestTime(startDate)) {
      return <StyledWeekViewTimeTableCell {...restProps} className={classes.weekendCell} />;
    } return <StyledWeekViewTimeTableCell {...restProps} />;
});
  
export const MyStyledFlexibleSpace: React.FunctionComponent<{children: React.ReactNode}> = ({ children }) => (
    <StyledToolbarFlexibleSpace className={classes.flexibleSpace}>
        {children}
    </StyledToolbarFlexibleSpace>
);