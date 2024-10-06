import React, { useEffect } from 'react';
import styles from './Loading.module.css'

function Loading() {

    document.body.style.overflowY = 'hidden';

    useEffect(() =>{

        return() => {
            document.body.style.overflowY = 'auto';
        }
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['loader']}></div>
        </div>
    )
}

export default Loading