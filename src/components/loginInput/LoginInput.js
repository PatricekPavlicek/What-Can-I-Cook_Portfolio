import React from 'react';
import styles from './LoginInput.module.css';

function LoginInput(props){
    return(
        <div className={styles['input-wrapper']} style={{ width: props.width }}>
            <label 
                className={styles['label']} 
                htmlFor={props.id} 
            >
            {props.labelText}
            </label>
            <input
                className={styles['input']} 
                id={props.id} 
                type={props.type} 
                onChange={props.onChange} 
            />
        </div>
    );
}

export default LoginInput;