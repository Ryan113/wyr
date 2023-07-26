import { GetQuestionsAction, GetQuestionAction } from "./questions";
import { GetGiftsAction } from "./gifts"


export enum ActionTypes {
    questions,
    getQuestion,
    getGifts,
}

export type Action = GetQuestionsAction | GetQuestionAction | GetGiftsAction;