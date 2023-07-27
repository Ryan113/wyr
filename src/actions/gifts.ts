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

export const getGiftsData = () => {
        return async (dispatch: Dispatch) => {
          const response = await axios.get("http://localhost:3004/db");
        //   const data = await response.json();
        //   console.log('Gifts Data:', data); // Log the data to check if it's fetched correctly.

          dispatch<GetGiftsAction>({
            type: ActionTypes.getGifts,
            payload: response.data,
          });
        };
    };

    // export const fetchTodos = () => {
    //     return async (dispatch: Dispatch) => {
    //         const response = await axios.get<Todo[]>(url);
    
    //         dispatch<FetchTodosAction>({
    //             type: ActionTypes.fetchTodos,
    //             payload: response.data
    //         })
    //     }
    // }