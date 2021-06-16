class Connect4State {
    constructor(){
      this.playerJustMoved = 1;
      this.board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],         
        [0, 0, 0, 0, 0, 0, 0]];
                
    }

    clone(){
      var st = new Connect4State();
      st.playerJustMoved = this.playerJustMoved;
      for(var i = 0; i < this.board.length; i++){
          st.board[i] = this.board[i].slice();
      }
      return st;
    }

    doMove(move){
      this.playerJustMoved = 3 - this.playerJustMoved;

      for(var i = 5; i >= 0; i--) {
          if(this.board[i][move] == 0){
              this.board[i][move] = this.playerJustMoved;
              break;
          }
      }
    }

    isMoveAvailable(move){
        return this.board[0][move] == 0;
    }

    
    getMoves(){
      var ret = new Array();
      if(this.isGameOver()) return ret;
      for(var i = 0; i < this.board[0].length; i++){
        if(this.board[0][i] == 0){
          ret.push(i);
        }
      }
      return ret;
    }

    isGameOver(){
        // horizontalCheck 
        for (var i = 0; i< this.board.length; i++){
            for (var j = 0; j<this.board[0].length-3; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == player && this.board[i][j+1] == player && this.board[i][j+2] == player && this.board[i][j+3] == player && player != 0){
                    return true;
                }           
            }
        }

        for (var i = 0; i< this.board.length-3; i++){
            for (var j = 0; j<this.board[0].length; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == player && this.board[i+1][j] == player && this.board[i+2][j] == player && this.board[i+3][j] == player && player != 0){
                    return true;
                }           
            }
        }

        for (var i = 0; i< this.board.length-3; i++){
            for (var j = 0; j<this.board[0].length-3; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == player && this.board[i+1][j+1] == player && this.board[i+2][j+2] == player && this.board[i+3][j+3] == player && player != 0){
                    return true;
                }           
            }
        }

        for (var i = 3; i< this.board.length; i++){
            for (var j = 0; j<this.board[0].length-3; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == player && this.board[i-1][j+1] == player && this.board[i-2][j+2] == player && this.board[i-3][j+3] == player && player != 0){
                    return true;
                }           
            }
        }

        return false;


    }

    winner(playerjm){

                // for i in range(len(self.board)):
        //     for j in range(len(self.board[i])-3):
        //         tile = self.board[i][j]
        //         if self.board[i][j] == tile and self.board[i][j+1] == tile and self.board[i][j+2] == tile and self.board[i][j+3] == tile and tile != 0:
        //             self.win_status = tile
        //             self.is_terminal = True
                    
        //             return tile


        // horizontalCheck 
        for (var i = 0; i< this.board.length; i++){
            for (var j = 0; j<this.board[0].length-3; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == playerjm && this.board[i][j+1] == playerjm && this.board[i][j+2] == playerjm && this.board[i][j+3] == playerjm){
                    return true;
                }           
            }
        }


        

        // for i in range(len(self.board)-3):
        //     for j in range(len(self.board[i])):
        //         tile = self.board[i][j]
        //         if self.board[i][j] == tile and self.board[i+1][j] == tile and self.board[i+2][j] == tile and self.board[i+3][j] == tile and tile != 0:
        //             self.win_status = tile
        //             self.is_terminal = True
                    

        //             return tile

        for (var i = 0; i< this.board.length-3; i++){
            for (var j = 0; j<this.board[0].length; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == playerjm && this.board[i+1][j] == playerjm && this.board[i+2][j] == playerjm && this.board[i+3][j] == playerjm){
                    return true;
                }           
            }
        }

        // for i in range(len(self.board)-3):
        //     for j in range(len(self.board[i])-3):
        //         tile = self.board[i][j]
        //         if self.board[i][j] == tile and self.board[i+1][j+1] == tile and self.board[i+2][j+2] == tile and self.board[i+3][j+3] == tile and tile != 0:
        //             self.win_status = tile
        //             self.is_terminal = True
                    

        //             return tile

        for (var i = 0; i< this.board.length-3; i++){
            for (var j = 0; j<this.board[0].length-3; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == playerjm && this.board[i+1][j+1] == playerjm && this.board[i+2][j+2] == playerjm && this.board[i+3][j+3] == playerjm){
                    return true;
                }           
            }
        }

        // for i in range(3,len(self.board)):
        //     for j in range(len(self.board[i])-3):

        //         tile = self.board[i][j]
        //         if self.board[i][j] == tile and self.board[i-1][j+1] == tile and self.board[i-2][j+2] == tile and self.board[i-3][j+3] == tile and tile != 0:
                    
        //             self.win_status = tile
        //             self.is_terminal = True

        //             return tile

        for (var i = 3; i< this.board.length; i++){
            for (var j = 0; j<this.board[0].length-3; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == playerjm && this.board[i-1][j+1] == playerjm && this.board[i-2][j+2] == playerjm && this.board[i-3][j+3] == playerjm){
                    return true;
                }           
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
const slots = document.querySelectorAll('.slot');
const resetBtn = document.querySelector('.reset');
var state = new Connect4State
var isGameActive = true;
var numSimulations = document.getElementById("sims").value
currentPlayer = "YOU"
firstPlayer = "YOU"
playerTurn.textContent = "YOUR TURN!"

function changeColor(e){
    if(!isGameActive || currentPlayer == "AI") return;
    let column = e.target.cellIndex;
        if (state.isMoveAvailable(column)){
            state.doMove(column);
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
      if(state.isGameOver()){
            playerTurn.textContent = "AI WINS!"
            isGameActive = false;
      } else if (state.draw()) {
            playerTurn.textContent = "DRAW!"
            isGameActive = false;
      }
      currentPlayer = "YOU"
}

function drawBoard(){
    Array.prototype.forEach.call(tableData, (cell) => {

        var rowCol = cell.id;
        var row = rowCol.charAt(rowCol.length-2);
        var col = rowCol.charAt(rowCol.length-1);

        if(state.board[row][col] == 0) {
            cell.style.backgroundColor = 'white';
        } else if (state.board[row][col] == 1) {
            cell.style.backgroundColor = 'red';
        } else if (state.board[row][col] == 2) {
            cell.style.backgroundColor = 'yellow';
        }
    });
}

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

resetBtn.addEventListener('click', () => {
    slots.forEach(slot => {
        slot.style.backgroundColor = 'white';
    });

    isGameActive = true;
    numSimulations = document.getElementById("sims").value
    state = new Connect4State
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

//     var rootnode = new Node(null, null, rootstate);
  
//     for(var i = 0; i < itermax; i++){
//       var node = rootnode;
//       var state = rootstate.clone();
  
//       //Select
//       while(node.untriedMoves.length == 0 && node.childNodes.length != 0){
//         node = node.uctSelectChild();
//         state.doMove(node.move);
//       }
  
//       //Expand
//       if(node.untriedMoves.length != 0){
//         var m = node.untriedMoves[Math.floor(Math.random() * node.untriedMoves.length)];
//         state.doMove(m);
//         node = node.addChild(m, state);
//       }
  
//       //Rollout
//       while(state.getMoves().length != 0){
//         state.doMove(state.getMoves()[Math.floor(Math.random() * state.getMoves().length)]);
//       }
  
//       //Backpropogate
//       while(node != null) {    
//         node.update(state.GetResult(node.playerJustMoved));
//         node = node.parent;
  
//       }
  
//     }
  
//       // console.log("rootNOde");
//       // console.log(rootnode);
//       // rootnode.childrenToString();
//       // console.log("\n");
//       // console.log("---------------------------------------------");
  
//       var s = rootnode.childNodes.sort(function(a,b)
//       {
//         return (a.visits - b.visits);
//       });
//       return s[s.length-1].move;
// }


// // 2 = mcts = player 1

// mctsCount = 0;
// randCount = 0;
// drawCount = 0;

// for(var i = 0; i <= 1000; i++) {
//     var s1 = new Connect4State()

//     while(true) {

//         s1.doMove(UCT(s1,10))

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