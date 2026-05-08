// src/data/set4Questions.ts

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const set4Questions: Question[] = [
  {
    id: 1,
    text: "Which of the following is not one of the three 'Mail Merge Helper' steps?",
    options: ["Merge the two files", "Create the main document", "Set the mailing list parameters", "Create the data source"],
    correctAnswer: 2,
    explanation: "Mail Merge Helper has 3 steps: Create Main Document, Create Data Source, Merge the documents. 'Merge the two files' is not a step name."
  },
  {
    id: 2,
    text: "To change the default setting of MS Word 2007",
    options: ["Click options from Format Menu", "Click options from Tools Menu", "Click Word options from Office Button", "Click style on the standard Toolbar"],
    correctAnswer: 2,
    explanation: "In MS Word 2007, click the Office Button → Word Options to change settings."
  },
  {
    id: 3,
    text: "Word has a list of predefined typing, spelling, capitalizing and grammar errors that detect and correct",
    options: ["Auto entry", "Auto correct", "Auto add", "Auto spell"],
    correctAnswer: 1,
    explanation: "AutoCorrect automatically fixes common typing, spelling and grammar errors."
  },
  {
    id: 4,
    text: "Tool in word to apply same format to different character/paragraph",
    options: ["Format repeater", "Format poster", "Format painter", "Format generator"],
    correctAnswer: 2,
    explanation: "Format Painter copies formatting from one place and applies it to another."
  },
  {
    id: 5,
    text: "In MS Word, shortcut key CTRL+H is used to",
    options: ["Display the Replace Dialog Box", "Open the Spell Check Dialog Box", "Displays File Save Dialog Box", "None"],
    correctAnswer: 0,
    explanation: "Ctrl+H opens the Find and Replace dialog box with the Replace tab active."
  },
  {
    id: 6,
    text: "Word processing executable file is............",
    options: ["Word.exe", "Msword.exe", "Winword.exe", "Wordpro.exe"],
    correctAnswer: 2,
    explanation: "WINWORD.EXE is the executable file for Microsoft Word."
  },
  {
    id: 7,
    text: "Name the default windows application program that is used for creating programming batch files",
    options: ["WordPad", "C", "Notepad", "Paintbrush"],
    correctAnswer: 2,
    explanation: "Notepad is used to create batch files (.bat) and simple text files."
  },
  {
    id: 8,
    text: "A user cannot access a server in the domain. After troubleshooting, you determine that the user cannot access the server by name but can access the server by IP address. What is the most likely problem",
    options: ["Incorrectly defined IP address", "Incorrectly defined subnet mask", "Incorrectly defined DHCP server", "Incorrectly defined DNS"],
    correctAnswer: 3,
    explanation: "DNS resolves domain names to IP addresses. If DNS fails, names don't resolve but IPs work."
  },
  {
    id: 9,
    text: "Environment within which programs of computer system are executed?",
    options: ["Operating system", "ALU", "CPU", "Memory"],
    correctAnswer: 0,
    explanation: "The Operating System provides the environment for programs to execute."
  },
  {
    id: 10,
    text: "Which of the following is not a valid wildcard in MS DOS?",
    options: ["*", "/", ".", "?"],
    correctAnswer: 1,
    explanation: "Valid wildcards are * (any characters) and ? (single character). Dot (.) is not a wildcard."
  },
  {
    id: 11,
    text: "CHKDSK command is used to",
    options: ["Report the status of files on disk", "Analyze the hard disk error", "Diagnose the hard disk error", "All"],
    correctAnswer: 3,
    explanation: "CHKDSK checks disk status, analyzes and diagnoses disk errors."
  },
  {
    id: 12,
    text: "Which of the following file contains commands that are loaded during the booting process in MS DOS?",
    options: ["IO.SYS", "MSDOS.SYS", "COMMAND.COM", "CONFIG.SYS"],
    correctAnswer: 2,
    explanation: "COMMAND.COM contains the command interpreter loaded during boot."
  },
  {
    id: 13,
    text: "The full form of DNS is",
    options: ["Data Name Server", "Device Name Server", "Domain Name Server", "Dial-up Name Server"],
    correctAnswer: 2,
    explanation: "DNS = Domain Name System/Server."
  },
  {
    id: 14,
    text: "Which network topology would you find better for a reliable connectivity?",
    options: ["Bus topology", "Ring topology", "Star topology", "Mesh topology"],
    correctAnswer: 3,
    explanation: "Mesh topology provides multiple redundant paths - most reliable."
  },
  {
    id: 15,
    text: "........... invented the analytical engine.",
    options: ["Blaise Pascal", "George Boolean", "Charles Babbage", "Dr. Herman Hollerith"],
    correctAnswer: 2,
    explanation: "Charles Babbage invented the Analytical Engine - father of computer."
  },
  {
    id: 16,
    text: "Which of the following is private IP address",
    options: ["12.0.0.1", "168.172.19.39", "172.15.14.36", "192.168.24.43"],
    correctAnswer: 3,
    explanation: "Private IP ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x"
  },
  {
    id: 17,
    text: "DSL is an example of ............ connection",
    options: ["Network", "Wireless", "Slow", "Broadband"],
    correctAnswer: 3,
    explanation: "DSL (Digital Subscriber Line) is a broadband connection."
  },
  {
    id: 18,
    text: "The BIOS is an abbreviation of",
    options: ["Basic Input Output System", "Best Input Output System", "Basic Input Output Symbol", "Base Input Output System"],
    correctAnswer: 0,
    explanation: "BIOS = Basic Input/Output System."
  },
  {
    id: 19,
    text: "Two kinds of memory are",
    options: ["Primary and Secondary", "RAM and ROM", "Random and Sequential", "All"],
    correctAnswer: 0,
    explanation: "The two main types are Primary (RAM/ROM) and Secondary (Hard disk, SSD)."
  },
  {
    id: 20,
    text: "A fault in a computer program which prevents it from working correctly is known as",
    options: ["Boot", "Bug", "Biff", "Strap"],
    correctAnswer: 1,
    explanation: "A bug is an error or flaw in a computer program."
  },
  {
    id: 21,
    text: "In a microprocessor, data exchange between memory and CPU is done by",
    options: ["Control unit", "ALU", "Input unit", "Output unit"],
    correctAnswer: 0,
    explanation: "Control Unit manages data exchange between memory and CPU."
  },
  {
    id: 22,
    text: "Honeywell 800 is ...... generation computer",
    options: ["First generation", "Second generation", "Third generation", "Fourth generation"],
    correctAnswer: 1,
    explanation: "Honeywell 800 (1959) used transistors - Second generation."
  },
  {
    id: 23,
    text: "1 nibble equal to",
    options: ["1 bit", "2 bits", "4 bits", "8 bits"],
    correctAnswer: 2,
    explanation: "1 nibble = 4 bits, 1 byte = 8 bits = 2 nibbles."
  },
  {
    id: 24,
    text: "The first computer in Nepal was",
    options: ["IBM 1201", "IBM 1301", "IBM 1401", "IBM 1501"],
    correctAnswer: 2,
    explanation: "IBM 1401 was the first computer brought to Nepal in 1961."
  },
  {
    id: 25,
    text: "Title tag text display on......position on the webpage",
    options: ["Left", "Right", "Top", "Bottom"],
    correctAnswer: 2,
    explanation: "Title appears on the browser's title bar (top of the window)."
  },
  {
    id: 26,
    text: "Each row of a table is divided into data cells defined by following tag",
    options: ["<tr>...</tr>", "<td>...</td>", "<th>...</th>", "</table>...</table>"],
    correctAnswer: 1,
    explanation: "td = table data cell."
  },
  {
    id: 27,
    text: "How to make an element draggable?",
    options: ["<div drag='true'/>", "<div draggable='true'/>", "<div type='drag'/>", "<div type='draggable'/>"],
    correctAnswer: 1,
    explanation: "draggable='true' attribute makes an element draggable in HTML5."
  },
  {
    id: 28,
    text: "During a slide show, right-clicking anywhere on the screen enables the users to access the shortcut menu and choose.......to quickly move to specific slides in the presentation",
    options: ["Advance", "Custom Show", "Go to Slide", "Jump"],
    correctAnswer: 2,
    explanation: "Right-click → Go to Slide to navigate to specific slides."
  },
  {
    id: 29,
    text: "Which of the following will not advance the slides in the slide show view?",
    options: ["Esc key", "Spacebar", "Enter key", "Mouse button"],
    correctAnswer: 0,
    explanation: "Esc key exits the slideshow, it doesn't advance slides."
  },
  {
    id: 30,
    text: "Transitions applies on........",
    options: ["Character", "Text", "Sentence", "Slide"],
    correctAnswer: 3,
    explanation: "Transitions apply to entire slides, not individual elements."
  },
  {
    id: 31,
    text: "Special effects used to introduce slides in a presentation are called",
    options: ["Effects", "Custom Animations", "Transitions", "Present Animations"],
    correctAnswer: 2,
    explanation: "Transitions are effects that introduce slides during a presentation."
  },
  {
    id: 32,
    text: "Which of the following section does not exist in a slide layout?",
    options: ["Titles", "Lists", "Charts", "Animations"],
    correctAnswer: 3,
    explanation: "Animations section doesn't exist in basic slide layout structure."
  },
  {
    id: 33,
    text: "The clause in SQL that specifies that the query result should be sorted in ascending or descending order based on the values of one or more columns is",
    options: ["View", "Order by", "Group by", "Having"],
    correctAnswer: 1,
    explanation: "ORDER BY clause sorts query results."
  },
  {
    id: 34,
    text: "Which type of field is incremented automatically?",
    options: ["Auto Elevate", "Auto Number", "Auto Increment", "Auto Value"],
    correctAnswer: 1,
    explanation: "AutoNumber field in Access automatically increments."
  },
  {
    id: 35,
    text: "The common field linking the two datasheets is the...... key field in the main datasheet and ...... key field in the linked datasheet",
    options: ["Primary, foreign", "Primary, common", "Foreign, primary", "Foreign, common"],
    correctAnswer: 0,
    explanation: "Primary key in main table, foreign key in linked table."
  },
  {
    id: 36,
    text: "Before the development of DBMS, the data were stored in",
    options: ["Cloud System", "Data system", "File Management System", "None"],
    correctAnswer: 2,
    explanation: "Before DBMS, data was stored in File Management System (FMS)."
  },
  {
    id: 37,
    text: "What happens when you press shift+F10 in MS-Access?",
    options: ["Shortcut Menu is Displayed", "Access keys are displayed", "Program icon menu is displayed", "Save dialog box is displayed"],
    correctAnswer: 0,
    explanation: "Shift+F10 opens the context/shortcut menu."
  },
  {
    id: 38,
    text: "The extension of MS Access Database file is......",
    options: [".accbd", ".accdb", ".accmcb", ".accmdb"],
    correctAnswer: 1,
    explanation: ".accdb is the default extension for MS Access 2007+ databases."
  },
  {
    id: 39,
    text: "Which of the following data type is used to store large text and numbers?",
    options: ["Text", "Memo", "OLE", "Large text"],
    correctAnswer: 1,
    explanation: "Memo (Long Text) data type stores large amounts of text."
  },
  {
    id: 40,
    text: "The following are components of a database except",
    options: ["Indexes", "Metadata", "Reports", "User data"],
    correctAnswer: 2,
    explanation: "Reports are for output/printing, not a database component."
  },
  {
    id: 41,
    text: "Red triangle at top right corner of a cell indicates",
    options: ["There is an error in the cell", "The font color of the text in cell is red", "There is a comment associated with the cell", "The cell can't accept formula"],
    correctAnswer: 2,
    explanation: "Red triangle indicates a comment/note is attached to the cell."
  },
  {
    id: 42,
    text: "You can use horizontal and vertical scroll bars to",
    options: ["split a worksheet into two panes", "view different rows and columns", "edit the contents of a cell", "view different worksheets"],
    correctAnswer: 1,
    explanation: "Scroll bars let you navigate to different rows and columns."
  },
  {
    id: 43,
    text: "If the value in A1 is 'info' and B1 is 'psc.gov.np', which function will return info@psc.gov.np in C1?",
    options: ["=A1+\"@\"+B1", "=A1#\"@\"#B1", "=A1&\"@\"&B1", "=A1$\"@\"$B1"],
    correctAnswer: 2,
    explanation: "& is the concatenation operator in Excel."
  },
  {
    id: 44,
    text: "Which of the following is NOT a logical operator?",
    options: [">", "<", "=", "+"],
    correctAnswer: 3,
    explanation: "+ is an arithmetic operator. Logical operators are >, <, =, >=, <=, <>."
  },
  {
    id: 45,
    text: "The default header for a worksheet is",
    options: ["Page number", "Date and Time", "Sheet tab Name", "None"],
    correctAnswer: 3,
    explanation: "Excel has no default header - it's blank/None."
  },
  {
    id: 46,
    text: "Which function tallies all cells in a range whether the cell has a value or a label?",
    options: ["COUNT", "SUMA", "COUNTA", "Total"],
    correctAnswer: 2,
    explanation: "COUNTA counts all non-empty cells (both values and labels)."
  },
  {
    id: 47,
    text: "To insert three columns between columns D and E you would",
    options: ["Select Column D", "Select Column E", "Select columns E,F and G", "Select columns D,E and F"],
    correctAnswer: 2,
    explanation: "Select 3 columns (E,F,G) where you want to insert, then right-click Insert."
  },
  {
    id: 48,
    text: "Print pages (1-5, 7, 9-13) command will print............ pages",
    options: ["9", "10", "11", "12"],
    correctAnswer: 2,
    explanation: "1-5 = 5 pages + 7 = 1 page + 9-13 = 5 pages. Total = 11 pages."
  },
  {
    id: 49,
    text: "A....... is a dot or other symbol positioned at the beginning of the paragraph",
    options: ["Bullet", "Logo", "Cell", "Target"],
    correctAnswer: 0,
    explanation: "A bullet is a dot or symbol at the beginning of a paragraph."
  },
  {
    id: 50,
    text: "The shortcut key to count the pages/words/paragraphs/lines.............",
    options: ["Ctrl+M", "Ctrl+N", "Ctrl+Shift+G", "Ctrl+Shift+H"],
    correctAnswer: 2,
    explanation: "Ctrl+Shift+G opens the Word Count dialog box."
  }
];
