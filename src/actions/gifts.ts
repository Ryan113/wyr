import { ActionTypes } from "./types";
import { Dispatch } from 'redux';
import axios from "axios";
// import gifts from '../../public/db.json';
// import fs from 'fs';

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

export const deleteGiftFromData = (key: any) => {
  return (dispatch: Dispatch) => {
    const jsonDB = "http://localhost:3004";
    const route = `${jsonDB}/${key}`;

    // Make the API call using axios
    axios.delete(route, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      console.log('Key successfully deleted:', key);
      // If you want to dispatch an action after successful deletion, do it here:
      // dispatch(someAction());
    })
    .catch(error => {
      console.error('Error deleting key:', error);
      // If you want to dispatch an action in case of an error, do it here:
      // dispatch(someErrorAction());
    });
  };
};

// export const deleteGiftFromData = (key: any) => {
//   return (dispatch: Dispatch) => {
//     const jsonDB = "http://localhost:3004/db";
//     const route = `${jsonDB}/${key}`;

//     console.log('route ' + route)

//     // Make the API call using axios
//     axios.delete(route, {
//       headers: {
//         "Content-Type": "application/json",
//       }})
//       .then(response => {
//         console.log('Key successfully deleted:', key);
//         // If you want to dispatch an action after successful deletion, do it here:
//         // dispatch(someAction());
//       })
//       .catch(error => {
//         console.error('Error deleting key:', error);
//         // If you want to dispatch an action in case of an error, do it here:
//         // dispatch(someErrorAction());
//       });
//   };

  // return (dispatch:Dispatch) => {

  //   const jsonDB = "http://localhost:3004";
  //   const route = `${jsonDB}/${key}`;

  //   return fetch(route, {
  //     method: 'DELETE',
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       // dispatch(deleteObjectSuccess(objectId));
  //     })
  //     .catch((error) => {
  //       console.log(error.message)
  //       // dispatch(deleteObjectFailure(error.message));
  //     });
  // };
// };

  

