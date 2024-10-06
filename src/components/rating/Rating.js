import React from 'react';
import styles from './Rating.module.css';
import starImage from '../../resources/star.png'

function Rating(props){

    const hidingStarsWidth = (100 - (props.ratingValue * 2 * 10))  + '%';

    return(
        <div className={styles['main-wrapper']}>
            <div className={styles['stars-wrapper']}>
                <img className={styles['star-icon']} src={starImage} alt="star"></img>
                <img className={styles['star-icon']} src={starImage} alt="star"></img>
                <img className={styles['star-icon']} src={starImage} alt="star"></img>
                <img className={styles['star-icon']} src={starImage} alt="star"></img>
                <img className={styles['star-icon']} src={starImage} alt="star"></img>

                
                <div className={styles['hiding-stars']} style={{ width: hidingStarsWidth }}></div>
            </div>
            {props.ratingAmmount == true && (
                <p className={styles['rating-ammount']}>({props.ratingAmmount})</p>
            )}
        </div>
    );
}

export default Rating;