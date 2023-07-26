import { ActionTypes } from "./types";
import gifts from '../gift_data.json';

export interface Gifts {
    [key: string]: {
        uniqueId: string;
        userId: string;
        giftId: number;
        repeatCount: number;
    };
}

export interface GetGiftsAction {
    type: ActionTypes.getGifts;
    payload: Gifts;
}

export const getGiftsData = (): GetGiftsAction => {
    return {
        type: ActionTypes.getGifts,
        payload: gifts,
    };
};
