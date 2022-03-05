export class Card {
  constructor(face, suit) {
    if (!(face && suit)) {
      throw new Error("A card must have a face and suit.");
    }
    this.face = face;
    this.suit = suit;
  }
}
