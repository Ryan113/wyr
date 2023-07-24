import { GetQuestionsAction, GetQuestionAction } from "./questions";

export enum ActionTypes {
    questions,
    getQuestion
}

export type Action = GetQuestionsAction | GetQuestionAction;