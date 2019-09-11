import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.css';
import { Typography } from '@material-ui/core';

const Result = (props) => {
    const { error, resultText } = props;
    
    return (
        <div className={resultText ? styles.message : styles.noshow}>
            <Typography className={styles.header}>
                Results
            </Typography>
            <Typography className={error ? styles.error: styles.result}>
                {resultText}
            </Typography>
        </div>
    );
};

export { Result };