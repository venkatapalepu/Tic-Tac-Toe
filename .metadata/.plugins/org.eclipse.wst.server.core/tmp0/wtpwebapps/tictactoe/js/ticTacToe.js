var ticTacController = function($scope) {

  $scope.board = [
    [ { value: "." }, { value: "." }, { value: "." } ],
    [ { value: "." }, { value: "." }, { value: "." } ],
    [ { value: "." }, { value: "." }, { value: "." } ]
  ];

  function cell(row, column) {
      return $scope.board[row][column];
  }
  
  // sets the value of cell
  function setCell(row, column, val) {
      $scope.board[row][column].value = val;
  }
  
  $scope.reset = function() {
	  for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
              setCell(i,j,".");
          }
      }
    
    $scope.currentPlayer = 'X';
    $scope.winner = false;
    $scope.nowin = false;
  };
  
  $scope.reset();
  
  $scope.isChosen = function(cell) {
    return cell.value !== '.';
  };
  
  var checkForEndOfGame = function() {
	  
      var empty = false;
      var winner = false;
      var nowin = false;

      // check board for matching values vertically and horizontally
      for (var i = 0; i < 3; i++) {
          if (cell(i, 0).value !='.' && cell(i, 0).value == cell(i, 1).value && cell(i, 1).value == cell(i, 2).value) {
              winner = cell(i, 0).value;
          }
          if (cell(0, i).value !='.' && cell(0, i).value == cell(1, i).value && cell(1, i).value == cell(2, i).value) {
              winner = cell(0, i).value;
          }
      }

      // check board for matching values diagonally 
      if (cell(0, 0).value !='.' && cell(0, 0).value == cell(1, 1).value && cell(1, 1).value == cell(2, 2).value) {
          winner = cell(0, 0).value;
      }
      if (cell(0, 2).value !='.' && cell(0, 2).value == cell(1, 1).value && cell(1, 1).value == cell(2, 0).value) {
          winner = cell(0, 2).value;
      }

   // check board for any empty cell
      for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
              if (cell(i, j).value == '.') {
            	  empty = true;
              }
          }
      }

      // No winner if the board is full
      if (winner) {
          $scope.winner = winner;
      }else if (!empty) {
          $scope.nowin = true;
      }
      
    return $scope.winner||$scope.nowin;
  };
  
  $scope.choose = function(cell) {
    cell.value = $scope.currentPlayer;
    if (!checkForEndOfGame()) {
      $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
    }
  };
};
 