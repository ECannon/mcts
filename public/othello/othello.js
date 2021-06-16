class OthelloState {
    constructor(){
      this.playerJustMoved = 2;
      this.board = [[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 2, 1, 0, 0, 0],
                    [0, 0, 0, 1, 2, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]];
        
    }


    clone(){
      var st = new OthelloState();
      st.playerJustMoved = this.playerJustMoved;
      for(var i = 0; i < this.board.length; i++){
        st.board[i] = [];
        for(var j = 0; j < this.board[i].length; j++){
          st.board[i].push(this.board[i][j]);

        }
      }
      return st;
    }

    doMove(move){
      var x = move[0];
      var y = move[1];
      var m = this.getAllSandwichedCounters(x,y)
      this.playerJustMoved = 3 - this.playerJustMoved;
      this.board[x][y] = this.playerJustMoved;

      for(var i = 0; i < m.length; i++){
        var elem = m[i];
        this.board[elem[0]][elem[1]] = this.playerJustMoved;

      }


      // m.forEach(elem => {
      //   this.board[elem[0]][elem[1]] = this.playerJustMoved;
      // });

    }

    isMoveAvailable(move){

      var Possiblemoves = JSON.stringify(this.getMoves());
      var move = JSON.stringify([parseInt(move[0]), parseInt(move[1])]);

      return Possiblemoves.includes(move)


      // if(Possiblemoves.includes(move)){

      //   cell.style.backgroundColor = "red";
      // }

      // return this.board[move[0]][move[1]] == 0;
    }

    getMoves(){
      var ret = new Array();

      for(var i = 0; i < this.board.length; i++){
        for(var j = 0; j < this.board[i].length; j++){
          if((this.board[i][j] == 0) && (this.existsSandwichedCounter(i,j) == true)){
            ret.push([i,j])
          }
        }
      }
      return ret;
    }


    // AdjacentToEnemy(x,y){
    //   var es = new Array();
    //   var temp = [[0,+1],[+1,+1],[+1,0],[+1,-1],[0,-1],[-1,-1],[-1,0],[-1,+1]];
    //   temp.forEach(elem => {
    //     if(this.isOnBoard(x+elem[0], y+elem[y]) && this.board[x+elem[0]][y+elem[y]] == this.playerJustMoved){
    //       return true;
    //     }
    //   });

    //   return false;
    // }

    adjacentEnemyDirections(x, y){
      var es = new Array();
      var temp = [[0,+1],[+1,+1],[+1,0],[+1,-1],[0,-1],[-1,-1],[-1,0],[-1,+1]];

      // for(var i = 0; i < temp.length; i++){

      //   var temp1 = temp[i]

      //   if(this.isOnBoard(parseInt(x)+parseInt(elem[0]), parseInt(y)+parseInt(elem[1])) && this.board[parseInt(x)+parseInt(elem[0])][parseInt(y)+parseInt(elem[1])] == this.playerJustMoved){
      //     es.push(temp[i])
      //   }



      // }

      temp.forEach(elem => {
        if(this.isOnBoard(parseInt(x)+parseInt(elem[0]), parseInt(y)+parseInt(elem[1])) && this.board[parseInt(x)+parseInt(elem[0])][parseInt(y)+parseInt(elem[1])] == this.playerJustMoved){
          es.push(elem);
        }
      });
      return es;
    }

    existsSandwichedCounter(x,y){
      var adj = this.adjacentEnemyDirections(x,y);
      for(var i = 0; i < adj.length; i++){
        var elem = adj[i];
        if(this.sandwichedCounters(x,y,elem[0],elem[1]).length > 0){
          // console.log(x +", " +y);
          return true;
        }
      }
      return false;

      // this.adjacentEnemyDirections(x,y).forEach(elem => {
      //   if(this.sandwichedCounters(x,y,elem[0],elem[1]).length > 0){
      //     console.log(x +", " +y);
      //     return true;
      //   }
      // });
      // return false;
    }

    getAllSandwichedCounters(x, y){
        var sandwiched = new Array();
        var iter = this.adjacentEnemyDirections(x,y);

        for(var i = 0; i < iter.length; i++){
          var elem = iter[i];
          var sCounters = this.sandwichedCounters(x,y,elem[0],elem[1]);
          for(var j = 0; j < sCounters.length; j++){
            sandwiched.push(sCounters[j]);
          }

          // sandwiched.concat(this.sandwichedCounters(x,y,elem[0],elem[1]));
        }

        // this.adjacentEnemyDirections(x, y).forEach(elem => {
        //   sandwiched.concat(this.sandwichedCounters(x,y,elem[0],elem[1]))
        // });

        return sandwiched;

    }

    sandwichedCounters(x, y, dx, dy) {
      x = parseInt(x)+dx;
      y = parseInt(y)+dy;
      var sandwiched = new Array();

      while(this.isOnBoard(x,y) && this.board[x][y] == this.playerJustMoved){
        var temp = [x,y];
        sandwiched.push(temp);
        x = parseInt(x)+dx;
        y = parseInt(y)+dy;
      }
      if(this.isOnBoard(x,y) && this.board[x][y] == 3-this.playerJustMoved){
        return sandwiched;
      }else{
        return new Array();
      }
    }

    isOnBoard(x, y){
      return ((x>=0) && (x < this.board.length) && (y >= 0) && (y < this.board.length));
    }

    // isGameOver(playerjm){
    //     var row_count = 6;
    //     var column_count = 7;
  
    //       //Check vertically
    //       for(var r = 0; r < row_count-3; r++){
    //         for(var c = 0; c < column_count; c++){
    //           if(this.board[r][c] == playerjm && this.board[r + 1][c] == playerjm && this.board[r + 2][c] == playerjm && this.board[r+3][c] == playerjm && this.board[r][c] != 0){
    //             return true;
    //           }
    //         }
    //       }
  
    //       //Check horizontally
    //       for(var r = 0; r < row_count; r++){
    //         for(var c = 0; c < column_count-3; c++){
    //           if(this.board[r][c] == playerjm && this.board[r][c+1] == playerjm && this.board[r][c+2] == playerjm && this.board[r][c+3] == playerjm && this.board[r][c] != 0){
    //             return true;
    //           }
    //         }
    //       }
  
    //       //Check diagonally upward
    //       for(var r = 0; r < row_count-3; r++){
    //         for(var c = 0; c < column_count-3; c++){
    //           if(this.board[r][c] == playerjm && this.board[r+1][c+1] == playerjm && this.board[r+2][c+2] == playerjm && this.board[r+3][c+3] == playerjm && this.board[r][c] != 0){
    //             return true;
    //           }
    //         }
    //       }
  
    //       //Check diagonally downward
    //       for(var r = 3; r < row_count; r++){
    //         for(var c = 0; c < column_count-3; c++){
    //           if(this.board[r][c] == playerjm && this.board[r-1][c+1] == playerjm && this.board[r-2][c+2] == playerjm && this.board[r-3][c+3] == playerjm && this.board[r][c] != 0){
    //             return true;
    //           }
    //         }
    //       }
  
    //       return false;
    //   }

    
    // winner(playerjm){
    //   var row_count = 6;
    //   var column_count = 7;

    //     //Check vertically
    //     for(var r = 0; r < row_count-3; r++){
    //       for(var c = 0; c < column_count; c++){
    //         if(this.board[r][c] == playerjm && this.board[r + 1][c] == playerjm && this.board[r + 2][c] == playerjm && this.board[r+3][c] == playerjm){
    //           return true;
    //         }
    //       }
    //     }

    //     //Check horizontally
    //     for(var r = 0; r < row_count; r++){
    //       for(var c = 0; c < column_count-3; c++){
    //         if(this.board[r][c] == playerjm && this.board[r][c+1] == playerjm && this.board[r][c+2] == playerjm && this.board[r][c+3] == playerjm){
    //           return true;
    //         }
    //       }
    //     }

    //     //Check diagonally upward
    //     for(var r = 0; r < row_count-3; r++){
    //       for(var c = 0; c < column_count-3; c++){
    //         if(this.board[r][c] == playerjm && this.board[r+1][c+1] == playerjm && this.board[r+2][c+2] == playerjm && this.board[r+3][c+3] == playerjm){
    //           return true;
    //         }
    //       }
    //     }

    //     //Check diagonally downward
    //     for(var r = 3; r < row_count; r++){
    //       for(var c = 0; c < column_count-3; c++){
    //         if(this.board[r][c] == playerjm && this.board[r-1][c+1] == playerjm && this.board[r-2][c+2] == playerjm && this.board[r-3][c+3] == playerjm){
    //           return true;
    //         }
    //       }
    //     }

    //     return false;
    // }

    GetResult(playerjm){
      var jmCount = 0;
      var notJmCount = 0;
      for(var i = 0; i < this.board.length; i++){
        for(var j = 0; j < this.board[i].length; j++){
          if(this.board[i][j] == playerjm){
            jmCount++;
          } else {
            notJmCount++;
          }
        }
      }

      if(jmCount > notJmCount) return 1.0;
      else if (notJmCount > jmCount) return 0.0;
      else return 0.5;

    }


    // draw(){
    //   return (this.getMoves().length == 0 && !this.winner(this.playerJustMoved) && !this.winner(3-this.playerJustMoved))
    // }

    printBoard(){
        for(var i = 0; i < this.board.length; i++){
            console.log(this.board[i])
        }
        console.log('\n');

    }
    
}

