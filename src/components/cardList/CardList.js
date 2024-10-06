import React, { useEffect, useRef, useState } from 'react';
import styles from './CardList.module.css';
import PreviewCard from '../previewCard/PreviewCard';
import arrowImage from '../../resources/small-arrow.png'

function CardList(props) {
  const [displayableCards, setDisplayableCards] = useState(props.cards);
  const cardContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const defaultCardWidth = 250;
  const defaultCardMargin = 20;
  let cardWidth, cardLeftMargin, cardRightMargin;

  // Calculates how many cards can fit in the list without any of them overflowing
  const calcMaxDisplayableCards = () => {
    const cardContainer = cardContainerRef.current;

    if (!cardContainer) {
      return -1;
    }

    const listWidth = Math.round(cardContainer.getBoundingClientRect().width);

    let remainingWidth = listWidth - cardLeftMargin; // Only subtract left margin from the first card
    let fitableCards = 0;

    // Iterate through all the cards and count how many can fit
    while (remainingWidth >= (cardWidth + cardLeftMargin + cardRightMargin)) {
      remainingWidth -= (cardWidth + cardRightMargin + cardLeftMargin);
      fitableCards++;
    }

    return fitableCards;
  };

  const updateDisplayableCards = () => {
    const previousAmmount = displayableCards.length;
    const newAmmount = calcMaxDisplayableCards();

    if (newAmmount < 0) {
      return;
    }

    if (newAmmount !== previousAmmount) {
      setDisplayableCards(props.cards.slice(0, newAmmount));
    }

    // If the previous and new amount are the same, we don't need to update the cards
  };

  useEffect(() => {
    const card = cardRefs[0];

    if (!card) {
      cardWidth = defaultCardWidth;
      cardLeftMargin = defaultCardMargin;
      cardRightMargin = defaultCardMargin;
    }
    else {
      cardWidth = Math.round(card.current.getBoundingClientRect().width);
      cardLeftMargin = Math.round(parseInt(window.getComputedStyle(card.current).getPropertyValue('margin-left').replace('px', '')));
      cardRightMargin = Math.round(parseInt(window.getComputedStyle(card.current).getPropertyValue('margin-right').replace('px', '')));
    }

    updateDisplayableCards();

    window.addEventListener('resize', updateDisplayableCards);

    // Clear listener on component unmount
    return () => {
      window.removeEventListener('resize', updateDisplayableCards);
    };
  }, []);

  return (
    <div className={styles['main-wrapper']}>
      <div className={styles['top-section']}>
        <h4 className={styles['main-header']}>{props.listHeader}</h4>
        <a style={{ display: displayableCards.length === 0 ? 'none' : 'flex' }} className={styles['link']} href={props.listLinkHref}>
          <p className={styles['link-text']}>{props.listLinkName}</p>
          <img className={styles['link-img']} src={arrowImage} alt="arrow" />
        </a>
      </div>
      {displayableCards.length === 0 ? (
        <p className={styles['empty-list-text']}>{props.emptyListText}</p>
      )
        :
        (<div ref={cardContainerRef} className={styles['card-container']}>
          {displayableCards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)} // Set refference for each card
              className={styles['card-wrapper']}
            >
              <PreviewCard
                image={card.image}
                ratingValue={card.ratingValue}
                ratingAmmount={card.ratingAmmount}
                recipeName={card.recipeName}
                missingIngredientsArray={card.missingIngredientsArray}
                difficulty={card.difficulty}
                time={card.time}
                authorId={card.authorId}
                authorName={card.authorName}
                displayAuthor={!(props.currentAuthorId === card.authorId)}
              />
            </div>
          ))}
        </div>)}

    </div>
  );
}

export default CardList;
