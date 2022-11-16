import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ToolTipComponent from './ToolTipComponent';

const CustomizedTextField = styled(TextField)`
  & .MuiInputBase-input {
    font-family: "Nunito";
    width: 100%;
    border-color: #e7e7e7e7;
  }
  & .MuiInputBase-root {
    padding: 0px 10px;
    width: 100%;
    max-width: 23rem;
    border-color: #e7e7e7e7;
  }
  & .MuiFormControl-root {
    width: 100%;
    border-color: #e7e7e7e7;
  }
  & .MuiTextField-root {
    width: 100%;
    border-color: #e7e7e7e7;
  }
`;

const CustomizedDatePicker = styled(DatePicker)`
    font-family: "Nunito";
  & .MuiInputBase-input {
    font-family: "Nunito";
    border-color: #e7e7e7e7;
  }
  & .MuiInputBase-root {
    padding: 0px 10px;
    border-color: #e7e7e7e7;
  }
  & .MuiFormControl {
    width: 100%;
    max-width: 23rem;
    border-color: #e7e7e7e7;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #e7e7e7e7;
  }
`;

const InputDate = ({
  label, name, tooltip, register, updateValue, value, views,
}) => {
  const [internalValue, setInternalValue] = React.useState(dayjs(`${value}`));
  const handleChange = (newValue) => {
    setInternalValue(newValue);
    const dateFormat = dayjs(`${newValue}`).format('YYYY/MM/DD');
    const dateClean = dateFormat.replaceAll('/', '-');
    updateValue(dateClean, name, 'date');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack className="flex flex-col items-center justify-center max-w-368 w-full mx-auto">
        <div className="flex relative flex-row justify-start w-full">
          <span className="text-xs text-pfBlack mb-1">{label}</span>
          {tooltip && <ToolTipComponent name={name} text={tooltip} />}
        </div>
        <CustomizedDatePicker
          views={views}
          minDate={dayjs('2021-08-01')}
          maxDate={dayjs('2030-12-01')}
          value={internalValue}
          onChange={(newValue) => { handleChange(newValue); }}
          renderInput={(params) => {
            const newParams = {
              ...params, inputProps: { ...register, ...params.inputProps, name },
            };
            return (<CustomizedTextField {...newParams} />);
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
};

InputDate.defaultProps = {
  label: 'Date',
  name: 'date',
  tooltip: '',
  register: {},
  updateValue: () => {},
  value: '2023-09-07',
  views: ['year', 'month'],
};

InputDate.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  tooltip: PropTypes.string,
  register: PropTypes.shape({}),
  updateValue: PropTypes.func,
  value: PropTypes.string,
  views: PropTypes.arrayOf(PropTypes.string),
};

export default InputDate;
