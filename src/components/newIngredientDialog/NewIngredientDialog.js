import React, { useEffect, useRef, useState } from 'react';
import styles from './NewIngredientDialog.module.css';
import closeIcon from '../../resources/close.png';
import searchIcon from '../../resources/searchIcon.png';
import tickIcon from '../../resources/tick.png';

function NewIngredientDialog( {addIngredient, handleClose, dialogOpen, addedIngredients} ) {

    const inputRef = useRef(null);
    const [matchingIngredients, setMatchingIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);

    const handleSearch = (wordSearchedFor) => {
        wordSearchedFor = wordSearchedFor.trim();

        if (wordSearchedFor === ''){
            setMatchingIngredients([]);
            return;
        }

        const currentMatchingIngredients = [];

        allIngredients.forEach(ingredient => {
            if (ingredient.name.toLowerCase().startsWith(wordSearchedFor.toLowerCase())) {
                currentMatchingIngredients.push(ingredient);
            }
        });

        setMatchingIngredients(currentMatchingIngredients);
    }

    useEffect(() => {
        fetch('/all-ingredients')
         .then(response => response.json())
         .then(allIngredients => setAllIngredients(allIngredients))
         .catch(error => console.error('Error fetching data: ' + error))
    }, []);

    return (
        <div className={styles['background-blur']} style={{ display: dialogOpen ? 'flex' : 'none' }}>
            <div className={styles['main-wrapper']}>
                <button onClick={handleClose} className={styles['close-button']}>
                    <img className={styles['close-button-icon']} src={closeIcon} alt="close"></img>
                </button>

                <div className={styles['search-field']}>
                    <input
                        type="text"
                        placeholder="Vyhledat..."
                        ref={inputRef}
                        className={styles['search-field-input']}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <img className={styles['search-field-input-img']} src={searchIcon} alt="search icon"></img>
                </div>

                <div className={styles['result-field']}>
                    <ul className={styles['result-field-list']}>
                        {
                            /* generate results based on input */
                            matchingIngredients.map((ingredient, index) => {
                                return (
                                    <li key={index} className={styles['result-item']} onClick={() => addIngredient(ingredient)}>
                                        <button className={styles['result-item-button']}>
                                            <img className={styles['result-item-button-img']} src={closeIcon} alt="add"></img>
                                        </button>
                                        <p className={styles['result-item-text']}>{ingredient.name}</p>
                                        <img
                                            className={styles['already-in-inventory-img']}
                                            src={tickIcon}
                                            alt="alredy in inventory icon"
                                            style={{ display: addedIngredients.some((addedIngredient) => addedIngredient.name === ingredient.name) ? 'block': 'none' }}
                                        >
                                        </img>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NewIngredientDialog;