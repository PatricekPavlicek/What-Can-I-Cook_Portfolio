import React from 'react';
import styles from './SecondaryLoginButton.module.css';

function SecondaryLoginButton(props){

    return(
        <div className={styles.wrapper} style={{ width: props.width }}>
            <img className={styles.image} src={props.image} alt="copmany logo" />
            <p className={styles.text}>{props.text}</p>
            <input className={styles.input} id={props.id} type="button" />
        </div>
    );
}

export default SecondaryLoginButton;