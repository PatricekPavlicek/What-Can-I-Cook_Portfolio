import React, { useRef, useEffect, useState } from 'react';
import styles from './MissingIngredients.module.css';
import arrowImage from '../../resources/right-arrow.png'

function MissingIngredients(props) {

    const extraSpace = 100; //px
    const ingredientsListRef = useRef(null);
    const missingIngredientsArray = props.missingIngredientsArray;
    const [sectionLimit, setSectionLimit] = useState('');
    const [missingIngredientsObjectsArray, setMissingIngredientsObjectsArray] = useState([]);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

    useEffect(() => {
        splitIngredientsIntoDisplayableSections();
    }, []);

    function splitIngredientsIntoDisplayableSections(){
        // If ingredientListRef doesn't contain any DOM element
        if(!ingredientsListRef.current){
            return;
        }

        const ingredientsListWidth = ingredientsListRef.current.getBoundingClientRect().width;
        const widthLimit = ingredientsListWidth - extraSpace;
        let currentWidthLimit = widthLimit;
        let section = 0;
        const tempMissingIngredientsObjectsArray = [];

        for(let i = 0; i < missingIngredientsArray.length; i++){
            // need value, element, section
            const value = missingIngredientsArray[i];
            const element =
                (<li className={styles['ingredient']} key={i}>
                    {value}
                </li>);

            const textWidth = calculateTextWidth(missingIngredientsArray[i]);

            if(textWidth <= currentWidthLimit){
                currentWidthLimit -= textWidth;
            }
            else{
                section++;
                currentWidthLimit = widthLimit - textWidth;
            }

            if(i === missingIngredientsArray.length - 1){
                setSectionLimit(section);
            }

            tempMissingIngredientsObjectsArray.push({value, element, section});
        }
        setMissingIngredientsObjectsArray(tempMissingIngredientsObjectsArray);
    }

    function displayIngredients(){
        return missingIngredientsObjectsArray.map((item) => {
            if(item.section === currentSectionIndex){
                return item.element;
            }
            return null;
        });
    }

    function calculateTextWidth(text){
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '16px Roboto';

        return context.measureText(text).width;
    }

    function rightButtonClick(){
        setCurrentSectionIndex(calculateIndex(currentSectionIndex, 1));
    }

    function leftButtonClick(){
        setCurrentSectionIndex(calculateIndex(currentSectionIndex, -1));
    }

    function calculateIndex(previous, increment){
        let newIndex = previous + increment;

        if(newIndex < 0){
            return sectionLimit;
        }
        if(newIndex > sectionLimit){
            return 0;
        }
        return newIndex;
    }

    return (
        <div className={styles['main-wrapper']}>
            <h6 className={styles['header']}>
                Chybějící suroviny
                <span className={styles['header-number']}>{missingIngredientsArray.length}</span>
            </h6>
            <div className={styles['ingredient-list-wrapper']}>
                <button
                    className={[styles['ingredient-list-button'], styles['button-arrow-left']].join(' ')}
                    onClick={leftButtonClick}
                >
                    <img className={styles['ingredient-list-button-image']} src={arrowImage} alt="arrow"></img>
                </button>
                <ul ref={ingredientsListRef} className={styles['ingredient-list']}>
                    {displayIngredients()}
                </ul>
                <button
                    className={[styles['ingredient-list-button'], styles['button-arrow-right']].join(' ')}
                    onClick={rightButtonClick}
                >
                    <img className={styles['ingredient-list-button-image']} src={arrowImage} alt="arrow"></img>
                </button>
            </div>
        </div>
    );
}

export default MissingIngredients;