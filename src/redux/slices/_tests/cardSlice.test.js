import cardSlice, { pushCard, replenishPile } from "../card/cardSlice";
import { CardFaces, CardSuits } from "../../../constants/cardValues";
import { Players } from "../../../constants/gameStates";

describe("cardSlice reducer tests", () => {
  describe("replenishPile works", () => {
    it("Empty pickup pile, played cards should be put back into deck except last index.", done => {
      const initialState = { deckCards: [], playedCards: [1, 2, 3, 4, 5, 6] };

      const endState = cardSlice(initialState, replenishPile());

      expect(endState.playedCards.length).toBe(1);
      expect(endState.deckCards.length).toBe(5);
      expect(endState.playedCards[0]).toEqual(6);
      done();
    });
    it("Pickup pile not empty", done => {
      const initialState = { deckCards: [1, 2, 3], playedCards: [4, 5, 6] };

      const endState = cardSlice(initialState, replenishPile());

      expect(endState.playedCards.length).toBe(1);
      expect(endState.playedCards[0]).toEqual(6);
      done();
    });
    it("Cards should not be moved when there is only one card available to replenish", done => {
      const initialState = { deckCards: [1, 2, 3], playedCards: [4] };

      const endState = cardSlice(initialState, replenishPile());

      expect(endState.deckCards).toEqual(initialState.deckCards);
      expect(endState.playedCards).toEqual(initialState.playedCards);
      done();
    });
  });
  describe("pushCard works", () => {
    it("Can play a card out of the human's hand", () => {
      // arrange
      const initialState = {
        humanHand: [
          { suit: CardSuits.DIAMONDS, face: CardFaces.K, owner: Players.HUMAN },
          { suit: CardSuits.SPADES, face: CardFaces.Q, owner: Players.HUMAN },
        ],
        playedCards: [{ suit: CardSuits.CLUBS, face: CardFaces[2] }],
      };
      // act
      const endState = cardSlice(
        initialState,
        pushCard({ suit: CardSuits.SPADES, face: CardFaces.Q, owner: Players.HUMAN })
      );

      // assert
      expect(endState.humanHand.length).toEqual(1);
      expect(endState.playedCards.length).toEqual(2);
    });
    it("Can play a card out of the robot's hand", () => {
      // arrange
      const initialState = {
        robotHand: [
          { suit: CardSuits.DIAMONDS, face: CardFaces.K, owner: Players.ROBOT },
          { suit: CardSuits.SPADES, face: CardFaces.Q, owner: Players.ROBOT },
        ],
        playedCards: [{ suit: CardSuits.CLUBS, face: CardFaces[2] }],
      };
      // act
      const endState = cardSlice(
        initialState,
        pushCard({ suit: CardSuits.SPADES, face: CardFaces.Q, owner: Players.ROBOT })
      );

      // assert
      expect(endState.robotHand.length).toEqual(1);
      expect(endState.playedCards.length).toEqual(2);
    });
  });
});
