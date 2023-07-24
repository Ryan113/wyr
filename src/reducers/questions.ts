import { Question, Action, ActionTypes } from '../actions';

interface QuestionsState {
    questions: Question[];
    question: Question;
}

const initialState = {
    questions: [],
    question: {
        id: 1,
        question: 'Questions not loaded',
        answerA: {
            text: 'Error',
            votes: 0
        },
        answerB: {
            text: 'Error',
            votes: 0
        }
    }
}

export const questionsReducer = (
    state: QuestionsState = initialState,
    action: Action
): QuestionsState => {
    switch (action.type) {
        case ActionTypes.questions:
            return { ...state, questions: action.payload }
        case ActionTypes.getQuestion:
            const targetId = action.payload;
            const foundQuestion = state.questions.find((question: Question) => question.id === targetId);
            return { ...state, question: foundQuestion || initialState.question };
        default:
            return state;
    }
};
