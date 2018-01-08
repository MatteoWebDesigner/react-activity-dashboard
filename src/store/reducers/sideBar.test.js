import reducerSideBar, { TOOGLE_VISIBILITY } from './sideBar.js';

describe('reducer sideBar', () => {
    let initialState;

    beforeEach(() => {
        initialState = reducerSideBar(undefined, {});
    });

    it('should return initial state', () => {
        let expectedState = {
            isOpen: false
        };

        expect(initialState).toEqual(expectedState);
    });

    describe('TOOGLE_VISIBILITY', () => {
        it('should open and then close', () => {
            let state = reducerSideBar(initialState, { type: TOOGLE_VISIBILITY }),
                expectedState = {
                    isOpen: true
                };
    
            expect(state).toEqual(expectedState);

            state = reducerSideBar(state, { type: TOOGLE_VISIBILITY });
            expectedState = {
                isOpen: false
            };

            expect(state).toEqual(expectedState);
        });
    });
});