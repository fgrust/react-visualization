import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

export default (props: { options: Array<string> }) => {
  const { options } = props;
  return (
    <Autocomplete
      multiple
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label="Metrics"
          placeholder="Choose!!!"
        />
      )}
    ></Autocomplete>
  )
};
