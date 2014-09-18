/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n, board) {
  var certificate = board ? board : new Board({'n' : n});
  var rows = certificate.rows();
  var count = 0;
  for (var row = 0; row < rows.length; row++) {
    for (col = 0; col < rows.length; col++) {
      if (rows[row][col]) {
        count++;
        break;
      }
      certificate.togglePiece(row,col);
      if (certificate.hasRowConflictAt(row) || certificate.hasColConflictAt(col)) {
        certificate.togglePiece(row,col);
      } else{
        count++;
        break;
      }
    }
  }
  if (count !== n) {
    return null
  }
  //Add a rook on the kth row
  var solution = certificate.rows(); //fixme

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n,board) {
  board = board? board : new Board({'n': n});
  board.rowToAdd = 0;
  console.log(board.rows().length)
  var storage = [board];
  var solutionCount = 0;
  while (storage.length) {
    console.log("storage now contains: " + storage);
    console.log("storage length is: " + storage.length)
    var temp = storage.shift();
    for (var i = 0; i < n; i++) {
      var temp2 = new Board(temp.rows());
      console.log("temp is" + temp.rows()[0]);
      console.log("temp2 is" + temp2.rows()[0]);
      temp2.rowToAdd = temp.rowToAdd + 1;
      temp2.togglePiece.call(temp2,temp.rowToAdd,i);
      console.log(temp.rows()[0])
      //  if(i === 1){debugger}

      if (!temp2.hasAnyRooksConflicts()) {
        console.log(temp2.rows()[0])
        console.log(temp2.rows()[1])
        if (temp2.rowToAdd === n) {
          console.log("activated!")
          solutionCount++;
        } else {
          storage.push(temp2);
        }
      } else {
        temp2.togglePiece.call(temp2,temp.rowToAdd,i);
      }
    }
  }


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
