$(function() {
  var row = '';
  for (var y=0; y<10; y++) {
    row = $('<div class="row"></div>');
    row.append('<div class="col-md-1 blank"></div>');
    for (var x=0; x<10; x++) {
      row.append($('<div id="' + y + x + '" class="col-md-1 gameSpace"></div>'));
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
  console.log(team);
  setupBoard(team);




  $('.orange').on('click', function() {
    console.log(this.id);
    console.log(this.textContent);
    $('.orange').removeClass('highlight');
    $(this).toggleClass('highlight');
  });

  function setupBoard(team) {
    var top40 = setTeamBounds(0);
    var bottom40 = setTeamBounds(60);
    console.log(top40);
    console.log(bottom40);
    initializeMapTeams(team, top40, 'green');
    initializeMapTeams(team, bottom40, 'orange');
  }

  function setTeamBounds(start) {
    var tempArray = [];
    for (var a=start; a<start+40; a++) {
      if (a < 10)
        tempArray.push('0'+a);
      else
        tempArray.push(a.toString());
    }
    return tempArray;
  }

  function initializeMapTeams(teamUnitsArr, teamSpaceIds, color) {
    for (var i=0; i<teamUnitsArr.length; i++) {
      var index = Math.floor(Math.random() * (teamUnitsArr.length - i));
      $('#'+teamSpaceIds[index]).text(teamUnitsArr[i]);
      $('#'+teamSpaceIds[index]).addClass(color);
      teamSpaceIds.splice(index, 1);
    }
  }

});
