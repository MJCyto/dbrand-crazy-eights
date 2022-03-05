import { CardFaces, CardSuits } from "../../constants/cardValues";
import Card from "../Card";
import { Players } from "../../constants/gameStates";

describe("Card class object behaves correctly", () => {
  describe("isASkip still works", () => {
    it("A Jack should be a skip card", () => {
      // arrange
      const [face, suit, player] = [CardFaces.J, CardSuits.CLUBS, Players.HUMAN];

      // act
      const card = new Card(face, suit, player);

      // assert
      expect(card.isASkip).toBeTruthy();
    });
    it("A Jack should be a skip card", () => {
      // arrange
      const [face, suit, player] = [CardFaces[4], CardSuits.CLUBS, Players.HUMAN];

      // act
      const card = new Card(face, suit, player);

      // assert
      expect(card.isASkip).toBeTruthy();
    });
  });
  describe("checkIfPlayable still works", () => {
    it("Same face, should be true", () => {
      // arrange
      const cardInPlay = new Card(CardFaces.K, CardSuits.CLUBS); // The one on the top of the played card pile
      const cardToPlay = new Card(CardFaces.K, CardSuits.HEARTS); // A card to be chosen by a player

      // act
      const isPlayable = cardToPlay.checkIfPlayable(cardInPlay);

      // assert
      expect(isPlayable).toBeTruthy();
    });
    it("Same suit, should be true", () => {
      // arrange
      const cardInPlay = new Card(CardFaces.A, CardSuits.CLUBS);
      const cardToPlay = new Card(CardFaces.K, CardSuits.CLUBS);

      // act
      const isPlayable = cardToPlay.checkIfPlayable(cardInPlay);

      // assert
      expect(isPlayable).toBeTruthy();
    });
    it("8 should always be true", () => {
      // arrange
      const cardInPlay = new Card(CardFaces.K, CardSuits.CLUBS);
      const cardToPlay = new Card(CardFaces[8], CardSuits.HEARTS);

      // act
      const isPlayable = cardToPlay.checkIfPlayable(cardInPlay);

      // assert
      expect(isPlayable).toBeTruthy();
    });
    it("Different face and suit, should be false", () => {
      // arrange
      const cardInPlay = new Card(CardFaces.K, CardSuits.CLUBS);
      const cardToPlay = new Card(CardFaces[3], CardSuits.HEARTS);

      // act
      const isPlayable = cardToPlay.checkIfPlayable(cardInPlay);

      // assert
      expect(isPlayable).toBeFalsy();
    });
  });
});
