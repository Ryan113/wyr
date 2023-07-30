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
        case ActionTypes.updateVotesType:
            const updatedState = { ...state };
            
            // If answerA is being updated, update its votes
            if (action.payload.answer === 'answerA') {
                updatedState.question.answerA.votes = updatedState.question.answerA.votes  + action.payload.votes;
            }

            // If answerB is being updated, update its votes
            if (action.payload.answer === 'answerB') {
                updatedState.question.answerB.votes = updatedState.question.answerB.votes = updatedState.question.answerB.votes + action.payload.votes;
            }


            // console.log(action.payload.answer)
            return updatedState;
        default:
            return state;
    }
};

// return updateVotes({"answerA": "answerA", "votes": 1});
