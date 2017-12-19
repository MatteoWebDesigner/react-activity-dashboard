import { CLOSE_MODAL, OPEN_MODAL } from '../reducers/modalActivity';

export function closeModalActivity() {
    return {
        type: CLOSE_MODAL
    }
}

export function openModalActivity(id, payload) {
    payload = payload.filter(item => item.id === id)[0];

    return {
        type: OPEN_MODAL,
        payload
    }
}