import { combineReducers } from "redux";
import { questionsReducer } from "./questions";
import { Question } from "../actions";

export interface StoreState {
    questions: Question[]
}

export const reducers = combineReducers<StoreState>({
    questions: questionsReducer,
});