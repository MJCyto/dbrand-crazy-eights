import cardSlice, { replenishPile } from "../card/cardSlice";

describe.skip("cardSlice action tests", () => {
  describe("playCard works", () => {
    it("Card of same value is playable", () => {});
    it("Card of same suit is playable", () => {});
    it("Still player's turn when skip is played", () => {});
    it("An 8 should be always playable", () => {});
    it("Should fail when it's not the player's turn", () => {});
    it("Unable to play invalid card", () => {});
  });
});

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
  describe("pushCard works", () => {});
});
