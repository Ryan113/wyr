import { ActionTypes } from "./types";
import { Dispatch } from 'redux';
import axios from "axios";
// import gifts from '../../db.json';

const jsonDB = "http://localhost:3004/db";


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

export const getGiftsData = (data: any) => {
  return {
    type: ActionTypes.getGifts,
    payload: data,
  };
};
