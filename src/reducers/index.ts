import { combineReducers } from "redux";
import { questionsReducer } from "./questions";
import { Question } from "../actions";

export interface StoreState {
    questions: Question[],
    question: Question,
}

export const reducers = combineReducers({
    questions: questionsReducer,
    question: questionsReducer
});