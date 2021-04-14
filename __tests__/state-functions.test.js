import { setWinner, resetState, updateStateValues, setNewHistory, defaultState } from '../src/state-functions';

describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });
});

describe('#setWinner', () => {
    it('sets winner X', () => {
        const winner = 'X';
        expect(setWinner(winner)).toEqual({winner: 'X'});
    })
});

describe('#resetState', () => {
    it('resets state to default', () => {
        const defaultObj = {hello: 'world'}
        expect(resetState(defaultObj)).toEqual({hello: 'world'});
    });
});

describe('#updateStateValues', () => {
    it('sets new values when player inputs', () => {
        const curState = { foo: 'bar'};
        expect(updateStateValues(curState, { foo: 'baz'})).toEqual({foo: 'baz'});
    });

    it('sets new values when player inputs', () => {
        const curState = { foo: 'bar', bar: 'bar'};
        expect(updateStateValues(curState, { foo: 'baz'})).toEqual({foo: 'baz', bar: 'bar'});
    });
});

describe('#setNewHistory', () => {
    it('sets new history values as players play', () => {
        const curHistory = [['O', 'X']];
        const newValues = ['X', 'O'];
        expect(setNewHistory(curHistory, newValues)).toEqual([['O','X'], ['X', 'O']]);
    });
});

describe('#defaultState', () => {
    const defaultValues = Array(9).fill('');
    it('sets values to default state', () => {
        expect(defaultState()).toEqual({
            currentText: 'O',
            values: defaultValues,
            winner: null,
            history: [],
            gameover: false
        });
    });
});
