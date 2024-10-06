import React, { useState, useEffect } from 'react';
import styles from './ProfileScreen.module.css';
import CardList from '../../components/cardList/CardList';
import Loading from '../../components/loading/Loading';
import TestImage from '../../resources/recipe-img.jpg';
import TestUserImage from '../../resources/chef.jpg';
import { useParams, Link } from 'react-router-dom';
import ScorePoint from '../../components/scorePoint/ScorePoint'

function ProfileScreen() {
    const [author, setAuthor] = useState(null);
    const { profileId } = useParams();

    const authorStructure = {
        id: 1,
        name: "Pepa Pavel",
        join_date: "2020-08-25",
        written_recipes: [
            {
                id: 1,
                image: TestImage,
                ratingValue: 4.5,
                ratingAmount: 100,
                recipeName: "Banánová mísa s piškoty a jablkem",
                difficulty: 3,
                time: 60,
                authorId: 1,
                authorName: "Pepa Pavel"
            },
            {
                id: 2,
                image: TestImage,
                ratingValue: 4.7,
                ratingAmount: 150,
                recipeName: "Čokoládový dort s malinami",
                difficulty: 4,
                time: 90,
                authorId: 1,
                authorName: "Pepa Pavel"
            }
        ],
        favourited_recipes: [
            {
                id: 3,
                image: TestImage,
                ratingValue: 4.2,
                ratingAmount: 80,
                recipeName: "Zeleninový salát s fetou a olivami",
                difficulty: 2,
                time: 30,
                authorId: 3,
                authorName: "Ctirad Volejník"
            },
            {
                id: 4,
                image: TestImage,
                ratingValue: 4.8,
                ratingAmount: 200,
                recipeName: "Pečené kuře s bylinkami",
                difficulty: 3,
                time: 120,
                authorId: 4,
                authorName: "Martin Kovář"
            },
        ],
        ingredients: ['jablko', 'mouka', 'cukr', 'cuketa', 'tatarská omáčka']
    };

    useEffect(() => {
        // GET author
        fetch('/profiles/' + profileId)
            .then(response => response.json())
            .then(authorData => {
                // GET written_recipes by ID
                const writtenRecipesFetch = Promise.all(
                    authorData.written_recipes.map(recipeId =>
                        fetch('/recipes/' + recipeId).then(res => res.json())
                    )
                );

                // GET favourited_recipes by ID
                const favouritedRecipesFetch = Promise.all(
                    authorData.favourited_recipes.map(recipeId =>
                        fetch('/recipes/' + recipeId).then(res => res.json())
                    )
                );

                // GET ingredients by ID
                const ingredientsFetch = Promise.all(
                    authorData.ingredients.map(ingredientId =>
                        fetch('/all-ingredients/' + ingredientId).then(res => res.json())
                    )
                );

                // Počkej, až se všechny fetch volání dokončí
                return Promise.all([writtenRecipesFetch, favouritedRecipesFetch, ingredientsFetch])
                    .then(([writtenRecipes, favouritedRecipes, ingredients]) => {
                        // Spoj načtená data s autorem a nastav author
                        setAuthor({
                            ...authorData,
                            written_recipes: writtenRecipes,
                            favourited_recipes: favouritedRecipes,
                            ingredients: ingredients
                        });
                    });
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, [profileId]);

    const convertDateToCzech = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString('cs-CZ');
    } 

    return (
        <div>
            {author ? (
                <>
                    <section className={styles['profile-heading-section']}>
                        <div className={styles['profile-details']}>
                            <img src={TestUserImage} alt="profile picture" className={styles['profile-details-image']}></img>
                            <div className={styles['profile-details-text']}>
                                <p className={styles['profile-details-username']}>{author.name}</p>
                                <p className={styles['profile-details-join-date']}>Členem od {convertDateToCzech(author.join_date)}</p>
                            </div>
                        </div>

                        <ul className={styles['profile-stats']}>
                            <li><ScorePoint score={author.written_recipes.length} scoreDescription="Vytvořených receptů" emoji="🍳" /></li>
                            <li className={styles['middle-score']}>
                                <ScorePoint score={author.score} scoreDescription="Celkové hodnocení" emoji="⭐" />
                                <p className={styles['middle-score-note']}>Průměrné uživatelské hodnocení  autorových receptů </p>
                            </li>
                            <li><ScorePoint score={author.reviews.length} scoreDescription="Napsaných recenzí" emoji="📋" /></li>
                        </ul>

                        <Link to={'/profiles/' + profileId + '/ingredients-inventory'} className={styles['ingredients-list-link']}>Zobrazit seznam surovin</Link>
                    </section>

                    <section className={styles['lists']}>
                        <CardList cards={author.written_recipes || []} emptyListText="Autor zatím nevytvořil žádné recepty" currentAuthorId={profileId} listHeader="Autorovy recepty" listLinkHref="" listLinkName="Zobrazit všechny recepty" />
                        <CardList cards={author.favourited_recipes || []} emptyListText="Autor zatím nemá žádné uožené recepty" currentAuthorId={profileId} listHeader="Oblíbené recepty" listLinkHref="" listLinkName="Zobrazit všechny oblíbené recepty" />
                    </section>
                </>
            ) : 
            (<Loading />)}

        </div>
    );

}

export default ProfileScreen;