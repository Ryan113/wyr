import { GetQuestionsAction, GetQuestionAction, UpdateVotesAction } from "./questions";
import { GetGiftsAction } from "./gifts"


export enum ActionTypes {
    questions,
    getQuestion,
    getGifts,
    updateVotesType
}

export type Action = GetQuestionsAction
    | GetQuestionAction
    | GetGiftsAction
    | UpdateVotesAction; 