import React from 'react';
import styles from './PreviewCard.module.css'
import Rating from '../rating/Rating';
import MissingIngredients from '../missingIngredients/MissingIngredients';
import DifficultyIcon from '../../resources/chef-hat.png';
import TimeIcon from '../../resources/clock.png'
import { Link, useNavigate } from 'react-router-dom';

function PreviewCard(props){
    const navigate = useNavigate();
    const handleLinkClick = () => {
        console.log('re-routing');
        window.location.href = '/profiles/' + props.authorId;
    }

    const recipeDifficulties = {
        1: 'lehká',
        2: 'střední',
        3: 'těžká'
    }

    function mapDifficulty(difficultyNumber){
        return recipeDifficulties[difficultyNumber];
    }

    let cardHeight = 560;

    if(props.MissingIngredientsArray == null || props.missingIngredientsArray == undefined || props.missingIngredientsArray?.length == 0){
        cardHeight -= 80;
    }

    return(
        <div className={styles['main-wrapper']} style={{ height: cardHeight + 'px' }}>
            <div className={styles['recipe-image-wrapper']}>
                <img className={styles['recipe-image']} src={props.image} alt="food preview"></img>
            </div>
            <div className={styles['rating-wrapper']}>
                <Rating ratingValue={props.ratingValue} ratingAmmount={props.ratingAmmount} />
            </div>
            <div className={styles['recipe-name-wrapper']}>
                <h5 className={styles['recipe-name']}>{props.recipeName}</h5>
            </div>
            {props.missingIngredientsArray?.length > 0 && (
                <div className={styles['missing-ingredients-wrapper']}>
                <MissingIngredients missingIngredientsArray={props.missingIngredientsArray}></MissingIngredients>
                </div>
            )}
            <ul className={styles['recipe-parameters-list']}>
                <li className={styles['recipe-parameters-list-item']}>
                    <img className={styles['recipe-parameters-list-item-icon']} src={DifficultyIcon}></img>
                    <p className={styles['recipe-parameters-list-item-text']}>{mapDifficulty(props.difficulty)} náročnost</p>
                </li>
                <li className={styles['recipe-parameters-list-item']}>
                    <img className={styles['recipe-parameters-list-item-icon']} src={TimeIcon}></img>
                    <p className={styles['recipe-parameters-list-item-text']}>{props.time} minut</p>
                </li>
            </ul>
            {props.displayAuthor === true && (
                <div className={styles['author-wrapper']}>
                    <p className={styles['author-text']}>Autor: </p>
                    <Link className={styles['author-link']} onClick={handleLinkClick}>{props.authorName}</Link>
                </div> 
            )}

        </div>
    );
}

export default PreviewCard;