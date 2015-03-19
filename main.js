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
  $('#42').addClass('river');
  $('#43').addClass('river');
  $('#52').addClass('river');
  $('#53').addClass('river');

  $('#46').addClass('river');
  $('#47').addClass('river');
  $('#56').addClass('river');
  $('#57').addClass('river');

  var team = teamArray();
  // console.log(team);
  setupBoard(team);


  $('.green').addClass('notPlayersTurn');


  $('.orange').on('click', function() {
    if ($(this).attr('class').split(' ').indexOf('notPlayersTurn') === -1) {
      // console.log(this.id);
      // console.log(this.textContent);
      $('.orange').removeClass('highlight');
      $(this).toggleClass('highlight');
      highlightPossibleMoves(this);
      // $('.green').toggleClass('notPlayersTurn');
      // $('.orange').toggleClass('notPlayersTurn');
      // $(this).toggleClass('highlight');
    }
  });

  $('.green').on('click', function() {
    if ($(this).attr('class').split(' ').indexOf('notPlayersTurn') === -1) {
      // console.log(this.id);
      // console.log(this.textContent);
      $('.green').removeClass('highlight');
      $(this).toggleClass('highlight');
      highlightPossibleMoves(this);
      // $('.orange').toggleClass('notPlayersTurn');
      // $('.green').toggleClass('notPlayersTurn');
      // $(this).toggleClass('highlight');
    }
  });

  // This is the second user click - clicking where they are moving
  $('.gameSpace').on('click', function() {
    // should check if player clicks on a canMoveTo highlighted piece
    if ($(this).hasClass('canMoveTo')) {
      $('.highlight').removeClass('highlight');
      $('.canMoveTo').removeClass('canMoveTo');
      // if ($(this).attr('class').split(' ').indexOf('river') === -1)// && $('.gameSpace').attr('class').split(') {
      //   ;
      // }
    // Switching turns
      if (currentPlayer === 'orange') {
        currentPlayer = 'green';
        $('.green').removeClass('notPlayersTurn');
        $('.orange').addClass('notPlayersTurn');
      } else {
        currentPlayer = 'orange';
        $('.orange').removeClass('notPlayersTurn');
        $('.green').addClass('notPlayersTurn');
      }
    }
  });

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

      if (!(selectedId.slice(-1) === '9') && !$('#'+(selectedIntId+1)).hasClass(currentPlayer))
        $('#'+(selectedIntId+1)).addClass('canMoveTo');
      if (!(selectedId.slice(-1) === '0') && !$('#'+(selectedIntId-1)).hasClass(currentPlayer))
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
