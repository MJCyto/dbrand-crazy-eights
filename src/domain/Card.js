import { CardFaces, SkipCards } from "../constants/cardValues";

class Card {
  constructor(face, suit, owner) {
    if (!(face && suit)) {
      throw new Error("A card must have a face and suit.");
    }
    this.face = face;
    this.suit = suit;
    // Face and suit are write only due to overriding their sets to avoid mutation. Callback getters used so the
    // values can still be accessed.

    this.owner = owner;
  }

  get isASkip() {
    return SkipCards.includes(this.face);
  }
  //
  checkIfPlayable(cardInPlay) {
    const thisFace = this.face;
    const thisSuit = this.suit;
    return (
      thisFace === CardFaces[8] || thisSuit === cardInPlay.suit || thisFace === cardInPlay.face
    );
  }

  // Override face and suit setters for base card info since they shouldn't be editable
  // set face(f) {
  //   console.error("Tried setting a card's face value, this can lead to unexpected behavior.");
  // }
  //
  // set suit(s) {
  //   console.error("Tried setting a card's suit, this can lead to unexpected behavior.");
  // }
  //

  clearOwner() {
    this.owner = undefined;
  }

  toJSON() {
    return { face: this.face, suit: this.suit, owner: this.owner };
  }
}

export default Card;
