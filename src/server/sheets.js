/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const spreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/1GWh-B_IMmvNniy2p82CKQ9X-eepwx70BG50xCM5r2bo/edit#gid=0';

// https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
function getDateDif(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1;
}

function getSheets(url) {
  if (url) {
    return SpreadsheetApp.openByUrl(spreadsheetUrl).getSheets();
  }
  return SpreadsheetApp.getActive().getSheets();
}

// function getActiveSheetName(url) {
//   if (url) {
//     return SpreadsheetApp.openByUrl(url).getSheetName();
//   }
//   return SpreadsheetApp.getActive()
//     .getSheets()
//     .getSheetName();
// }

export const onEdit = e => {
  console.log('you edited the thing', e);

  const sheets = getSheets(false);
  const sheetValues = sheets.map(sheet => sheet.getDataRange().getValues());
  // eslint-disable-next-line no-unused-vars
  const [intake, clientData, paymentData, paymentOverviewData] = sheetValues;
  console.log('paymentData', paymentData);
  console.log('paymentOverviewData', paymentOverviewData);

  // for each item in payment overview, add to dictionary paymentId: rate
  paymentOverviewData.shift(); // removes first element
  const paymentRateDict = {};

  paymentOverviewData.forEach(row => {
    paymentRateDict[row[0]] = row[1];
  });

  console.log(paymentRateDict);

  paymentData.shift();
  // for each payment in payments, figure out how many days are from start to end
  paymentData.forEach(row => {
    const [clientId, paymentId, startDate, endDate] = row;
    const dateDif = getDateDif(startDate, endDate);
    console.log(
      'clientId, paymentId, startDate, endDate',
      clientId,
      paymentId,
      startDate,
      endDate
    );
    const cost = dateDif * paymentRateDict[paymentId];
    console.log('cost', cost);
    // const paymentId = row[]

    // using the paymentID, get the rate, and multiply it by the number of days
  });

  // make a new dictionary paymentId: total paid in that payment
  // make a new dictionary clientId: total paid on behalf of that client
};

export const getSheetsData = () => {
  // const activeSheetName = getActiveSheetName();
  return getSheets(true).map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      // isActive: name === activeSheetName,
    };
  });
};

export const getSheetValues = () => {
  // const activeSheetName = getActiveSheetName();
  return getSheets().map(sheet => {
    const name = sheet.getName();
    console.log('sheet.getDataRange()', sheet.getDataRange());
    return {
      name,
      data: sheet.getDataRange(),
      values: sheet.getDataRange().getValues(),
    };
  });
};

export const addSheet = sheetTitle => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = sheetIndex => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = sheetName => {
  SpreadsheetApp.getActive()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};
