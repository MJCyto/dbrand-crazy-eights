import { CardFaces, SkipCards } from "../constants/cardValues";

class Card {
  constructor(face, suit, owner) {
    if (!(face && suit)) {
      throw new Error("A card must have a face and suit.");
    }
    // Face and suit are write only due to overriding their sets to avoid mutation. Callback getters used so the
    // values can still be accessed.
    this.getFace = () => face;
    this.getSuit = () => suit;

    this.owner = owner;
  }

  get isASkip() {
    return SkipCards.includes(this.getFace());
  }

  checkIfPlayable(cardInPlay) {
    const thisFace = this.getFace();
    const thisSuit = this.getSuit();
    return (
      thisFace === CardFaces[8] ||
      thisSuit === cardInPlay.getSuit() ||
      thisFace === cardInPlay.getFace()
    );
  }

  // Override face and suit setters for base card info since they shouldn't be editable
  set face(f) {
    console.error("Tried setting a card's face value, this can lead to unexpected behavior.");
  }

  set suit(s) {
    console.error("Tried setting a card's suit, this can lead to unexpected behavior.");
  }

  get face() {
    return this.getFace();
  }

  get suit() {
    return this.getSuit();
  }

  clearOwner() {
    this.owner = undefined;
  }
}

export default Card;
