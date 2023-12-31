import { Dispatch } from 'redux'
import { ActionTypes } from "./types";
import data from '../questions.json';

export interface Question {
    id: number;
    question: string;
    answerA: {
        text: string,
        votes: number
    };
    answerB: {
        text: string,
        votes: number
    };
}

export interface Votes {
    answerA?: {
      votes: number;
    };
    answerB?: {
      votes: number;
    };
  }

export interface GetQuestionsAction {
    type: ActionTypes.questions,
    payload: Question[]
}

export interface GetQuestionAction {
    type: ActionTypes.getQuestion,
    payload: number
}

export interface UpdateVotesAction {
    type: ActionTypes.updateVotesType,
    payload: any
}


export const getQuestions = () => {
    return (dispatch: Dispatch) => {
        dispatch<GetQuestionsAction>({
            type: ActionTypes.questions,
            payload: data
        })
    }
}

// nice naming... that wont confuse anyone ever
export const getQuestion = (id: number): GetQuestionAction => {
    return {
        type: ActionTypes.getQuestion,
        payload: id
    };
};

export const updateVotes = (votes: any) => {
    return (dispatch: Dispatch) => {
      dispatch({
        type: ActionTypes.updateVotesType,
        payload: votes,
      });
    };
  };
