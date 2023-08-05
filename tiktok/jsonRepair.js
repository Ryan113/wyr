const fs = require('fs');
const { jsonrepair } = require('jsonrepair');

const filePath = "../db.json";

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    const repairedJSON = jsonrepair(data);
    fs.writeFile(filePath, repairedJSON, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
        return;
      }
      console.log('JSON file repaired and saved successfully.');
    });
  } catch (err) {
    console.error('Error repairing JSON:', err);
  }
});
