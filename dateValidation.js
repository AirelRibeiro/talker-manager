// Proposta de validação encontrada no https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript

// function isLeafYear(year) {
//   if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) return true;
//   return false;
// }

// function isValidYear(year) {
//   if (year < 1000 || year > 3000) return false;
//   return true;
// }

// function isValidMonth(month) {
//   if (month === 0 || month > 12) return false;
// }

// function isValidFormat(date) {
//   if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) return false;

//   const parts = date.split('/');
//     const day = Number(parts[0]);
//     const month = Number(parts[1]);
//     const year = Number(parts[2]);
//     const monthForDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//     if (isLeafYear(year)) {
//      monthForDay[1] = 29;
//     }

//   return { day, month, year, monthForDay };
// }

function isValidDate(date) {
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) return true;
  return false;
}

module.exports = isValidDate;