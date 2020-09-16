import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

interface Props {
  options: Array<string>;
  onChange?: (event: Object, value: string[], reason: string) => void;
};

export default (props: Props) => {
  const { options, onChange = () => {} } = props;
  return (
    <Autocomplete
      multiple
      options={options}
      onChange={onChange}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label="Metrics"
          placeholder="Choose!!!"
        />
      )}
    />
  )
};
