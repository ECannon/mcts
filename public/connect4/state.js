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

        for (var i = 0; i< this.board.length; i++){
            for (var j = 0; j<this.board[0].length-3; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == playerjm && this.board[i][j+1] == playerjm && this.board[i][j+2] == playerjm && this.board[i][j+3] == playerjm){
                    return true;
                }           
            }
        }

        for (var i = 0; i< this.board.length-3; i++){
            for (var j = 0; j<this.board[0].length; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == playerjm && this.board[i+1][j] == playerjm && this.board[i+2][j] == playerjm && this.board[i+3][j] == playerjm){
                    return true;
                }           
            }
        }

        for (var i = 0; i< this.board.length-3; i++){
            for (var j = 0; j<this.board[0].length-3; j++){
                var player = this.board[i][j]
                if (this.board[i][j] == playerjm && this.board[i+1][j+1] == playerjm && this.board[i+2][j+2] == playerjm && this.board[i+3][j+3] == playerjm){
                    return true;
                }           
            }
        }

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

module.exports = Connect4State;