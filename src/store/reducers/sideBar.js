export const TOOGLE_VISIBILITY = 'sideBar/TOOGLE_VISIBILITY'

const initialState = {
    isOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOOGLE_VISIBILITY: 
            return { 
                isOpen: !state.isOpen
            }

        default:
            return state;
    }
};