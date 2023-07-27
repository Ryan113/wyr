const { WebcastPushConnection } = require("tiktok-live-connector");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const fileName = "../db.json";
import { ActionTypes } from '../src/actions/types' 
import { Dispatch } from 'redux'

// export const getGiftsData = () => {
//   return async (dispatch) => {
//     const response = await fetch("http://localhost:3004/db");
//     const data = await response.json();
//     console.log('Gifts Data:', data); // Log the data to check if it's fetched correctly.

//     dispatch<GetGiftsAction>({
//       type: ActionTypes.getGifts,
//       payload: data,
//     });
//   };
// };

export const getGiftsData = () => {
  return {
      type: ActionTypes.getQuestion,
      payload: { data: 'its here' }
  };
};

// /Users/ryangrover/Development/typescript/wyr/node_modules/redux

// Username of someone who is currently live
let tiktokUsername = "acrylicamari";

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });

//   dashmcash is sending gift Rose x1
//   dashmcash is sending gift Rose x3
//   dashmcash is sending gift Rose x5
//   dashmcash has sent gift Rose x5
//   dashmcash is sending gift Rose x1
//   dashmcash has sent gift Rose x1

tiktokLiveConnection.on("gift", (data) => {
    let tikTikInfo = {};
  
    if (data.giftType === 1 && !data.repeatEnd) {
      // Streak in progress => show only temporary
      console.log(
        `${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`
      );
  
      tikTikInfo[uuidv4()] = {
        uniqueId: data.uniqueId,
        userId: data.userId,
        giftId: data.giftId,
        repeatCount: data.repeatCount,
      };    
  
    } else if (data.giftType !== 1)  {
      console.log(
        `${data.uniqueId} has sent gift ${data.giftName} it is not gift type 1`
      );
      tikTikInfo[uuidv4()] = {
          uniqueId: data.uniqueId,
          userId: data.userId,
          giftId: data.giftId,
          repeatCount: data.repeatCount,
      };
    }
  
    // Step 1: Read the JSON file and parse its contents into a data structure
    fs.readFile(fileName, "utf8", (err, file_data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }
  
      let dataObject = JSON.parse(file_data);
  
      // Update the existing dataObject with the new tikTikInfo
      Object.assign(dataObject, tikTikInfo);
  
      // Step 3: Write the updated data structure back to the JSON file
      fs.writeFile(
        fileName,
        JSON.stringify(dataObject, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing to the file:", err);
            return;x``
          }
          console.log("Data added successfully!");
        }
      );
    });
  });

