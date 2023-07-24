import { Question, Action, ActionTypes } from '../actions'

export const questionsReducer = (
    state: Question[] = [],
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.questions:
            return action.payload;
        case ActionTypes.getQuestion:
            const targetId = action.payload;
            return state.filter((question: Question) => question.id === targetId) || []; // Return an empty array if no match found
        default:
            return state;
    }
};