class Node {
    constructor(move, parent, state){
      this.move = move;
      this.parent = parent;
      this.childNodes = [];
      this.wins = 0;
      this.visits = 0;
      this.untriedMoves = state.getMoves();
      this.playerJustMoved = state.playerJustMoved;
    }
  
    uctSelectChild(){
      var x = this;
      var nm = this.visits;
      this.childNodes.sort(function(a,b)
      {
        let first = a.wins/a.visits + Math.sqrt(2*Math.log(x.visits)/a.visits);
        let second = b.wins/b.visits + Math.sqrt(2*Math.log(x.visits)/b.visits);

        return first-second;
      })
      return this.childNodes[this.childNodes.length-1];
    }
  
    addChild(m, s){
      var n = new Node(m, this, s);
      var index = this.untriedMoves.indexOf(m);
      this.untriedMoves.splice(index, 1)
      this.childNodes.push(n);
      return n;
    }
  
    update(result){
      this.visits = this.visits + 1;
      this.wins = this.wins + result;
    }

    childrenToString(){
        for(var i = 0; i < this.childNodes.length; i++){
            console.log(this.childNodes[i]);
        }
    }
}

function UCT(rootstate, itermax){

    var rootnode = new Node(null, null, rootstate);
  
    for(var i = 0; i < itermax; i++){
      var node = rootnode;
      var state = rootstate.clone();
  
      //Select
      while(node.untriedMoves.length == 0 && node.childNodes.length != 0){
        node = node.uctSelectChild();
        state.doMove(node.move);
      }
  
      //Expand
      if(node.untriedMoves.length != 0){
        var m = node.untriedMoves[Math.floor(Math.random() * node.untriedMoves.length)];
        state.doMove(m);
        node = node.addChild(m, state);
      }
  
      //Rollout
      while(state.getMoves().length != 0){
        state.doMove(state.getMoves()[Math.floor(Math.random() * state.getMoves().length)]);
      }

      //Backpropogate
      while(node != null) {    
        node.update(state.GetResult(node.playerJustMoved));
        node = node.parent;

      }
  
    }

      // console.log("rootNOde");
      // console.log(rootnode);
      // rootnode.childrenToString();
      // console.log("---------------------------------------------");

      var s = rootnode.childNodes.sort(function(a,b)
      {
        return (a.visits - b.visits);
      });
      return s[s.length-1].move;
}   


