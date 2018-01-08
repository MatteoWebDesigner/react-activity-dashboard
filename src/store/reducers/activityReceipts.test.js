import reducerActivityReceipts, { FETCH_RECEIPT } from './activityReceipts.js';

describe('reducer activityReceipts', () => {
    let initialState;

    beforeEach(() => {
        initialState = reducerActivityReceipts(undefined, {});
    });

    it('should return initial state', () => {
        let expectedState = {
            collection: []
        };

        expect(initialState).toEqual(expectedState);
    });

    describe('FETCH_RECEIPT', () => {
        it('should store receipts collection', () => {
            let state = reducerActivityReceipts(initialState, { 
                    type: FETCH_RECEIPT,
                    payload: [1,2,3]
                }),
                expectedState = {
                    collection: [1,2,3]
                };
    
            expect(state).toEqual(expectedState);
        });
    });
});