import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = ({ mode, display, value, onChange }) => {
  return <DateTimePicker mode={mode} display={display} value={value} onChange={onChange} />;
};
