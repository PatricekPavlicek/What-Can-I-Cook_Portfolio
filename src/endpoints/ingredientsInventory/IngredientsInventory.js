import React, { useState, useRef, useEffect } from 'react';
import styles from './IngredientsInventory.module.css';
import Button from '../../components/button/Button';
import mainIcon from '../../resources/grocery.png';
import searchIcon from '../../resources/searchIcon.png';
import deleteIcon from '../../resources/delete.png';
import NewIngredientDialog from '../../components/newIngredientDialog/NewIngredientDialog';
import Loading from '../../components/loading/Loading';
import { useParams } from 'react-router-dom';

function IngredientsInventory() {
    const { profileId } = useParams();
    const [wordSearchedFor, setWordSearchedFor] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchResultsCount, setSearchResultsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef(null);
    const searchResultsCountRef = useRef(null);

    const handleSearch = (searchValue) => {
        searchValue = searchValue.trim();

        setWordSearchedFor(searchValue);
    };

    const removeIngredient = (ingredientToDelete) => {
        const removalIndex = ingredients.indexOf(ingredientToDelete);

        if (removalIndex === -1) {
            return;
        }

        // Send update to API
        fetch('/profiles/' + profileId)
            .then(response => response.json())
            .then(author => {
                const updatedIngredients = author.ingredients.filter(
                    ingredient => ingredient !== ingredientToDelete
                );

                const updatedAuthor = {
                    ...author,
                    ingredients: updatedIngredients
                }

                return fetch('/profiles/' + profileId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedAuthor),
                });
            })
            .then(response => {
                if (!response.ok) {
                    console.error('failed to remove ingredient');
                }
                else {
                    console.log('ingredient removed successfully');
                    const updatedIngredients = [...ingredients];
                    updatedIngredients.splice(removalIndex, 1);
                    setIngredients(updatedIngredients);
                }
            })
            .catch(error => console.error('error occured when trying to remov ingredient:', error));
    }

    const addIngredient = (ingredient) => {
        if (ingredient === null || ingredient === undefined) {
            return;
        }

        // If array already contains the ingredient -> don't add it
        if (containsIngredient(ingredient)) {
            return;
        }

        // Send update to API
        fetch('/profiles/' + profileId)
            .then(response => response.json())
            .then(author => {
                const updatedIngredients = [...author.ingredients, ingredient.id];

                const updatedAuthor = {
                    ...author,
                    ingredients: updatedIngredients
                }

                return fetch('/profiles/' + profileId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedAuthor),
                });
            })
            .then(response => {
                if (!response.ok) {
                    console.error('failed to add ingredient');
                }
                else {
                    // Ingredient was updated to API sucessfully
                    const updatedIngredients = [...ingredients];
                    updatedIngredients.push(ingredient);
                    setIngredients(updatedIngredients);
                }
            })
            .catch(error => console.error('error occured when trying to add new ingredient:', error));
    }

    const containsIngredient = (ingredient) => {
        return ingredients.some((element) => element.name === ingredient.name);
    }

    const structuredIngredients = ingredients.reduce((acc, ingredient) => {
        const firstLetter = ingredient.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(ingredient);
        return acc;
    }, {});

    const handleDialogClose = () => {
        setDialogOpen(false);
        document.body.style.overflow = '';
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
        document.body.style.overflow = 'hidden';
    }

    const handleNewIngredientAdded = (ingredient) => {
        addIngredient(ingredient);
    }

    useEffect(() => {
        if (wordSearchedFor === '') {
            setSearchResultsCount(0);
            return;
        }

        const count = ingredients.filter(ingredient =>
            ingredient.name.toLowerCase().includes(wordSearchedFor.toLowerCase())
        ).length;

        setSearchResultsCount(count);
    }, [ingredients, wordSearchedFor]);

    useEffect(() => {
        fetch('/profiles/' + profileId)
            .then(response => response.json())
            .then(authorData => {
                return Promise.all(
                    authorData.ingredients.map(ingredientId =>
                        fetch('/all-ingredients/' + ingredientId).then(res => res.json())
                    )
                ).then(ingredients => {
                    setIngredients(ingredients);
                    setIsLoading(false);
                });
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, [profileId]);

    return (
        <div className={styles['main-wrapper']}>
            {isLoading ? (
                <Loading />
            ) :
                (
                    <>
                        <section className={styles['top-section']}>
                            <div className={styles['header']}>
                                <img className={styles['heading-icon']} src={mainIcon} alt="groceries"></img>
                                <h1 className={styles['heading-text']}>Seznam surovin</h1>
                            </div>

                            <Button onClick={handleDialogOpen} color="var(--orange)" width="300px" text="Přidat surovinu"></Button>
                        </section>
                        <section className={styles['ingredients-section']}>

                            <div className={styles['search-field']}>
                                <input
                                    type="text"
                                    placeholder="Vyhledat..."
                                    ref={inputRef}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className={styles['search-field-input']}
                                />
                                <button onClick={() => handleSearch(inputRef.current.value)} className={styles['search-field-button']}>
                                    <img className={styles['search-field-button-icon']} src={searchIcon} alt="magnifying glass"></img>
                                </button>
                            </div>
                            <p ref={searchResultsCountRef} className={styles['search-results-count']}>{searchResultsCount} <span>filtrovaných výsledků</span></p>

                            <ul className={styles['letter-list']}>

                                {/* Iterate trough all the letters and create a list of ingredients for each */}
                                {Object.entries(structuredIngredients).map(([letter, ingredients]) => (
                                    <li className={styles['letter-list-item']} key={letter}>
                                        <h3 className={styles['letter-list-item-heading']}>{letter}</h3>
                                        <ul className={styles['ingredient-list']}>

                                            {/* Iterate trough all the ingredients in each letter and add them as list-item */}
                                            {
                                                ingredients.map((ingredient) => {

                                                    const isHighlighted =
                                                        wordSearchedFor &&
                                                        ingredient.name.normalize().toLowerCase().includes(wordSearchedFor.normalize().toLowerCase());

                                                    const liStyles = [];

                                                    liStyles[0] = (styles['ingredient-list-item']);

                                                    if (isHighlighted) {
                                                        liStyles[1] = (styles['highlighted-list-item']);
                                                    }
                                                    else {
                                                        liStyles[1] = null;
                                                    }
                                                    return (
                                                        <li
                                                            className={liStyles.join(' ')}
                                                            key={ingredient.id}
                                                        >
                                                            {ingredient.name}
                                                            <button onClick={() => removeIngredient(ingredient)} className={styles['ingredient-delete-button']}>
                                                                <img className={styles['ingredient-delete-button-img']} src={deleteIcon} alt="delete"></img>
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <NewIngredientDialog addedIngredients={ingredients} handleClose={handleDialogClose} dialogOpen={dialogOpen} addIngredient={handleNewIngredientAdded} />
                    </>
                )}
        </div>
    );
}

export default IngredientsInventory;