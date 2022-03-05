import { CardFaces, SkipCards } from "../constants/cardValues";

class Card {
  constructor(face, suit, owner) {
    if (!(face && suit)) {
      throw new Error("A card must have a face and suit.");
    }
    this.face = face;
    this.suit = suit;
    this.owner = owner;
  }
}

export default Card;
