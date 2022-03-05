export const CardFaces = Object.freeze({
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: "J",
  Q: "Q",
  K: "K",
  A: "A",
});

export const CardSuits = Object.freeze({
  HEARTS: "Hearts",
  DIAMONDS: "Diamonds",
  SPADES: "Spades",
  CLUBS: "Clubs",
});

export const skipCards = [CardFaces[4], CardFaces.J];
