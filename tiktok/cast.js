const { WebcastPushConnection } = require("tiktok-live-connector");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const fileName = "../db.json";

// Lock object to handle concurrent writes
let writeLock = false;

// Username of someone who is currently live
let tiktokUsername = "thuyrjkr";

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

const processedGifts = {};

tiktokLiveConnection.on("gift", async (data) => {
  // Check if a write operation is already in progress
  if (writeLock) {
    console.log(
      "Another write operation is in progress. Skipping this update."
    );
    return;
  }

  // Set the lock to prevent concurrent writes
  writeLock = true;

  let tikTikInfo = {};

  if (data.giftType === 1 && !data.repeatEnd) {
    // Check if the gift has already been processed
    if (!processedGifts[data.giftId]) {
      // Streak in progress => show only temporary
      console.log(
        `${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`
      );
    }
  } else {
    // Streak ended or non-streakable gift => process the gift with final repeat_count
    console.log(
      `${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`
    );

    tikTikInfo[uuidv4()] = {
      uniqueId: data.uniqueId,
      userId: data.userId,
      giftId: data.giftId,
      giftName: data.giftName,
      repeatCount: data.repeatCount,
    };

    // Mark the gift as processed to avoid duplicate logs
    processedGifts[data.giftId] = true;
  }

  // if (data.repeatEnd) {
  //   console.log(
  //     `${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`
  //   );

  //   console.log()

  //   tikTikInfo[uuidv4()] = {
  //     uniqueId: data.uniqueId,
  //     userId: data.userId,
  //     giftId: data.giftId,
  //     giftName: data.giftName,
  //     repeatCount: data.repeatCount,
  //   };

  // } else if (data.giftType !== 1)  {
  //   console.log(
  //     `${data.uniqueId} has sent gift ${data.giftName} it is not gift type 1`
  //   );
  //   tikTikInfo[uuidv4()] = {
  //       uniqueId: data.uniqueId,
  //       userId: data.userId,
  //       giftId: data.giftId,
  //       giftName: data.giftName,
  //       repeatCount: data.repeatCount,
  //   };
  // }

  try {
    // Read the JSON file and parse its contents into a data structure
    const file_data = await fs.readFile(fileName, "utf8");
    let dataObject = JSON.parse(file_data);

    // Update the existing dataObject with the new tikTikInfo
    Object.assign(dataObject, tikTikInfo);

    // Write the updated data structure back to the JSON file
    await fs.writeFile(fileName, JSON.stringify(dataObject, null, 2), "utf8");

    console.log("Data added successfully!");
  } catch (err) {
    console.error("Error reading or writing to the file:", err);
  } finally {
    // Release the lock after the write operation is completed
    writeLock = false;
  }
});
