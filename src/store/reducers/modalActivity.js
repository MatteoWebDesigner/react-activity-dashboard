export const CLOSE_MODAL = 'modalActivity/CLOSE_MODAL';
export const OPEN_MODAL = 'modalActivity/OPEN_MODAL';

const initialState = {
    isOpen: false,
    type: null,
    bgColor: null,
    bgLogo: null,
    attributes: []
};

export default (state = initialState, action) => {    
    switch (action.type) {
        case CLOSE_MODAL: 
            return Object.assign({}, initialState);
    
        case OPEN_MODAL: 
            let application = action.payload.application;
            let transaction = action.payload.transaction;
            
            return { 
                isOpen: true,
                type: action.payload.type,
                applicationName: application && application.name,
                bgColor: application && application.appearance["bg-color"],
                bgLogo: application && application.appearance["bg-logo"] || application && application.appearance["bg-img"],
                unixDate: transaction["unix-timestamp"],
                attributes: [...transaction.attributes]
            }

        default:
            return state;
    }
};