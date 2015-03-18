var pieces = {
  Marshall:     { Rank: 1, amount: 1 },
  General:      { Rank: 2, amount: 1 },
  Colonel:      { Rank: 3, amount: 2 },
  Major:        { Rank: 4, amount: 3 },
  Captain:      { Rank: 5, amount: 4 },
  Lieutenant:   { Rank: 6, amount: 4 },
  Sergeant:     { Rank: 7, amount: 4 },
  Miner:        { Rank: 8, amount: 5 },
  Scout:        { Rank: 9, amount: 8 },
  Spy:          { Rank: 'S', amount: 1 },
  Bomb:         { Rank: 'B', amount: 6 },
  Flag:         { Rank: 'F', amount: 1 }
};


function teamArray() {
  var fullTeam = [];
  for (piece in pieces) {
    for (var i=0; i < pieces[piece].amount; i++) {
      fullTeam.push(piece);
    }
  }
  return fullTeam;
}
