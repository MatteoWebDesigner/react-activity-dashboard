import { FETCH_RECEIPT } from '../reducers/activityReceipts';

export function fetchActivityReceipts() {
    return dispatch => {
        fetch('/api/receipts/')
            .then(res => res.json())
            .then(receipts => {

                let receiptsWithId = receipts.map((item, index) => {
                    item.id = index;
                    return item;
                });

                dispatch({
                    type: FETCH_RECEIPT,
                    payload: receiptsWithId
                });
            })
    };
}
