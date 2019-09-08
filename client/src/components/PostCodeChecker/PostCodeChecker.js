import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import styles from './style.module.css';
import { FormHelperText } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#8BC3D1' },
  },
});
 
const PostCodeChecker = () => {
    return (
      <MuiThemeProvider theme={theme}>
        <FormControl className={styles.form}>
          <InputLabel htmlFor="postCode">Post Code</InputLabel>
          <Input id="postCode" aria-describedby="my-helper-text" />
          
          <InputLabel htmlFor="suburb">Suburb</InputLabel>
          <Input id="suburb" aria-describedby="my-helper-text" />
          
          <InputLabel htmlFor="state">State</InputLabel>
          <Input id="state" aria-describedby="my-helper-text" />
          
        </FormControl>
      </MuiThemeProvider>
    )
};

export { PostCodeChecker };
