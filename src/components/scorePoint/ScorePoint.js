import React from 'react';
import styles from './ScorePoint.module.css'

function ScorePoint(props) {
    return (
        <div className={styles['main-wrapper']}>
            <div className={styles['circle-wrapper']}>
                <div className={[styles['circle'], styles['circle3']].join(' ')}></div>
                <div className={[styles['circle'], styles['circle2']].join(' ')}></div>
                <div className={[styles['circle'], styles['circle1']].join(' ')}>
                    <p className={styles['score']}>{Math.round(props.score)}</p>
                </div>
            </div>

            <p className={styles['score-description']}>{props.scoreDescription} <span className={styles['description-emoji']}>{props.emoji}</span></p>
        </div>
    );
}

export default ScorePoint