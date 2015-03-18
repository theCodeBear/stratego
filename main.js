angular.module('stratego', [])

.controller('game', ['$scope', function($scope) {

  var row = '';
  var grid = [];
  for (var y=0; y<10; y++) {
    row = $('<div class="row"></div>');
    row.append('<div class="col-md-1 blank"></div>');
    for (var x=0; x<10; x++) {
      row.append($('<div id="' + y + x + '" class="col-md-1 gameSpace">'+y+x+'</div>'));
    }
    // row.append('<div class="col-md-offset-1"></div>');
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
}]);
