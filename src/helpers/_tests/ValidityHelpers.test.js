import { CardFaces, CardSuits } from "../../constants/cardValues";
import Card from "../../domain/Card";
import { checkCardValidity } from "../ValidityHelpers";
import { Players } from "../../constants/gameStates";
import InvalidCardError from "../../domain/error/InvalidCardError";

describe("Validity helpers tests", () => {
  describe("checkCardValidity still works", () => {
    it("CardElement with valid face, suit, no owner needed - shouldn't throw", done => {
      // arrange
      const card = new Card(CardFaces.K, CardSuits.HEARTS);

      // act
      try {
        checkCardValidity(card);
        done();
      } catch (e) {
        // assert
        done.fail("No error should have been thrown - card was valid");
      }
    });
    it("CardElement with valid face, suit, owner needed with owner - shouldn't throw", done => {
      // arrange
      const card = new Card(CardFaces.K, CardSuits.HEARTS, Players.HUMAN);

      // act
      try {
        checkCardValidity(card, true);
        done();
      } catch (e) {
        // assert
        done.fail("No error should have been thrown - card was valid");
      }
    });
    it("CardElement with valid face, suit, no owner, shouldn't have owner - shouldn't throw", done => {
      // arrange
      const card = new Card(CardFaces.K, CardSuits.HEARTS);

      // act
      try {
        checkCardValidity(card, false);
        done();
      } catch (e) {
        // assert
        done.fail("No error should have been thrown - card was valid");
      }
    });
    it("CardElement with valid face, suit, no owner, should have owner - should throw", done => {
      // arrange
      const card = new Card(CardFaces.K, CardSuits.HEARTS);

      // act
      try {
        checkCardValidity(card, true);
        done.fail("Should have thrown by now");
      } catch (e) {
        // assert
        expect(e).toBeInstanceOf(InvalidCardError);
      }
      done();
    });
    it("CardElement with valid face, suit, owner, shouldn't have owner - should throw", done => {
      // arrange
      const card = new Card(CardFaces.K, CardSuits.HEARTS, Players.HUMAN);

      // act
      try {
        checkCardValidity(card, false);
        done.fail("Should have thrown by now");
      } catch (e) {
        // assert
        expect(e).toBeInstanceOf(InvalidCardError);
      }
      done();
    });
    it("CardElement with invalid face - should throw", done => {
      // arrange
      const card = new Card("Not a real face", CardSuits.HEARTS);

      // act
      try {
        checkCardValidity(card);
        done.fail("Should have thrown by now");
      } catch (e) {
        // assert
        expect(e).toBeInstanceOf(InvalidCardError);
      }
      done();
    });
    it("CardElement with invalid suit - should throw", done => {
      // arrange
      const card = new Card(CardFaces.K, "Invalid suit");

      // act
      try {
        checkCardValidity(card);
        done.fail("Should have thrown by now");
      } catch (e) {
        // assert
        expect(e).toBeInstanceOf(InvalidCardError);
      }
      done();
    });
  });
});
