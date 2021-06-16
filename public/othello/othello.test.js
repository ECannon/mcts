const { test, expect } = require("@jest/globals")
const OthelloState = require("./state")

test("Test Constructor", () => {
    var state = new OthelloState();

    var testBoard = [[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 2, 1, 0, 0, 0],
                    [0, 0, 0, 1, 2, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]];

    expect(state.board).toEqual(testBoard)
    expect(state.playerJustMoved).toEqual(2)



})

test("Test clone()", () => {
    var state = new OthelloState();
    var clone =  state.clone()
        
    expect(state.board).toEqual(clone.board)
    expect(state.playerJustMoved).toEqual(clone.playerJustMoved)

})

test("Test doMove()", () => {
    var state = new OthelloState();
    state.doMove([5,4]);
    
    var testBoard = [[ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 0, 0, 0, 2, 1, 0, 0, 0 ],
                    [ 0, 0, 0, 1, 1, 0, 0, 0 ],
                    [ 0, 0, 0, 0, 1, 0, 0, 0 ],
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ]]
    expect(state.board).toEqual(testBoard)

    state.doMove([5,5]);
    testBoard = [[ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 2, 1, 0, 0, 0 ],
                [ 0, 0, 0, 1, 2, 0, 0, 0 ],
                [ 0, 0, 0, 0, 1, 2, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ]]
    expect(state.board).toEqual(testBoard)

    state.doMove([4,5]);
    testBoard = [[ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 2, 1, 0, 0, 0 ],
                [ 0, 0, 0, 1, 1, 1, 0, 0 ],
                [ 0, 0, 0, 0, 1, 2, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ]]
    expect(state.board).toEqual(testBoard)

    state.doMove([3,5]);
    testBoard = [[ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 2, 2, 2, 0, 0 ],
                [ 0, 0, 0, 1, 1, 2, 0, 0 ],
                [ 0, 0, 0, 0, 1, 2, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ]]
    expect(state.board).toEqual(testBoard)

})

test("Test isMoveAvailable()", () => {
    var state = new OthelloState();

    expect(state.isMoveAvailable([5,4])).toBe(true);
    expect(state.isMoveAvailable([3,2])).toBe(true);
    expect(state.isMoveAvailable([4,5])).toBe(true);


    expect(state.isMoveAvailable([0,0])).toBe(false);
    expect(state.isMoveAvailable([7,7])).toBe(false);
    expect(state.isMoveAvailable([2,5])).toBe(false);


    state.board = [[ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 2, 2, 2, 0, 0 ],
                [ 0, 0, 0, 1, 1, 2, 0, 0 ],
                [ 0, 0, 0, 0, 1, 2, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0 ]]

    expect(state.isMoveAvailable([4,6])).toBe(true);
    expect(state.isMoveAvailable([2,3])).toBe(true);
    expect(state.isMoveAvailable([2,2])).toBe(true);
    expect(state.isMoveAvailable([0,7])).toBe(false);
    expect(state.isMoveAvailable([7,0])).toBe(false);
})

test("Test getMoves()", () => {
    var state = new OthelloState();
    
    expect(state.getMoves()).toEqual([[2,3],[3,2],[4,5],[5,4]])

    state.doMove([2,3]);
    state.doMove([3,2]);

    expect(state.getMoves()).toEqual([[2,1],[3,1],[4,1],[4,5],[5,4],[5,5]])

    state.doMove([5,5]);
    state.doMove([4,5]);
    state.doMove([2,1]);
    state.doMove([3,1]);

    expect(state.getMoves()).toEqual([[3,0],[3,5],[4,1],[4,6],[5,6]])
})

test("Test adjacentEnemyDirections()", () => {
    var state = new OthelloState();

    expect(state.adjacentEnemyDirections(3,3)).toEqual([[1,1]])

    state.doMove([2,3]);
    state.doMove([3,2]);

    expect(state.adjacentEnemyDirections(3,3)).toEqual([[1,1],[0,-1]])
    expect(state.adjacentEnemyDirections(3,2)).toEqual([])
})

