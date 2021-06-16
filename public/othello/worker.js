class OthelloState {
    constructor(){
      this.playerJustMoved = 2;
      this.board = [[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 2, 0, 0, 0],
                    [0, 0, 0, 2, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]];

      // this.board =   
      // [[2, 2, 2, 2, 1, 1, 1, 2],
      // [2, 2, 2, 2, 1, 1, 2, 0],
      // [2, 2, 2, 1, 1, 2, 2, 2],
      // [2, 2, 1, 1, 2, 2, 2, 2],
      // [2, 2, 2, 2, 2, 2, 2, 2],
      // [2, 2, 2, 2, 2, 2, 2, 2],
      // [0, 2, 2, 2, 2, 2, 0, 2],
      // [2, 2, 2, 2, 0, 2, 0, 0]];
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

      temp.forEach(elem => {
        if(this.isOnBoard(x+elem[0], y+elem[1]) && this.board[x+elem[0]][y+elem[1]] == this.playerJustMoved){
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
      x+=dx;
      y+=dy;
      var sandwiched = new Array();

      while(this.isOnBoard(x,y) && this.board[x][y] == this.playerJustMoved){
        var temp = [x,y];
        sandwiched.push(temp);
        x+=dx;
        y+=dy;
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

self.addEventListener('message', function(event) {

    var state = new OthelloState();
    state.board = event.data.state.board;
    state.playerJustMoved = event.data.state.playerJustMoved;
  
    var m = UCT(state, event.data.numSimulations);
  
    self.postMessage(m);
  }, false);

  