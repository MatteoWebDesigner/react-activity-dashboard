export const FETCH_RECEIPT = 'activityReceipt/FETCH_RECEIPT';

const initialState = {
    collection: []
};

export default (state = initialState, action) => {    
    switch (action.type) {
        case FETCH_RECEIPT:
            return {
                collection: action.payload
            };

        default:
            return state;
    }
};