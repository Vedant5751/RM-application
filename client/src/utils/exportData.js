// utils/exportData.js
import { utils, writeFile } from "xlsx";

export const exportToExcel = (data, fileName) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Employees");

  writeFile(workbook, `${fileName}.xlsx`);
};
