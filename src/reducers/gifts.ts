// reducer
import { Action, ActionTypes } from '../actions';

const initialState = {
    giftsData: {},
};

export const giftsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.getGifts:
            // console.log('update: ' + JSON.stringify(action.payload))
            return { ...state, giftsData: action.payload };
        default:
            return state;
    }
};