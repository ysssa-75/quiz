function doGet() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  const data = sheet.getDataRange().getValues();

    const quizData = data.slice(1).map(row => ({
    question: row[0],
    options: row[1].split(","),
    answer: row[2]
  }));
  return ContentService.createTextOutput(JSON.stringify(quizData))
    .setMimeType(ContentService.MimeType.JSON);
}
