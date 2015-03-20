var pieces = {
  Marshall:     { rank: 1, amount: 1 },
  General:      { rank: 2, amount: 1 },
  Colonel:      { rank: 3, amount: 2 },
  Major:        { rank: 4, amount: 3 },
  Captain:      { rank: 5, amount: 4 },
  Lieutenant:   { rank: 6, amount: 4 },
  Sergeant:     { rank: 7, amount: 4 },
  Miner:        { rank: 8, amount: 5 },
  Scout:        { rank: 9, amount: 8 },
  Spy:          { rank: 'S', amount: 1 },
  Bomb:         { rank: 'B', amount: 6 },
  Flag:         { rank: 'F', amount: 1 }
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
