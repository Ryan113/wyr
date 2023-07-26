// reducer
import { Action, ActionTypes } from '../actions';

const initialState = {
    giftsData: {},
};

export const giftsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.getGifts:
            return {
                ...state,
                giftsData: action.payload,
            };
        default:
            return state;
    }
};