let worker = new Worker('worker.js');

worker.addEventListener('message', function(event){
  computersMove(event.data);
})

var tableData = document.getElementsByTagName('td');
var playerTurn = document.querySelector('.player-turn');
const slots = document.querySelectorAll('.slot');
const resetBtn = document.querySelector('.reset');
var state = new OthelloState
var isGameActive = true;
var numSimulations = document.getElementById("sims").value
currentPlayer = "YOU"
firstPlayer = "YOU"
var p1 = 
playerTurn.textContent = "YOUR TURN!"
drawBoard();


function changeColor(e){
  if(!isGameActive || currentPlayer == "AI") return;
  let row = e.target.dataset.cellIndex.charAt(0);
  let col = e.target.dataset.cellIndex.charAt(1);
  let move = [row,col]

  if (state.isMoveAvailable(move)){
      state.doMove(move);
      drawBoard();
      if(state.getMoves().length == 0){

        if(state.GetResult(state.playerJustMoved) == 1){
          playerTurn.textContent = "YOU WIN!"
          isGameActive = false;
        } else if (state.GetResult(state.playerJustMoved) == 0) {
          playerTurn.textContent = "AI WINS!"
          isGameActive = false;
        } else {
          playerTurn.textContent = "DRAW!"
          isGameActive = false;
        }

      } else {
          playerTurn.textContent = "AIs TURN!"
          currentPlayer = "AI";
          worker.postMessage({ 
              state: state, 
              numSimulations: numSimulations 
          })
      }
  }
}

