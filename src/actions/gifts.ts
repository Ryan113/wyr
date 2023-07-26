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
    payload: any;
}

export const getGiftsData = (): GetGiftsAction => {
    console.log(JSON.stringify('top ' + gifts))
    const pollTimer = setInterval((gifts) => {
        console.log(JSON.stringify('g ' + gifts))
        return gifts;
      }, 5000);

    return {
        type: ActionTypes.getGifts,
        payload: pollTimer,
    };
};
