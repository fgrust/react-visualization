import React, { ReactElement } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

interface IProps {
  options: Array<string>;
  onChange?: (_e: unknown, value: string[], reason: string) => void;
}

export default (props: IProps): ReactElement => {
  const { options, onChange = () => {} } = props;
  return (
    <Autocomplete
      multiple
      options={options}
      onChange={onChange}
      renderInput={(params) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TextField {...params} variant="standard" label="Metrics" placeholder="Choose!!!" />
      )}
    />
  );
};
