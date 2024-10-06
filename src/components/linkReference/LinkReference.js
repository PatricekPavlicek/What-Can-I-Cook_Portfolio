import React from 'react';
import styles from './LinkReference.module.css';
import { Link } from 'react-router-dom';

function LinkReference(props){
    return(
        <Link className={styles['text']} to={props.to}>{props.text}</Link>
    );
}

export default LinkReference;