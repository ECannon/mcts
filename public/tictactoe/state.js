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
}

module.exports = OxoState;