const { test, expect } = require("@jest/globals")
const OxoState = require("./state")

test("Test Constructor", () => {
    var state = new OxoState();

    var testBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        
    expect(state.board).toEqual(testBoard)
    expect(state.playerJustMoved).toEqual(1)

})

test("Test clone()", () => {
    var state = new OxoState();
    var clone = state.clone();

        
    expect(state.board).toEqual(clone.board)
    expect(state.playerJustMoved).toEqual(clone.playerJustMoved)
})

test("Test doMove()", () => {
    var state = new OxoState();

    var testBoard = [0,0,0,0,0,0,0,0,0]
    expect(state.board).toEqual(testBoard)

    state.doMove(0);
    testBoard = [2,0,0,0,0,0,0,0,0]
    expect(state.board).toEqual(testBoard)

    state.doMove(1);
    testBoard = [2,1,0,0,0,0,0,0,0]
    expect(state.board).toEqual(testBoard)

    state.doMove(8);
    testBoard = [2,1,0,0,0,0,0,0,2]
    expect(state.board).toEqual(testBoard)


})

test("Test getMoves()", () => {
    var state = new OxoState();

    expect(state.getMoves()).toEqual([0,1,2,3,4,5,6,7,8])

    state.board = [2, 0, 0, 0, 0, 0, 0, 0, 1];
    expect(state.getMoves()).toEqual([1,2,3,4,5,6,7])

    state.board = [2, 2, 1, 2, 1, 2, 1, 2, 1];
    expect(state.getMoves()).toEqual([])

    state.board = [2, 2, 2, 1, 0, 0, 0, 0, 1];
    expect(state.getMoves()).toEqual([])



})

test("Test isMoveAvailable()", () => {
    var state = new OxoState();

    expect(state.isMoveAvailable(0)).toBe(true)
    expect(state.isMoveAvailable(1)).toBe(true)
    expect(state.isMoveAvailable(2)).toBe(true)
    expect(state.isMoveAvailable(3)).toBe(true)
    expect(state.isMoveAvailable(4)).toBe(true)
    expect(state.isMoveAvailable(5)).toBe(true)
    expect(state.isMoveAvailable(6)).toBe(true)
    expect(state.isMoveAvailable(7)).toBe(true)
    expect(state.isMoveAvailable(8)).toBe(true)

    state.board = [2, 0, 0, 0, 0, 0, 0, 0, 1];
    expect(state.isMoveAvailable(0)).toBe(false)
    expect(state.isMoveAvailable(8)).toBe(false)


    state.board = [2, 2, 1, 2, 1, 2, 1, 2, 1];
    expect(state.isMoveAvailable(0)).toBe(false)
    expect(state.isMoveAvailable(1)).toBe(false)
    expect(state.isMoveAvailable(2)).toBe(false)
    expect(state.isMoveAvailable(3)).toBe(false)
    expect(state.isMoveAvailable(4)).toBe(false)
    expect(state.isMoveAvailable(5)).toBe(false)
    expect(state.isMoveAvailable(6)).toBe(false)
    expect(state.isMoveAvailable(7)).toBe(false)
    expect(state.isMoveAvailable(8)).toBe(false)

})

test("Test isGameOver()", () => {
    var state = new OxoState();

    expect(state.isGameOver()).toBe(false);

    state.board = [2,2,2,0,1,1,1,0,0]
    expect(state.isGameOver()).toBe(true);

    state.board = [2,2,0,0,1,1,1,0,0]
    expect(state.isGameOver()).toBe(false);

    state.board = [2,2,0,2,1,1,2,0,1]
    expect(state.isGameOver()).toBe(true);

    state.board = [1,2,0,1,2,1,0,2,2]
    expect(state.isGameOver()).toBe(true);

    state.board = [2,2,1,1,2,2,2,1,1]
    expect(state.isGameOver()).toBe(true);


})


test("Test winner()", () => {
    var state = new OxoState();

    expect(state.winner(1)).toBe(false);
    expect(state.winner(2)).toBe(false);

    state.board = [2,2,2,0,1,1,1,0,0]
    expect(state.winner(1)).toBe(false);
    expect(state.winner(2)).toBe(true);

    state.board = [2,2,0,0,1,1,1,0,0]
    expect(state.winner(1)).toBe(false);
    expect(state.winner(2)).toBe(false);

    state.board = [2,2,0,1,2,1,1,2,1]
    expect(state.winner(1)).toBe(false);
    expect(state.winner(2)).toBe(true);

})

test("Test GetResult()", () => {
    var state = new OxoState();

    state.board = [2,2,2,0,1,1,1,0,0]
    expect(state.GetResult(1)).toEqual(0);
    expect(state.GetResult(2)).toEqual(1);


    state.board = [2,2,1,1,2,2,2,1,1]
    expect(state.GetResult(1)).toEqual(0.5);
    expect(state.GetResult(2)).toEqual(0.5);

})


test("Test draw()", () => {
    var state = new OxoState();

    expect(state.draw()).toBe(false);

    state.board = [2,2,2,0,1,1,1,0,0]
    expect(state.draw()).toBe(false);

    state.board = [2,2,1,1,2,2,2,1,1]
    expect(state.draw()).toBe(true);

})