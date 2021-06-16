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
      // console.log("\n");
      // console.log("---------------------------------------------");
  
      var s = rootnode.childNodes.sort(function(a,b)
      {
        return (a.visits - b.visits);
      });
      return s[s.length-1].move;
}

self.addEventListener('message', function(event) {

    var state = new Connect4State();
    state.board = event.data.state.board;
    state.playerJustMoved = event.data.state.playerJustMoved;
    var sims = event.data.numSimulations;

    var m = UCT(state, event.data.numSimulations);
  
    self.postMessage(m);
  }, false);