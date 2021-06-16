const { test, expect } = require("@jest/globals")
const Connect4State = require("./state")

test("Test Constructor", () => {
    var state = new Connect4State();

    var testBoard = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],         
        [0, 0, 0, 0, 0, 0, 0]];
        
    expect(state.board).toEqual(testBoard)
    expect(state.playerJustMoved).toEqual(1)

})

test("Test clone()", () => {
    var state = new Connect4State();
    var clone =  state.clone()

    var testBoard = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],         
        [0, 0, 0, 0, 0, 0, 0]];
        
    expect(state.board).toEqual(clone.board)
    expect(state.playerJustMoved).toEqual(clone.playerJustMoved)

})

test("Test doMove()", () => {
    var testBoard = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],         
        [2, 0, 0, 0, 0, 0, 0]];

    var state = new Connect4State();
    state.doMove(0);

    expect(state.board).toEqual(testBoard);

    testBoard = [
        [1, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],         
        [2, 0, 0, 0, 0, 0, 0]];

        state.doMove(0);
        state.doMove(0);
        state.doMove(0);
        state.doMove(0);
        state.doMove(0);

        expect(state.board).toEqual(testBoard);
})

test("Test isMoveAvailable()", () => {
    var state = new Connect4State();

        
    expect(state.isMoveAvailable(0)).toBe(true)
    expect(state.isMoveAvailable(1)).toBe(true)
    expect(state.isMoveAvailable(2)).toBe(true)
    expect(state.isMoveAvailable(3)).toBe(true)
    expect(state.isMoveAvailable(4)).toBe(true)
    expect(state.isMoveAvailable(5)).toBe(true)
    expect(state.isMoveAvailable(6)).toBe(true)

    state.board = [
        [1, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],         
        [2, 2, 0, 0, 0, 0, 0]];

    expect(state.isMoveAvailable(0)).toBe(false)
    expect(state.isMoveAvailable(1)).toBe(true)

    state.board = [
        [1, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 2],
        [2, 2, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 2],         
        [2, 2, 0, 0, 0, 0, 1]];

        expect(state.isMoveAvailable(5)).toBe(true)
        expect(state.isMoveAvailable(6)).toBe(true)

})

test("Test getMoves()", () => {
    var state = new Connect4State();

    state.board = [
        [1, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],         
        [2, 2, 0, 0, 0, 0, 0]];

    expect(state.getMoves()).toEqual([1,2,3,4,5,6])

    state.board = [
        [1, 1, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],         
        [2, 2, 0, 0, 0, 0, 0]];

    expect(state.getMoves()).toEqual([2,3,4,5,6])

    state.board = [
        [1, 1, 1, 0, 0, 0, 1],
        [2, 2, 2, 0, 0, 0, 2],
        [1, 1, 1, 0, 0, 0, 1],
        [2, 2, 2, 0, 0, 0, 2],
        [1, 1, 1, 0, 0, 0, 1],         
        [2, 2, 2, 0, 0, 0, 2]];

    expect(state.getMoves()).toEqual([3,4,5])

    state.board = [
        [1, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0],         
        [2, 2, 2, 2, 0, 1, 0]];

        expect(state.getMoves()).toEqual([])
})

test("Test isGameOver()", () => {
    var state = new Connect4State();
        
    expect(state.isGameOver()).toBe(false)

    state.board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0],         
        [2, 2, 2, 1, 2, 0, 0]];

    expect(state.isGameOver()).toBe(true)

    state.board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 1, 2, 1, 1, 0, 0],
        [0, 2, 1, 1, 2, 0, 0],
        [1, 1, 1, 2, 2, 0, 0],         
        [2, 2, 2, 1, 2, 2, 0]];

    expect(state.isGameOver()).toBe(true)

    state.board = [
        [2, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [2, 1, 2, 1, 1, 0, 0],
        [2, 2, 1, 1, 2, 1, 0],
        [1, 1, 1, 2, 2, 1, 1],         
        [2, 2, 2, 1, 2, 2, 1]];

    expect(state.isGameOver()).toBe(true)

    state.board = [
        [2, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 1, 0, 0, 0],
        [1, 1, 2, 1, 1, 0, 0],
        [2, 2, 1, 1, 2, 1, 0],
        [1, 1, 1, 2, 2, 1, 1],         
        [2, 2, 2, 1, 2, 2, 1]];

    expect(state.isGameOver()).toBe(true)
})

test("Test winner()", () => {
    var state = new Connect4State();
        
    expect(state.winner(1)).toBe(false)

    state.board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0],         
        [2, 2, 2, 1, 2, 0, 0]];

    expect(state.winner(1)).toBe(true)

    state.board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 1, 2, 1, 1, 0, 0],
        [0, 2, 1, 1, 2, 0, 0],
        [1, 1, 1, 2, 2, 0, 0],         
        [2, 2, 2, 1, 2, 2, 0]];

    expect(state.winner(1)).toBe(true)

    state.board = [
        [2, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [2, 1, 2, 1, 1, 0, 0],
        [2, 2, 1, 1, 2, 1, 0],
        [1, 1, 1, 2, 2, 1, 1],         
        [2, 2, 2, 1, 2, 2, 1]];

    expect(state.winner(1)).toBe(false)
    expect(state.winner(2)).toBe(true)

    state.board = [
        [2, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 1, 0, 0, 0],
        [1, 1, 2, 1, 1, 0, 0],
        [2, 2, 1, 1, 2, 1, 0],
        [1, 1, 1, 2, 2, 1, 1],         
        [2, 2, 2, 1, 2, 2, 1]];

    expect(state.winner(1)).toBe(true)
    expect(state.winner(2)).toBe(false)

})

test("Test getResult()", () => {
    var state = new Connect4State();
        
    expect(state.GetResult(1)).toEqual(0.5)
    expect(state.GetResult(2)).toEqual(0.5)

    state.board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0],         
        [2, 2, 2, 1, 2, 0, 0]];

    expect(state.GetResult(1)).toEqual(1)
    expect(state.GetResult(2)).toEqual(0)

    state.board = [
        [2, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [2, 1, 2, 1, 1, 0, 0],
        [2, 2, 1, 1, 2, 1, 0],
        [1, 1, 1, 2, 2, 1, 1],         
        [2, 2, 2, 1, 2, 2, 1]];

    expect(state.GetResult(1)).toEqual(0)
    expect(state.GetResult(2)).toEqual(1)

    

})

test("Test draw()", () => {
    var state = new Connect4State();

    expect(state.draw()).toBe(false);

    state.board = [
        [1, 2, 2, 1, 1, 1, 2],
        [2, 1, 1, 2, 2, 2, 1],
        [1, 1, 2, 1, 1, 2, 1],
        [2, 2, 2, 1, 2, 2, 2],
        [1, 1, 1, 2, 2, 1, 1],         
        [2, 2, 1, 1, 2, 1, 2]];
        
    expect(state.draw()).toBe(true);

})