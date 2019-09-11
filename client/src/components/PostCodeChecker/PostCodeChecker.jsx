import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl } from '@material-ui/core';
import styles from './style.module.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
 
const PostCodeChecker = (props) => {

  const { 
    postCode,
    suburb,
    region,
    onPostCodeChange,
    onSuburbChange,
    onRegionChange,
    onSubmit
   } = props;

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit}>
        <FormControl className={styles.form} onSubmit={onSubmit}>
          <Typography className={styles.formHeader}>
            Find a Post Code
          </Typography>
          <TextField
            id="standard-name"
            label="Post Code"
            className={styles.textField}
            value={postCode}
            onChange={onPostCodeChange}
            margin="normal"
            type="text"
          />

          <TextField
            id="standard-name"
            label="Suburb"
            className={styles.textField}
            value={suburb}
            onChange={onSuburbChange}
            margin="normal"
            type="text"
          />
          <Select
            value={region}
            onChange={onRegionChange}
            className={styles.dropDown}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>State</em>
            </MenuItem>
            <MenuItem value={"NSW"}>NSW</MenuItem>
            <MenuItem value={"VIC"}>VIC</MenuItem>
            <MenuItem value={"SA"}>SA</MenuItem>
            <MenuItem value={"WA"}>WA</MenuItem>
            <MenuItem value={"NT"}>NT</MenuItem>
            <MenuItem value={"TAS"}>TAS</MenuItem>
          </Select>
          <Button 
            variant="contained" 
            color="primary" 
            className={styles.button}
            type="submit"
            value="Submit"
          > 
            Check Address
          </Button>
        </FormControl>
      </form>
    </div>
  )
};

export { PostCodeChecker };
