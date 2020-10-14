import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
    background: '#f0f0f0',
  },
});

const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }): ReactElement => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

export default Wrapper;
