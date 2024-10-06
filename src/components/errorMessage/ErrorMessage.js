import React from 'react';
import styles from './ErrorMessage.module.css';

function ErrorMessage(props){
    if(!props.errorText) return <p>‎</p>;

    return <p className={styles['error-text']}>Chyba: {props.errorText}</p>
}

export default ErrorMessage;