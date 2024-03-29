/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// // return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// window.findNRooksSolution = function(n, board) {
//   var certificate = board ? board : new Board({'n' : n});
//   var rows = certificate.rows();
//   var count = 0;
//   for (var row = 0; row < rows.length; row++) {
//     for (col = 0; col < rows.length; col++) {
//       if (rows[row][col]) {
//         count++;
//         break;
//       }
//       certificate.togglePiece(row,col);
//       if (certificate.hasRowConflictAt(row) || certificate.hasColConflictAt(col)) {
//         certificate.togglePiece(row,col);
//       } else{
//         count++;
//         break;
//       }
//     }
//   }
//   if (count !== n) {
//     return null
//   }
//   //Add a rook on the kth row
//   var solution = certificate.rows(); //fixme

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
// };


var deepCopy = function(oldValue) {
  var newValue;
  strValue = JSON.stringify(oldValue);
  return newValue = JSON.parse(strValue);
}

// // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n,board) {
//   board = board? board : new Board({'n': n});
//   board.rowToAdd = 0;
//   // console.log(board.rows().length)
//   var storage = [board];
//   var solutionCount = 0;
//   var v = 0;
//   while (storage.length) {
//     // console.log("storage now contains: " + storage);
//     // console.log("storage length is: " + storage.length)
//     // console.log(solutionCount)
//     var temp = storage.pop();
//     for (var i = 0; i < n; i++) {
//       var newArr = deepCopy(temp.rows())
//       var temp2 = new Board(newArr);
//       temp2.rowToAdd = temp.rowToAdd + 1;
//       temp2.togglePiece.call(temp2,temp.rowToAdd,i);
//       if (!temp2.hasAnyRooksConflicts()) {

//         if (temp2.rowToAdd === n) {
//           solutionCount++;
//         } else {
//           storage.push(temp2);
//         }
//       }
//     }
//   }


//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n,board) {
  board = board? board : new Board({'n': n});
  board.rowToAdd = 0;
  // console.log(board.rows().length)
  var storage = [board];
  var solutionCount = 0;
  var v = 0;
  while (storage.length && v <100322) {
    // console.log("storage now contains: " + storage);
    // console.log("storage length is: " + storage.length)
    // console.log(solutionCount)
    var temp = storage.pop();
    for (var i = 0; i < n; i++) {
      var newArr = deepCopy(temp.rows())
      var temp2 = new Board(newArr);
      temp2.rowToAdd = temp.rowToAdd + 1;
      temp2.togglePiece.call(temp2,temp.rowToAdd,i);
      if (!temp2.hasAnyQueensConflicts()) {
        if (temp2.rowToAdd === n) {
          console.log('Single solution for ' + n + ' queens:', JSON.stringify(temp2.rows()));
          return temp2.rows();
        } else {
          storage.push(temp2);
        }
      }
    }
    v++;
  }
  return {"n": n};
  };


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n,board) {
  if (n === 0) {
    return 1;
  }
  board = board? board : new Board({'n': n});
  board.rowToAdd = 0;
  board.availableColumns = {0: true, 1: true,}
  // console.log(board.rows().length)
  var storage = [board];
  var solutionCount = 0;
  while (storage.length) {
    // console.log("storage now contains: " + storage);
    // console.log("storage length is: " + storage.length)
    // console.log(solutionCount)
    var temp = storage.pop();
    for (var i = 0; i < n; i++) {
      var newArr = deepCopy(temp.rows())
      var temp2 = new Board(newArr);
      temp2.rowToAdd = temp.rowToAdd + 1;
      temp2.togglePiece.call(temp2,temp.rowToAdd,i);
      if (!temp2.hasRowConflictAt(temp.rowToAdd) && !temp2.hasColConflictAt(i) && !temp2.hasMajorDiagonalConflictAt(i-temp.rowToAdd) && !temp2.hasMinorDiagonalConflictAt(i+temp.rowToAdd)) {
        if (temp2.rowToAdd === n) {
          solutionCount++;
        } else {
          storage.push(temp2);
        }
      }
    }
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var nQueens3 = function(n) {
  var counter = 0;
  //Make a bitwise representation of a filled chessrow e.g. for n = 6, get 111111 in bits
  var fullRow = (1<<n)-1;

  var recurseQ = function(ld,c,rd) {
    var threatened = ld|c|rd;
    var open = ~(threatened) & fullRow;
      //while there are open spaces
      //we place a queen in rightmost open space
      //update the threated columns and diagonals
      //and then recurse for the next row
    while (open > 0) {
      // find rightmost open space in bit
      var rightMost = 1;
      while(!(rightMost & open)){
        rightMost = rightMost << 1;
      }

      //place a queen in rightmost bit, and check off that space from diagonals, columns, and open.
      open = open ^ rightMost;
      var newld = (ld | rightMost) << 1;
      var newrd = (rd | rightMost) >> 1;
      var newc = c | rightMost;
      recurseQ(newld,newc,newrd);
    }
    if(c === fullRow){
      counter++;
    }
  }

  recurseQ(0,0,0);
  return counter;

}
//console.log(nQueens3(4))

window.timeNQueens = function(n,board){
  var start = Date.now();
  var result = nQueens3(n);
  var end = Date.now();
  console.log(result + " solutions were calculated in " + (end - start) + " milliseconds");
}
