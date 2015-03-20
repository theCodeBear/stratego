$(function() {
  var currentPlayer = 'orange';
  var currentHighlight = '';
  var row = '';
  for (var y=0; y<10; y++) {
    row = $('<div class="row"></div>');
    row.append('<div class="col-md-1 blank"></div>');
    for (var x=0; x<10; x++) {
      row.append($('<div id="' + (y===0 ? '' : y) + x + '" class="col-md-1 gameSpace"></div>'));
    }
    $('#gameboard').append(row);
  }
  // left river
  $('#42').addClass('river');
  $('#43').addClass('river');
  $('#52').addClass('river');
  $('#53').addClass('river');
  // right river
  $('#46').addClass('river');
  $('#47').addClass('river');
  $('#56').addClass('river');
  $('#57').addClass('river');

  var team = teamArray();
  setupBoard(team);


  $('.green').addClass('notPlayersTurn');


  $('.orange').on('click', move);
  $('.green').on('click', move);
  $('.gameSpace').on('click', chooseMove);

  function move() {
    if ($(this).attr('class').split(' ').indexOf('notPlayersTurn') === -1) {
      $('.' + currentPlayer).removeClass('highlight');
      $(this).toggleClass('highlight');
      highlightPossibleMoves(this);
    }
  }

  // This is the second user click - clicking where they are moving
  function chooseMove() {
    // should check if player clicks on a canMoveTo highlighted piece
    if ($(this).hasClass('canMoveTo')) {
    // Switching turns
      if (currentPlayer === 'orange') {
        switchTurns(this, 'green');
      } else {
        switchTurns(this, 'orange');
      }
    }
  };

  // Takes the space the player is moving to. Switch turns for the player and
  // initialize the click-move functionality for the unit's new space
  function switchTurns(piece, nextPlayer) {
    movePiece(piece);
    $('.' + currentPlayer).addClass('notPlayersTurn');
    $('.' + nextPlayer).removeClass('notPlayersTurn');
    currentPlayer = nextPlayer;
    $(piece).on('click', move);
  }

  // Takes selected space to move to, uses highlighted piece to make move
  function movePiece(moveSpace) {
    var pieceToMove = $('.highlight');
    var pieceName = transferPieceData($('.highlight'), moveSpace);
    $(moveSpace).addClass(currentPlayer);
    $(moveSpace).html(pieceName);
    $('.highlight').removeClass('highlight');
    $('.canMoveTo').removeClass('canMoveTo');
    // $(moveSpace).on('click', move);
  }

  // Takes the piece that will be moved, strips its class off and transfers its text content
  // to the new gameboard space. If there is an opposing player there then battle() is called.
  function transferPieceData(movingPiece, spaceMovingTo) {
    var battleResult = '';
    // if ($(spaceMovingTo).hasClass('notPlayersTurn')) {
    //   battleResult = battle(piece, spaceMovingTo);
    // }
    movingPiece.removeClass(currentPlayer);
    // if (battleResult === 'attacker') {

    // }
    var pieceName = movingPiece.html();
    movingPiece.html('');
    $(movingPiece).off('click', move);
    return pieceName;
  }

  // takes attacker and defender objects, return 'attacker' if attacker wins,
  // 'defender' if defender wins, 'both' if both die, and 'win' if attacker found the flag.
  // function battle(attacker, defender) {
  //   console.log($(defender).text());
  //   console.log($(attacker).text());
  //   console.log('NAME: ', $(attacker).html());
  //   var attackerRank = pieces[$(attacker).text()].rank;
  //   var defenderRank = pieces[$(defender).text()].rank;
  //   console.log(attackerRank);
  //   console.log(defenderRank);

  //   // bomb battle
  //   if (defenderRank === 'B') {
  //     if (attackerRank === 8)
  //       return 'attacker';
  //     else
  //       return 'defender';
  //   }

  //   // spy battle
  //   if (attackerRank === 'S' || defenderRank === 'S') {
  //     return spyBattle(attackerRank, defenderRank);
  //   }

  //   // grab flag
  //   if (defenderRank === 'F')
  //     return 'win';

  //   // battles between numerical ranked units
  //   if (attackerRank > defenderRank)
  //     return 'attacker';
  //   else if (attackerRank < defenderRank)
  //     return 'defender';
  //   else if (attackerRank === defenderRank)
  //     return 'both';
  // }


  // Handle if one or both of the participants of a battle is a spy
  function spyBattle(attackerRank, defenderRank) {
    if (attackerRank === 'S' && defenderRank === 'S')
      return 'both';
    else if (defenderRank === 1)
      return 'attacker';
    else if (defenderRank === 'S')
      return 'attacker';
    else if (attackerRank === 'S')
      return 'defender';
    else
      console.log('UNFORESEEN SITUATION IN SPY BATTLE');
  }

  function highlightPossibleMoves(selectedDiv) {
    if (selectedDiv.textContent === 'Scout') {
      $('.gameSpace').removeClass('canMoveTo');
      scoutMoveHighlighting(selectedDiv, -1);
      scoutMoveHighlighting(selectedDiv, 1);
      scoutMoveHighlighting(selectedDiv, -10);
      scoutMoveHighlighting(selectedDiv, 10);
    } else if (selectedDiv.textContent === 'Bomb' || selectedDiv.textContent === 'Flag') {
      $('.gameSpace').removeClass('canMoveTo');
    } else {
      $('.gameSpace').removeClass('canMoveTo');
      var selectedId = selectedDiv.id;
      var selectedIntId = parseInt(selectedId);

      if (!(selectedId.slice(-1) === '9') && !$('#'+(selectedIntId+1)).hasClass(currentPlayer) && !$('#'+(selectedIntId-1)).hasClass('river'))
        $('#'+(selectedIntId+1)).addClass('canMoveTo');
      if (!(selectedId.slice(-1) === '0') && !$('#'+(selectedIntId-1)).hasClass(currentPlayer) && !$('#'+(selectedIntId+1)).hasClass('river'))
        $('#'+(selectedIntId-1)).addClass('canMoveTo');
      if (!$('#'+(selectedIntId-10)).hasClass(currentPlayer) && !$('#'+(selectedIntId-10)).hasClass('river'))
        $('#'+(selectedIntId-10)).addClass('canMoveTo');
      if (!$('#'+(selectedIntId+10)).hasClass(currentPlayer) && !$('#'+(selectedIntId+10)).hasClass('river'))
        $('#'+(selectedIntId+10)).addClass('canMoveTo');
    }
  }

  function scoutMoveHighlighting(selectedDiv, singleMove) {
    var selectedIntId = parseInt(selectedDiv.id);
    var canMove = true;
    var move = singleMove;
    var possibleMoveId = 0;
    do {
      possibleMoveId = selectedIntId + move;
      if ((singleMove === -1 || singleMove === 1)) {
        if (possibleMoveId.toString().slice(-1) === '9' || possibleMoveId.toString().slice(-1) === '0') {
          canMove = false;
          break;
        }
      }
      canMove = scoutStopConditions(possibleMoveId);
      if (canMove)
        $('#'+(selectedIntId+move)).addClass('canMoveTo');
      move += singleMove;
      if (selectedIntId+move < 0 || selectedIntId+move > 99)
        canMove = false;
    } while (canMove === true);
  }

  function scoutStopConditions(possibleMoveId) {
    if ($('#'+possibleMoveId).hasClass('notPlayersTurn')) {
      $('#'+possibleMoveId).addClass('canMoveTo')
      return false;
    }
    if ($('#'+possibleMoveId).hasClass('river') || $('#'+possibleMoveId).hasClass(currentPlayer))
      return false;
    return true;
  }


  function setupBoard(team) {
    var top40 = setTeamBounds(0);
    var bottom40 = setTeamBounds(60);
    // console.log(top40);
    // console.log(bottom40);
    initializeMapTeams(team, top40, 'green');
    initializeMapTeams(team, bottom40, 'orange');
  }

  function setTeamBounds(start) {
    var tempArray = [];
    for (var a=start; a<start+40; a++) {
      tempArray.push(a.toString());
    }
    return tempArray;
  }

  function initializeMapTeams(teamUnitsArr, teamSpaceIds, color) {
    for (var i=0; i<teamUnitsArr.length; i++) {
      var index = Math.floor(Math.random() * (teamUnitsArr.length - i));
      $('#'+teamSpaceIds[index]).html(teamUnitsArr[i]);
      $('#'+teamSpaceIds[index]).addClass(color);
      teamSpaceIds.splice(index, 1);
    }
  }

});
