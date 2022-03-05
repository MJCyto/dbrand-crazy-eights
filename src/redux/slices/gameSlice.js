import { createSlice, createAction } from "@reduxjs/toolkit";
import { CardFaces, CardSuits } from "../../constants/cardValues";
import { Card } from "../../domain/Card";
import { shuffle } from "lodash";

export const initGame = createAction("game/init", (numCards, setEnemyCards, setDeck) => {
    let allCards = [];
    // Make all cards given there is a card for every combination of suit X face.
    Object.keys(CardSuits).forEach(suit => {
        Object.values(CardFaces).forEach(face => {
            allCards.push(new Card(face, suit));
        });
    });

    allCards = shuffle(allCards);
    setEnemyCards(allCards.splice(0, numCards));

    return { payload: { playerCards: allCards.splice(0, numCards), deckCards: allCards } };
});

// For the player's moves
export const playCard = createAction("game/", card => {});

const initialState = Object.freeze({
    playerCards: [],
    deckCards: [],
    playedCards: [],
});

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        replenishPile: state => {
            if (state.playedCards <= 1) {
                return;
            }

            let cardsToMove = state.playedCards.splice(0, state.playedCards.length - 1);
            state.deckCards = [...shuffle(cardsToMove), ...state.deckCards];
        },
        // For the enemies moves, since we're using context for the enemy cards
        pushCard: () => {},
    },
    extraReducers: builder => {
        builder.addCase(initGame, (state, action) => {
            const { playerCards, deckCards } = action.payload;
            state.playerCards = playerCards;
            state.deckCards = deckCards;
        });
    },
});

export const { replenishPile } = gameSlice.actions;

export default gameSlice.reducer;