test("Test existsSandwichedCounter()", () => {
    var state = new OthelloState();

    expect(state.existsSandwichedCounter(3,3)).toBe(false)


    expect(state.existsSandwichedCounter(5,4)).toBe(true)
    expect(state.existsSandwichedCounter(5,5)).toBe(false)
    expect(state.existsSandwichedCounter(3,2)).toBe(true)
    expect(state.existsSandwichedCounter(2,6)).toBe(false)
    expect(state.existsSandwichedCounter(4,5)).toBe(true)
    expect(state.existsSandwichedCounter(4,6)).toBe(false)
    expect(state.existsSandwichedCounter(0,7)).toBe(false)
    expect(state.existsSandwichedCounter(2,3)).toBe(true)

    state.doMove([2,3]);
    state.doMove([3,2]);

    expect(state.existsSandwichedCounter(5,4)).toBe(true)
    expect(state.existsSandwichedCounter(5,5)).toBe(true)
    expect(state.existsSandwichedCounter(3,2)).toBe(false)
    expect(state.existsSandwichedCounter(2,6)).toBe(false)
    expect(state.existsSandwichedCounter(4,1)).toBe(true)
    expect(state.existsSandwichedCounter(4,0)).toBe(false)
    expect(state.existsSandwichedCounter(0,7)).toBe(false)
    expect(state.existsSandwichedCounter(3,1)).toBe(true)
})

test("Test getAllSandwichedCounters()", () => {
    var state = new OthelloState();

    // expect(state.existsSandwichedCounter(3,3)).toBe(false)


    expect(state.getAllSandwichedCounters(7,6)).toEqual([])
    expect(state.getAllSandwichedCounters(6,4)).toEqual([])
    expect(state.getAllSandwichedCounters(5,4)).toEqual([[4,4]])
    expect(state.getAllSandwichedCounters(4,5)).toEqual([[4,4]])
    expect(state.getAllSandwichedCounters(2,3)).toEqual([[3,3]])
    expect(state.getAllSandwichedCounters(0,0)).toEqual([])
    
    state.doMove([2,3]);
    state.doMove([3,2]);

    expect(state.getAllSandwichedCounters(3,1)).toEqual([[3,2]])
    expect(state.getAllSandwichedCounters(4,1)).toEqual([[3,2]])
    expect(state.getAllSandwichedCounters(5,4)).toEqual([[4,4]])
    expect(state.getAllSandwichedCounters(4,5)).toEqual([[4,4]])
    expect(state.getAllSandwichedCounters(2,3)).toEqual([])
    expect(state.getAllSandwichedCounters(0,0)).toEqual([])
})

test("Test sandwichedCounters()", () => {
    var state = new OthelloState();

    // expect(state.existsSandwichedCounter(3,3)).toBe(false)

    expect(state.sandwichedCounters(5,6,-1,-1)).toEqual([]);
    expect(state.sandwichedCounters(5,4,-1,-1)).toEqual([]);
    expect(state.sandwichedCounters(4,5,-1,-1)).toEqual([]);
    expect(state.sandwichedCounters(3,2,-1,-1)).toEqual([]);
    expect(state.sandwichedCounters(4,5,0,-1)).toEqual([[4,4]]);

})

test("Test isOnBoard()", () => {
    var state = new OthelloState();

    expect(state.isOnBoard(0,0)).toBe(true)
    expect(state.isOnBoard(0,1)).toBe(true)
    expect(state.isOnBoard(-1,0)).toBe(false)
    expect(state.isOnBoard(0,10)).toBe(false)
    expect(state.isOnBoard(10,10)).toBe(false)
    expect(state.isOnBoard(4,4)).toBe(true)
})

test("Test isOnBoard()", () => {
    var state = new OthelloState();

    expect(state.isOnBoard(0,0)).toBe(true)
    expect(state.isOnBoard(0,1)).toBe(true)
    expect(state.isOnBoard(-1,0)).toBe(false)
    expect(state.isOnBoard(0,10)).toBe(false)
    expect(state.isOnBoard(10,10)).toBe(false)
    expect(state.isOnBoard(4,4)).toBe(true)
})

test("Test GetResult()", () => {
    var state = new OthelloState();

    expect(state.GetResult(1)).toEqual(0.5)
    expect(state.GetResult(2)).toEqual(0.5)

    state.board = [ [ 2, 2, 1, 1, 1, 1, 1, 1 ],
                    [ 2, 2, 2, 1, 2, 1, 1, 1 ],
                    [ 2, 2, 2, 2, 1, 1, 2, 1 ],
                    [ 2, 2, 2, 2, 1, 1, 2, 1 ],
                    [ 2, 2, 2, 2, 2, 2, 1, 1 ],
                    [ 2, 1, 1, 2, 2, 1, 1, 1 ],
                    [ 2, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 2, 2, 1, 1, 1, 1, 1, 1 ]]

    expect(state.GetResult(1)).toEqual(1)
    expect(state.GetResult(2)).toEqual(0)
})