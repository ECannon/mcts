class OxoState {
    constructor(){
      this.playerJustMoved = 1;
      this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                
    }

    clone(){
      var st = new OxoState();
      st.playerJustMoved = this.playerJustMoved;
      for(var i = 0; i < this.board.length; i++){
          st.board[i] = this.board[i];
      }
      return st;
    }

    doMove(move){
      this.playerJustMoved = 3 - this.playerJustMoved;
      this.board[move] = this.playerJustMoved;
    }

    
    getMoves(){
      if(this.winner(this.playerJustMoved) || this.winner(3-this.playerJustMoved)){
        return new Array();
      }
      var ret = new Array();
      for(var i = 0; i < this.board.length; i++){
        if(this.board[i] == 0){
          ret.push(i);
        }
      }
      return ret;
    }

    isMoveAvailable(cell){
      return this.board[cell] == 0;
    }

    isGameOver(){
        var winningConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
        for(var i = 0; i < winningConditions.length; i++){
            var condition = winningConditions[i];
            var x = condition[0];
            var y = condition[1];
            var z = condition[2];

            if(this.board[x] == this.board[y] && this.board[y] == this.board[z] && this.board[x] != 0){
                return true;
            }
        }
        if(this.draw()){
          return true;
        }
        return false;
    }

    winner(playerjm){
        var winningConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
        for(var i = 0; i < winningConditions.length; i++){
            var condition = winningConditions[i];
            var x = condition[0];
            var y = condition[1];
            var z = condition[2];

            if(this.board[x] == playerjm && this.board[y] == playerjm && this.board[z] == playerjm){
                return true;
            }
        }
        return false;
    }

    GetResult(playerjm){
        if(this.winner(playerjm)){
          return 1.0;
        }
        else if(this.winner(3-playerjm)){
          return 0.0;
        }
        else{
          return 0.5;
        }
    }

    draw(){
      return (this.getMoves().length == 0 && !this.winner(this.playerJustMoved) && !this.winner(3-this.playerJustMoved))
    }

    printBoard(){
        console.log(this.board[0] + " " + this.board[1] + " " + this.board[2])
        console.log(this.board[3] + " " + this.board[4] + " " + this.board[5])
        console.log(this.board[6] + " " + this.board[7] + " " + this.board[8])
        console.log("\n")
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

let worker = new Worker('worker.js');

worker.addEventListener('message', function(event){
  computersMove(event.data);

})




var tableData = document.getElementsByTagName('td');
var playerTurn = document.querySelector('.player-turn');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset');
var state = new OxoState();
var isGameActive = true;
var numSimulations = document.getElementById("sims").value
currentPlayer = "YOU"
firstPlayer = "YOU"
playerTurn.textContent = "YOUR TURN!"

function changeColor(e){
  if(!isGameActive || currentPlayer == "AI") return;
  let cell = e.target.dataset.cellIndex;
  if (state.isMoveAvailable(cell)){
      state.doMove(cell);
      drawBoard();
      if(state.draw()){
        playerTurn.textContent = "DRAW!"
        isGameActive = false;
      } else if (state.isGameOver()) {
          playerTurn.textContent = "YOU WIN!"
          isGameActive = false;
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
  if(state.draw()){
        playerTurn.textContent = "DRAW!"
        isGameActive = false;
  } else if (state.isGameOver()) {
    playerTurn.textContent = "AI WINS!"
    isGameActive = false;
  }
  currentPlayer = "YOU"
}


function drawBoard(){
  Array.prototype.forEach.call(tableData, (cell) => {

    cell.style.textAlign = "center";
    cell.style.fontSize = "700%"
    var index = cell.dataset.cellIndex;

    if(state.board[index] == 0) {
        cell.innerHTML = "";
    } else if (state.board[index] == 2) {
        cell.innerHTML = 'X';
    } else if (state.board[index] == 1 ) {
        cell.innerHTML = 'O';
    }
  });
}

Array.prototype.forEach.call(tableData, (cell) => {
  cell.addEventListener('click', changeColor);
  cell.style.backgroundColor = 'white';
});

resetBtn.addEventListener('click', () => {
  cells.forEach(cell => {
      cell.innerHTML = "";
  });

  isGameActive = true;
  numSimulations = document.getElementById("sims").value
  state = new OxoState
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
//     var s1 = new OxoState()

//     while(true) {

//         s1.doMove(UCT(s1,1000))

//         if(s1.isGameOver()) break;

//         s1.doMove(s1.getMoves()[Math.floor(Math.random() * s1.getMoves().length)]);

//         if(s1.isGameOver()) break;
//     }

//     if (i%10 == 0) {
//         console.log("MCTS: " + mctsCount)
//         console.log("Random move: " + randCount)
//         console.log("Draws " + drawCount)

//     }

//     if(s1.winner(2) == 1) mctsCount++
//     else if (s1.winner(1)) randCount++
//     else drawCount++

// }
