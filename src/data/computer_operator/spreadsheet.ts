import { Question } from "../questions";

export const spreadsheetQuestions: Question[] = [
  { id: "ss1", question: "In Excel, each cell is identified by?", options: ["Row number", "Column letter", "Cell address (e.g., A1)", "Sheet name"], correct: 2, explanation: "Cell is identified by address like A1." },
  { id: "ss2", question: "Which function finds the average?", options: ["=SUM()", "=AVG()", "=AVERAGE()", "=MEAN()"], correct: 2, explanation: "=AVERAGE() calculates average." },
  { id: "ss3", question: "Default file extension of Excel 2016?", options: [".xls", ".xlsx", ".csv", ".xlsm"], correct: 1, explanation: "Excel 2016 uses .xlsx extension." },
  { id: "ss4", question: "How many rows in Excel 2016?", options: ["65,536", "1,048,576", "256", "16,384"], correct: 1, explanation: "Excel 2016 has 1,048,576 rows." },
  { id: "ss5", question: "Which formula adds values?", options: ["=ADD()", "=SUM()", "=TOTAL()", "=PLUS()"], correct: 1, explanation: "=SUM() adds values." },
  { id: "ss6", question: "Ctrl+; inserts?", options: ["Current date", "Current time", "Page break", "Formula"], correct: 0, explanation: "Ctrl+; inserts current date." },
  { id: "ss7", question: "What does VLOOKUP do?", options: ["Vertical lookup in a table", "Visual lookup", "Value lookup", "Variable lookup"], correct: 0, explanation: "VLOOKUP performs vertical lookup." },
  { id: "ss8", question: "A workbook contains?", options: ["Cells", "Worksheets", "Rows", "Columns"], correct: 1, explanation: "Workbook contains worksheets." },
  { id: "ss9", question: "Which chart type is best for showing trends?", options: ["Pie", "Bar", "Line", "Scatter"], correct: 2, explanation: "Line chart is best for trends." },
  { id: "ss10", question: "=IF(A1>10,\"Yes\",\"No\") is an example of?", options: ["Logical function", "Math function", "Text function", "Lookup function"], correct: 0, explanation: "IF is a logical function." },
  { id: "ss11", question: "What is the default name of a new Excel workbook?", options: ["Book1", "Workbook1", "Sheet1", "Excel1"], correct: 0, explanation: "New workbook is named Book1." },
  { id: "ss12", question: "Which function counts numbers in a range?", options: ["COUNT", "COUNTA", "COUNTIF", "COUNTBLANK"], correct: 0, explanation: "COUNT counts numeric cells." },
  { id: "ss13", question: "What does $A$1 represent?", options: ["Absolute reference", "Relative reference", "Mixed reference", "Cell value"], correct: 0, explanation: "$A$1 is an absolute reference." },
  { id: "ss14", question: "Which key is used to edit a cell?", options: ["F2", "F3", "F4", "F5"], correct: 0, explanation: "F2 edits the active cell." },
  { id: "ss15", question: "What is the maximum number of columns in Excel?", options: ["16,384", "65,536", "256", "1,048,576"], correct: 0, explanation: "Excel has 16,384 columns (XFD)." },
  { id: "ss16", question: "Which function finds the highest value?", options: ["MAX", "MIN", "SUM", "AVERAGE"], correct: 0, explanation: "MAX finds the highest value." },
  { id: "ss17", question: "What is the shortcut for Save?", options: ["Ctrl+S", "Ctrl+Z", "Ctrl+X", "Ctrl+V"], correct: 0, explanation: "Ctrl+S saves the workbook." },
  { id: "ss18", question: "Which tab contains the PivotTable option?", options: ["Insert", "Data", "Home", "View"], correct: 0, explanation: "Insert tab contains PivotTable." },
  { id: "ss19", question: "What is the function of Freeze Panes?", options: ["Lock rows/columns", "Hide rows/columns", "Delete rows/columns", "Insert rows/columns"], correct: 0, explanation: "Freeze Panes locks rows/columns while scrolling." },
  { id: "ss20", question: "Which chart type shows proportions of a whole?", options: ["Pie", "Bar", "Line", "Column"], correct: 0, explanation: "Pie chart shows proportions of a whole." },
];
