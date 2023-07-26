const fs = require("fs");
const fileName = "../src/gift_data.json";

// Step 1: Read the JSON file and parse its contents into a data structure
fs.readFile(fileName, "utf8", (err, file_data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  let dataArray = JSON.parse(file_data);

  // Step 2: Modify the data structure by adding new objects
  let tikTikInfo = {};

  tikTikInfo['data.userId'] = {
    uniqueId: "turkey_sando",
    userId: 435345,
    giftId: 1,
    repeatCount: 7,
  };

  dataArray.push(tikTikInfo);

  // Step 3: Write the updated data structure back to the JSON file
  fs.writeFile(
    fileName,
    JSON.stringify(dataArray, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log("Data added successfully!");
    }
  );
});

