import { CardFaces } from "../constants/cardValues";

class Card {
  constructor(face, suit, owner) {
    if (!(face && suit && owner)) {
      throw new Error("A card must have a face, suit and owner.");
    }
    this.face = face;
    this.suit = suit;
    this.owner = owner;
  }

  get isASkip() {
    return this.face === CardFaces.J || this.face === CardFaces[4];
  }
}

export default Card;
