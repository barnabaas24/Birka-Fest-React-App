import excel from "exceljs";
import { v4 as uuid } from "uuid";

console.log(uuid());

function generateRandomNumberSequence() {
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  const randomSequence = randomNumber.toString();

  return randomSequence;
}

export async function processExcelFile(filePath) {
  const workbook = new excel.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);

  const jsonData = [];
  const generatedIDs = [];
  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex == 1) return;
    const rowData = {};
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber == 1) {
        rowData["place"] = cell.value;
      }
      if (colNumber == 2) {
        rowData["name"] = cell.value;
      }
      if (colNumber == 3) {
        rowData["city"] = cell.value;
      }
      let id = generateRandomNumberSequence();
      while (generatedIDs.includes(id)) {
        id = generateRandomNumberSequence();
      }
      generatedIDs.push(id);
      rowData["barcode"] = id;
      console.log(id);
    });
    jsonData.push(rowData);
  });

  return jsonData;
}
