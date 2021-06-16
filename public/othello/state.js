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


    GetResult(playerjm){
      var jmCount = 0;
      var notJmCount = 0;
      for(var i = 0; i < this.board.length; i++){
        for(var j = 0; j < this.board[i].length; j++){
          if(this.board[i][j] == playerjm){
            jmCount++;
          } else if(this.board[i][j] == 3-playerjm){
            notJmCount++;
          }
        }
      }

      if(jmCount > notJmCount) return 1.0;
      else if (notJmCount > jmCount) return 0.0;
      else return 0.5;

    }
    
}
module.exports = OthelloState;