function computersMove(m){
  state.doMove(m);
  drawBoard();
  playerTurn.textContent = "YOUR TURN!"
  if(state.getMoves().length == 0){
    if(state.GetResult(state.playerJustMoved) == 1){
      playerTurn.textContent = "AI WINS!"
      isGameActive = false;
    } else if (state.GetResult(state.playerJustMoved) == 0) {
      playerTurn.textContent = "YOU WIN!"
      isGameActive = false;
    } else {
      playerTurn.textContent = "DRAW!"
      isGameActive = false;
    }
  } 
  currentPlayer = "YOU"
}

function drawBoard(){
  Array.prototype.forEach.call(tableData, (cell) => {

      let row = cell.dataset.cellIndex.charAt(0);
      let col = cell.dataset.cellIndex.charAt(1);

      // var t1 = JSON.stringify(state.getMoves());
      // var t2 = JSON.stringify([parseInt(row), parseInt(col)]);


      // if(t1.includes(t2)){

      // } else {
      //   cell.style.backgroundColor = "green";
      // }

      if(state.board[row][col] == 0) {
          cell.innerHTML = "";          

      } else if (state.board[row][col] == 1) {
          cell.innerHTML = "";
          var disc = document.createElement("div");
          disc.style.width = 84;
          disc.style.height =84;
          disc.style.margin = "0 auto"
          disc.style.borderRadius = "50%";
          disc.style.backgroundColor = "black"
          cell.appendChild(disc);

      } else if (state.board[row][col] == 2) {
          cell.innerHTML = "";
          var disc = document.createElement("div");
          disc.style.width = 84;
          disc.style.height =84;
          disc.style.margin = "0 auto"
          disc.style.borderRadius = "50%";
          disc.style.backgroundColor = "white"
          cell.appendChild(disc);
      }
  });
}

Array.prototype.forEach.call(tableData, (cell) => {
  cell.addEventListener('click', changeColor);
});

resetBtn.addEventListener('click', () => {
  slots.forEach(slot => {
      slot.innerHTML = "";
  });

  isGameActive = true;
  numSimulations = document.getElementById("sims").value
  state = new OthelloState
  drawBoard();
  if(document.getElementById("No").checked){
      playerTurn.textContent = "AIs TURN!"
      worker.postMessage({ 
          state: state, 
          numSimulations: numSimulations 
      })
  } else {
      playerTurn.textContent = "YOUR TURN!"
  }
});


// function UCT(rootstate, itermax){

//   var rootnode = new Node(null, null, rootstate);

//   for(var i = 0; i < itermax; i++){
//     var node = rootnode;
//     var state = rootstate.clone();

//     //Select
//     while(node.untriedMoves.length == 0 && node.childNodes.length != 0){
//       node = node.uctSelectChild();
//       state.doMove(node.move);
//     }

//     //Expand
//     if(node.untriedMoves.length != 0){
//       var m = node.untriedMoves[Math.floor(Math.random() * node.untriedMoves.length)];
//       state.doMove(m);
//       node = node.addChild(m, state);
//     }

//     //Rollout
//     while(state.getMoves().length != 0){
//       state.doMove(state.getMoves()[Math.floor(Math.random() * state.getMoves().length)]);
//     }

//     //Backpropogate
//     while(node != null) {    
//       node.update(state.GetResult(node.playerJustMoved));
//       node = node.parent;

//     }

//   }

//     // console.log("rootNOde");
//     // console.log(rootnode);
//     // rootnode.childrenToString();
//     // console.log("\n");
//     // console.log("---------------------------------------------");

//     var s = rootnode.childNodes.sort(function(a,b)
//     {
//       return (a.visits - b.visits);
//     });
//     return s[s.length-1].move;
// }


// mctsCount = 0;
// randCount = 0;
// drawCount = 0;

// for(var i = 0; i <= 1000; i++) {
//     var s1 = new OthelloState()

//     while(true) {

//         s1.doMove(s1.getMoves()[Math.floor(Math.random() * s1.getMoves().length)]);

//         if(s1.getMoves().length == 0) break;

//         s1.doMove(UCT(s1,500))

//         if(s1.getMoves().length == 0) break;

//     }

//     if (i%10 == 0) {
//         console.log("MCTS: " + mctsCount)
//         console.log("Random move: " + randCount)
//         console.log("Draws " + drawCount)

//     }

//     if(s1.GetResult(2) == 1) mctsCount++
//     else if (s1.GetResult(1)) randCount++
//     else drawCount++

// }






