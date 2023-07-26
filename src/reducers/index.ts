import { combineReducers } from "redux";
import { questionsReducer } from "./questions";
import { Question, Gifts } from "../actions";
import { giftsReducer } from "./gifts";

export interface StoreState {
    questions: Question[],
    question: Question,
    gifts: Gifts
}

export const reducers = combineReducers({
    questions: questionsReducer,
    question: questionsReducer,
    gifts: giftsReducer
});