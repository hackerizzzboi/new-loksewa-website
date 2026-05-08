// src/data/questions.ts

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface QuestionSet {
  id: string;
  title: string;
  titleNp?: string;
  questions: Question[];
  timeMinutes?: number;
  negativeMarking?: number;
}

// Helper to shuffle
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== EXPORT ALL QUESTION BANKS =====
export * from "./computer_operator";
// REMOVED: export * from "./online_exam"; - Causes circular dependency

// ===== PRACTICE QUESTIONS BY SUBJECT =====

export const practiceSubjects: { id: string; title: string; titleNp?: string; icon: string; color: string; questionCount: number }[] = [
  { id: "general-awareness", title: "General Awareness", titleNp: "सामान्य ज्ञान", icon: "🌍", color: "quick-card-amber", questionCount: 10 },
  { id: "public-management", title: "Public Management", titleNp: "सार्वजनिक व्यवस्थापन", icon: "🏛️", color: "quick-card-purple", questionCount: 10 },
  { id: "computer-fundamentals", title: "Computer Fundamentals", titleNp: "कम्प्युटर आधारभूत", icon: "💻", color: "quick-card-navy", questionCount: 10 },
  { id: "operating-system", title: "Operating System", icon: "🖥️", color: "quick-card-teal", questionCount: 10 },
  { id: "word-processor", title: "Word Processor", icon: "📝", color: "quick-card-red", questionCount: 10 },
  { id: "spreadsheet", title: "Electronic Spreadsheet", icon: "📊", color: "quick-card-green", questionCount: 10 },
  { id: "dbms", title: "Database Management System", icon: "🗄️", color: "quick-card-pink", questionCount: 10 },
  { id: "presentation", title: "Presentation System", icon: "📽️", color: "quick-card-amber", questionCount: 10 },
  { id: "web-design", title: "Web Designing & Social Media", icon: "🌐", color: "quick-card-teal", questionCount: 10 },
  { id: "networking", title: "Computer Network", icon: "🔗", color: "quick-card-navy", questionCount: 10 },
  { id: "cyber-security", title: "Cyber Security", icon: "🔒", color: "quick-card-red", questionCount: 10 },
  { id: "hardware", title: "Hardware Maintenance", icon: "🔧", color: "quick-card-green", questionCount: 10 },
  { id: "legislation", title: "Related Legislations", titleNp: "सम्बन्धित कानून", icon: "⚖️", color: "quick-card-purple", questionCount: 10 },
];

export const practiceQuestions: Record<string, Question[]> = {
  "general-awareness": [
    { id: "ga1", question: "नेपालको संविधान कुन साल जारी भयो?", options: ["२०७२", "२०७०", "२०६३", "२०७५"], correct: 0, explanation: "नेपालको संविधान २०७२ असोज ३ मा जारी भयो।" },
    { id: "ga2", question: "नेपालमा कति प्रदेश छन्?", options: ["५", "६", "७", "८"], correct: 2, explanation: "नेपालमा ७ वटा प्रदेश छन्।" },
    { id: "ga3", question: "लोक सेवा आयोगको अध्यक्ष कसले नियुक्त गर्छ?", options: ["प्रधानमन्त्री", "राष्ट्रपति", "सभामुख", "प्रधान न्यायाधीश"], correct: 1 },
    { id: "ga4", question: "नेपालको राष्ट्रिय फूल कुन हो?", options: ["गुराँस", "गोदावरी", "सूर्यमुखी", "कमल"], correct: 0 },
    { id: "ga5", question: "नेपालको क्षेत्रफल कति वर्ग किलोमिटर छ?", options: ["1,47,181", "1,27,181", "1,57,181", "1,37,181"], correct: 0 },
    { id: "ga6", question: "संयुक्त राष्ट्र संघको मुख्यालय कहाँ छ?", options: ["जेनेभा", "न्युयोर्क", "लन्डन", "पेरिस"], correct: 1 },
    { id: "ga7", question: "नेपालको राष्ट्रिय पशु कुन हो?", options: ["बाघ", "गैंडा", "गाईवस्तु", "हात्ती"], correct: 2 },
    { id: "ga8", question: "सगरमाथाको उचाइ कति हो?", options: ["8848.86 m", "8846.86 m", "8850.86 m", "8840.86 m"], correct: 0 },
    { id: "ga9", question: "नेपालमा लोकतन्त्र कुन सालमा पुनःस्थापना भयो?", options: ["२०४६", "२०६३", "२०७२", "२०५७"], correct: 0 },
    { id: "ga10", question: "WHO को पूर्ण रूप के हो?", options: ["World Health Organization", "World Human Organization", "World Help Organization", "World Hygiene Organization"], correct: 0 },
  ],
  "public-management": [
    { id: "pm1", question: "नेपालको निजामती सेवा ऐन कुन सालको हो?", options: ["२०४९", "२०५०", "२०४६", "२०५५"], correct: 0 },
    { id: "pm2", question: "Good Governance को नेपालीमा के भनिन्छ?", options: ["सुशासन", "शासन", "राज्य", "प्रशासन"], correct: 0 },
    { id: "pm3", question: "लोक सेवा आयोग नेपालको संविधानको कुन धारामा परेको छ?", options: ["धारा 242", "धारा 243", "धारा 244", "धारा 245"], correct: 2 },
    { id: "pm4", question: "E-Governance भनेको के हो?", options: ["Electronic Governance", "Email Governance", "Emergency Governance", "Economic Governance"], correct: 0 },
    { id: "pm5", question: "POSDCORB मा P ले के जनाउँछ?", options: ["Planning", "Programming", "Policy", "Process"], correct: 0 },
    { id: "pm6", question: "नेपालमा सूचनाको हक कुन ऐनले प्रदान गर्छ?", options: ["सूचनाको हक सम्बन्धी ऐन, २०६४", "सूचनाको हक ऐन, २०७२", "मिडिया ऐन, २०६०", "प्रेस ऐन, २०५०"], correct: 0 },
    { id: "pm7", question: "Bureaucracy शब्दको जनक कसलाई मानिन्छ?", options: ["Max Weber", "Henri Fayol", "F.W. Taylor", "Adam Smith"], correct: 0 },
    { id: "pm8", question: "नेपालको प्रशासनिक संरचनामा कतिवटा मन्त्रालय छन् (लगभग)?", options: ["२५", "२०", "३०", "१५"], correct: 0 },
    { id: "pm9", question: "Decentralization को अर्थ के हो?", options: ["विकेन्द्रीकरण", "केन्द्रीकरण", "निजीकरण", "राष्ट्रियकरण"], correct: 0 },
    { id: "pm10", question: "नेपालको स्थानीय सरकार सञ्चालन ऐन कुन सालको हो?", options: ["२०७४", "२०७२", "२०७०", "२०७५"], correct: 0 },
  ],
  "computer-fundamentals": [
    { id: "cf1", question: "Which is the fastest memory in a computer?", options: ["RAM", "Hard Disk", "Cache Memory", "ROM"], correct: 2, explanation: "Cache memory is closest to the CPU and fastest." },
    { id: "cf2", question: "CPU stands for?", options: ["Central Processing Unit", "Central Program Unit", "Computer Personal Unit", "Central Peripheral Unit"], correct: 0 },
    { id: "cf3", question: "1 KB equals?", options: ["1024 Bytes", "1000 Bytes", "512 Bytes", "2048 Bytes"], correct: 0 },
    { id: "cf4", question: "Which generation used Integrated Circuits?", options: ["First", "Second", "Third", "Fourth"], correct: 2 },
    { id: "cf5", question: "Binary number system has base?", options: ["2", "8", "10", "16"], correct: 0 },
    { id: "cf6", question: "Which is an output device?", options: ["Keyboard", "Mouse", "Monitor", "Scanner"], correct: 2 },
    { id: "cf7", question: "ALU stands for?", options: ["Arithmetic Logic Unit", "Array Logic Unit", "Application Logic Unit", "Analog Logic Unit"], correct: 0 },
    { id: "cf8", question: "Which is volatile memory?", options: ["ROM", "RAM", "Hard Disk", "CD-ROM"], correct: 1 },
    { id: "cf9", question: "USB stands for?", options: ["Universal Serial Bus", "United Serial Bus", "Universal System Bus", "Uniform Serial Bus"], correct: 0 },
    { id: "cf10", question: "BIOS stands for?", options: ["Basic Input Output System", "Binary Input Output System", "Basic Internal Output System", "Basic Input Operation System"], correct: 0 },
  ],
  "operating-system": [
    { id: "os1", question: "Which is not an operating system?", options: ["Windows", "Linux", "Oracle", "macOS"], correct: 2 },
    { id: "os2", question: "Linux kernel was developed by?", options: ["Linus Torvalds", "Bill Gates", "Steve Jobs", "Dennis Ritchie"], correct: 0 },
    { id: "os3", question: "Which command lists files in Linux?", options: ["ls", "dir", "list", "show"], correct: 0 },
    { id: "os4", question: "In Windows, Ctrl+Alt+Del is used for?", options: ["Copy", "Task Manager/Security", "Paste", "Undo"], correct: 1 },
    { id: "os5", question: "What is the function of an OS?", options: ["Memory Management", "Process Management", "File Management", "All of the above"], correct: 3 },
    { id: "os6", question: "Which is a multi-user operating system?", options: ["MS-DOS", "Windows 95", "Unix", "Windows 3.1"], correct: 2 },
    { id: "os7", question: "File extension .exe indicates?", options: ["Executable file", "Text file", "Image file", "Audio file"], correct: 0 },
    { id: "os8", question: "Which Linux command changes directory?", options: ["cd", "md", "mv", "rm"], correct: 0 },
    { id: "os9", question: "Virtual memory uses?", options: ["RAM only", "Hard disk as extended RAM", "Cache only", "ROM"], correct: 1 },
    { id: "os10", question: "GUI stands for?", options: ["Graphical User Interface", "General User Interface", "Graphical Unified Interface", "General Unified Input"], correct: 0 },
  ],
  "word-processor": [
    { id: "wp1", question: "Ctrl+B is used for?", options: ["Bold", "Bookmark", "Border", "Break"], correct: 0 },
    { id: "wp2", question: "Which is a word processor?", options: ["MS Excel", "MS Word", "MS Access", "MS PowerPoint"], correct: 1 },
    { id: "wp3", question: "Mail Merge is used for?", options: ["Sending same letter to multiple recipients", "Merging two documents", "Email integration", "Printing"], correct: 0 },
    { id: "wp4", question: "Default file extension of MS Word 2016?", options: [".docx", ".doc", ".txt", ".rtf"], correct: 0 },
    { id: "wp5", question: "Ctrl+Z is used for?", options: ["Zoom", "Undo", "Close", "New"], correct: 1 },
    { id: "wp6", question: "Header and Footer appear on?", options: ["First page only", "Last page only", "Every page", "Alternate pages"], correct: 2 },
    { id: "wp7", question: "Which view shows the document as it will print?", options: ["Normal", "Print Layout", "Outline", "Web Layout"], correct: 1 },
    { id: "wp8", question: "To create a table in Word, go to?", options: ["Insert > Table", "Home > Table", "View > Table", "Design > Table"], correct: 0 },
    { id: "wp9", question: "Ctrl+P is used for?", options: ["Paste", "Print", "Page Setup", "Preview"], correct: 1 },
    { id: "wp10", question: "Which is NOT a text alignment?", options: ["Left", "Center", "Right", "Top"], correct: 3 },
  ],
  "spreadsheet": [
    { id: "ss1", question: "In Excel, each cell is identified by?", options: ["Row number", "Column letter", "Cell address (e.g., A1)", "Sheet name"], correct: 2 },
    { id: "ss2", question: "Which function finds the average?", options: ["=SUM()", "=AVG()", "=AVERAGE()", "=MEAN()"], correct: 2 },
    { id: "ss3", question: "Default file extension of Excel 2016?", options: [".xls", ".xlsx", ".csv", ".xlsm"], correct: 1 },
    { id: "ss4", question: "How many rows in Excel 2016?", options: ["65,536", "1,048,576", "256", "16,384"], correct: 1 },
    { id: "ss5", question: "Which formula adds values?", options: ["=ADD()", "=SUM()", "=TOTAL()", "=PLUS()"], correct: 1 },
    { id: "ss6", question: "Ctrl+; inserts?", options: ["Current date", "Current time", "Page break", "Formula"], correct: 0 },
    { id: "ss7", question: "What does VLOOKUP do?", options: ["Vertical lookup in a table", "Visual lookup", "Value lookup", "Variable lookup"], correct: 0 },
    { id: "ss8", question: "A workbook contains?", options: ["Cells", "Worksheets", "Rows", "Columns"], correct: 1 },
    { id: "ss9", question: "Which chart type is best for showing trends?", options: ["Pie", "Bar", "Line", "Scatter"], correct: 2 },
    { id: "ss10", question: "=IF(A1>10,\"Yes\",\"No\") is an example of?", options: ["Logical function", "Math function", "Text function", "Lookup function"], correct: 0 },
  ],
  "dbms": [
    { id: "db1", question: "DBMS stands for?", options: ["Database Management System", "Data Basic Management System", "Database Maintenance System", "Data Backup Management System"], correct: 0 },
    { id: "db2", question: "SQL stands for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0 },
    { id: "db3", question: "Which is NOT a type of database model?", options: ["Relational", "Hierarchical", "Sequential", "Network"], correct: 2 },
    { id: "db4", question: "Primary key must be?", options: ["Unique", "Null", "Duplicate", "Blank"], correct: 0 },
    { id: "db5", question: "Which command retrieves data?", options: ["INSERT", "SELECT", "UPDATE", "DELETE"], correct: 1 },
    { id: "db6", question: "Which is a RDBMS?", options: ["MS Access", "Notepad", "Paint", "Calculator"], correct: 0 },
    { id: "db7", question: "Foreign key is used for?", options: ["Linking two tables", "Primary identification", "Indexing", "Sorting"], correct: 0 },
    { id: "db8", question: "Normalization is used to?", options: ["Remove redundancy", "Add data", "Delete data", "Create tables"], correct: 0 },
    { id: "db9", question: "Which is a DML command?", options: ["CREATE", "ALTER", "INSERT", "DROP"], correct: 2 },
    { id: "db10", question: "A row in a table is called?", options: ["Field", "Record/Tuple", "Column", "Key"], correct: 1 },
  ],
  "presentation": [
    { id: "pr1", question: "MS PowerPoint is used for?", options: ["Spreadsheets", "Presentations", "Databases", "Word Processing"], correct: 1 },
    { id: "pr2", question: "Default file extension of PowerPoint 2016?", options: [".ppt", ".pptx", ".ppsx", ".pps"], correct: 1 },
    { id: "pr3", question: "F5 key in PowerPoint starts?", options: ["New slide", "Slide show", "Print", "Save"], correct: 1 },
    { id: "pr4", question: "Animation in PowerPoint is used for?", options: ["Adding motion effects", "Printing", "Creating charts", "Editing text"], correct: 0 },
    { id: "pr5", question: "Slide transition refers to?", options: ["Effect between slides", "Text formatting", "Adding images", "Slide deletion"], correct: 0 },
    { id: "pr6", question: "Which view shows all slides as thumbnails?", options: ["Normal", "Slide Sorter", "Outline", "Reading"], correct: 1 },
    { id: "pr7", question: "To insert a new slide, press?", options: ["Ctrl+N", "Ctrl+M", "Ctrl+S", "Ctrl+P"], correct: 1 },
    { id: "pr8", question: "Master slide controls?", options: ["Overall slide design", "Individual slide content", "Animations only", "Transitions only"], correct: 0 },
    { id: "pr9", question: "Which object can be inserted in a slide?", options: ["Table", "Chart", "Video", "All of the above"], correct: 3 },
    { id: "pr10", question: "Ctrl+D in PowerPoint?", options: ["Delete slide", "Duplicate slide", "Design slide", "Display slide"], correct: 1 },
  ],
  "web-design": [
    { id: "wd1", question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tool Markup Language", "Hyper Text Main Language"], correct: 0 },
    { id: "wd2", question: "Which tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
    { id: "wd3", question: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Cascading System Styles"], correct: 0 },
    { id: "wd4", question: "Which is a CMS?", options: ["WordPress", "Photoshop", "Excel", "AutoCAD"], correct: 0 },
    { id: "wd5", question: "Which tag is used for largest heading?", options: ["<h6>", "<h1>", "<heading>", "<head>"], correct: 1 },
    { id: "wd6", question: "Which is NOT a social media platform?", options: ["Facebook", "Twitter", "Oracle", "Instagram"], correct: 2 },
    { id: "wd7", question: "URL stands for?", options: ["Uniform Resource Locator", "Universal Resource Link", "Unified Resource Locator", "Universal Resource Locator"], correct: 0 },
    { id: "wd8", question: "Which tag creates an ordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correct: 1 },
    { id: "wd9", question: "FTP is used for?", options: ["File Transfer", "Email", "Video Call", "Web Browsing"], correct: 0 },
    { id: "wd10", question: "Which attribute sets image source in HTML?", options: ["href", "src", "link", "source"], correct: 1 },
  ],
  "networking": [
    { id: "nw1", question: "LAN stands for?", options: ["Local Area Network", "Large Area Network", "Long Area Network", "Linked Area Network"], correct: 0 },
    { id: "nw2", question: "Which device connects different networks?", options: ["Hub", "Switch", "Router", "Repeater"], correct: 2 },
    { id: "nw3", question: "IP address has how many octets (IPv4)", options: ["2", "3", "4", "6"], correct: 2 },
    { id: "nw4", question: "Which topology has a central hub?", options: ["Bus", "Star", "Ring", "Mesh"], correct: 1 },
    { id: "nw5", question: "HTTP port number is?", options: ["21", "25", "80", "443"], correct: 2 },
    { id: "nw6", question: "Which protocol is used for email?", options: ["HTTP", "FTP", "SMTP", "TCP"], correct: 2 },
    { id: "nw7", question: "OSI model has how many layers?", options: ["5", "6", "7", "8"], correct: 2 },
    { id: "nw8", question: "DNS converts?", options: ["Domain name to IP", "IP to MAC", "MAC to IP", "Domain to MAC"], correct: 0 },
    { id: "nw9", question: "Which cable uses light signals?", options: ["Coaxial", "Twisted Pair", "Fiber Optic", "Ethernet"], correct: 2 },
    { id: "nw10", question: "Wi-Fi standard is?", options: ["IEEE 802.3", "IEEE 802.11", "IEEE 802.5", "IEEE 802.15"], correct: 1 },
  ],
  "cyber-security": [
    { id: "cs1", question: "A firewall is used for?", options: ["Network security", "Data storage", "Printing", "Email"], correct: 0 },
    { id: "cs2", question: "Phishing is a type of?", options: ["Fishing technique", "Social engineering attack", "Virus", "Hardware failure"], correct: 1 },
    { id: "cs3", question: "Which is NOT a type of malware?", options: ["Virus", "Trojan", "Firewall", "Worm"], correct: 2 },
    { id: "cs4", question: "SSL stands for?", options: ["Secure Socket Layer", "System Security Layer", "Secure System Link", "Standard Socket Layer"], correct: 0 },
    { id: "cs5", question: "Strong password should contain?", options: ["Only numbers", "Only letters", "Mix of letters, numbers, symbols", "Only symbols"], correct: 2 },
    { id: "cs6", question: "DDoS stands for?", options: ["Distributed Denial of Service", "Direct Denial of Service", "Data Denial of Service", "Digital Denial of Service"], correct: 0 },
    { id: "cs7", question: "Encryption converts data into?", options: ["Plain text", "Cipher text", "Binary", "Hexadecimal"], correct: 1 },
    { id: "cs8", question: "Which is an antivirus software?", options: ["Kaspersky", "Photoshop", "Excel", "Chrome"], correct: 0 },
    { id: "cs9", question: "Two-factor authentication uses?", options: ["One verification method", "Two verification methods", "No verification", "Three methods"], correct: 1 },
    { id: "cs10", question: "Digital signature ensures?", options: ["Authenticity", "Speed", "Storage", "Printing"], correct: 0 },
  ],
  "hardware": [
    { id: "hw1", question: "UPS stands for?", options: ["Uninterruptible Power Supply", "Universal Power System", "Unified Power Supply", "Unit Power System"], correct: 0 },
    { id: "hw2", question: "Which is an input device?", options: ["Printer", "Monitor", "Scanner", "Speaker"], correct: 2 },
    { id: "hw3", question: "SSD stands for?", options: ["Solid State Drive", "System Storage Device", "Solid System Disk", "Standard State Drive"], correct: 0 },
    { id: "hw4", question: "Which port is used for display?", options: ["USB", "HDMI", "Ethernet", "Audio Jack"], correct: 1 },
    { id: "hw5", question: "Motherboard is also called?", options: ["System board", "Circuit board", "Main board", "All of the above"], correct: 3 },
    { id: "hw6", question: "Laser printer uses?", options: ["Ink cartridge", "Toner", "Ribbon", "Thermal paper"], correct: 1 },
    { id: "hw7", question: "RAM is measured in?", options: ["Hertz", "Gigabytes", "Watts", "Inches"], correct: 1 },
    { id: "hw8", question: "Which component cools the CPU?", options: ["PSU", "Heat sink/fan", "GPU", "RAM"], correct: 1 },
    { id: "hw9", question: "Blue screen error in Windows indicates?", options: ["Software update", "Critical system error", "Normal operation", "Low battery"], correct: 1 },
    { id: "hw10", question: "Device driver is?", options: ["Hardware component", "Software for hardware communication", "Type of virus", "Network device"], correct: 1 },
  ],
  "legislation": [
    { id: "lg1", question: "Electronic Transaction Act Nepal was enacted in?", options: ["2063 BS", "2072 BS", "2060 BS", "2075 BS"], correct: 0 },
    { id: "lg2", question: "ICT Policy Nepal was introduced in?", options: ["2072 BS", "2063 BS", "2070 BS", "2075 BS"], correct: 0 },
    { id: "lg3", question: "NITC stands for?", options: ["National Information Technology Center", "Nepal IT Commission", "National IT Council", "Nepal Information Tech Center"], correct: 0 },
    { id: "lg4", question: "Digital signature in Nepal is governed by?", options: ["Electronic Transaction Act", "IT Policy", "Copyright Act", "Cyber Crime Act"], correct: 0 },
    { id: "lg5", question: "Which institution regulates telecom in Nepal?", options: ["NTA", "NITC", "DoIT", "MoCIT"], correct: 0, explanation: "Nepal Telecommunications Authority (NTA)" },
    { id: "lg6", question: "E-Governance Master Plan Nepal aims for?", options: ["Digital government services", "Paper-based governance", "Military operations", "Space research"], correct: 0 },
    { id: "lg7", question: "Cyber crime in Nepal is punishable under?", options: ["Electronic Transaction Act", "Civil Code", "Military Act", "Forest Act"], correct: 0 },
    { id: "lg8", question: "NTA was established in?", options: ["2054 BS", "2060 BS", "2050 BS", "2063 BS"], correct: 0 },
    { id: "lg9", question: "Which body implements IT projects in Nepal government?", options: ["DoIT", "NPC", "NRB", "CBS"], correct: 0 },
    { id: "lg10", question: "Broadband Policy Nepal targets?", options: ["Internet access for all", "TV broadcast", "Radio frequency", "Satellite launch"], correct: 0 },
  ],
};

// ===== OLD IS GOLD SETS (SORTED BY YEAR ASCENDING - OLDEST TO NEWEST, RE-NUMBERED) =====
export const oldIsGoldSets: { id: string; title: string; year: string; isBonus?: boolean }[] = [
  // २०७०
  { id: "set-1", title: "नेपाल प्रहरी कम्प्युटर अपरेटर", year: "२०७०", isBonus: false },
  
  // २०७१
  { id: "set-2", title: "खाद्य संस्थान क.अ.", year: "२०७१", isBonus: false },
  
  // २०७२
  { id: "set-3", title: "लोक सेवा आयोग कम्प्युटर अपरेटर", year: "२०७२", isBonus: false },
  
  // २०७३
  { id: "set-4", title: "नेपाल मानव अधिकार आयोग अपरेटर", year: "२०७३", isBonus: false },
  { id: "set-5", title: "लोक सेवा आयोग सहायक कम्प्युटर अपरेटर", year: "२०७३", isBonus: false },
  { id: "set-6", title: "लोक सेवा आयोग सहायक कम्प्युटर अपरेटर", year: "२०७३", isBonus: false },
  { id: "set-7", title: "लोक सेवा क.अ.", year: "२०७३", isBonus: false },
  { id: "set-8", title: "पारवहन क.अ.", year: "२०७३", isBonus: false },
  { id: "set-9", title: "आयल निगम क.अ.", year: "२०७३", isBonus: false },
  
  // २०७४
  { id: "set-10", title: "बीमा संस्थान कम्प्युटर सहायक", year: "२०७४", isBonus: false },
  { id: "set-11", title: "KUKL ACO", year: "२०७४", isBonus: false },
  { id: "set-12", title: "नागरिक लगानी कोष कम्प्युटर अपरेटर", year: "२०७४", isBonus: false },
  { id: "set-13", title: "निक्षेप तथा कर्जा सुरक्षण कोष", year: "२०७४", isBonus: false },
  { id: "set-14", title: "Nepal Army", year: "२०७४", isBonus: false },
  { id: "set-15", title: "Sushil Koirala Memorial Hospital", year: "२०७४", isBonus: false },
  { id: "set-16", title: "राष्ट्रिय कृषि अनुसन्धान परिषद्", year: "२०७४", isBonus: false },
  { id: "set-17", title: "लोक सेवा सहायक कम्प्युटर अपरेटर", year: "२०७४", isBonus: false },
  { id: "set-18", title: "सांस्कृतिक संस्थान क.अ.", year: "२०७४", isBonus: false },
  { id: "set-19", title: "टिम्बर कर्पोरेशन स.क.अ.", year: "२०७४", isBonus: false },
  
  // २०७५
  { id: "set-20", title: "KUKL Computer Operator", year: "२०७५", isBonus: false },
  { id: "set-21", title: "DDC CO", year: "२०७५", isBonus: false },
  { id: "set-22", title: "DDC ACO", year: "२०७५", isBonus: false },
  { id: "set-23", title: "नेपाल आयल निगम स.क.अ.", year: "२०७५", isBonus: false },
  { id: "set-24", title: "लोक सेवा स. क.अ.", year: "२०७५", isBonus: false },
  { id: "set-25", title: "लोक सेवा क.अ.", year: "२०७५", isBonus: false },
  
  // २०७६
  { id: "set-26", title: "सामाजिक सुरक्षा कोष", year: "२०७६", isBonus: false },
  { id: "set-27", title: "स्थानीय पाँचौ तह कम्प्युटर अपरेटर", year: "२०७६", isBonus: false },
  { id: "set-28", title: "स्थानीय स.क.अ.", year: "२०७६", isBonus: false },
  { id: "set-29", title: "सामाजिक सुरक्षा कोष स.क.अ", year: "२०७६", isBonus: false },
  { id: "set-30", title: "नेपाल प्रहरी प्र.ना.नि", year: "२०७६", isBonus: false },
  
  // २०७७
  { id: "set-31", title: "बागमती प्रदेश स.क.अ.", year: "२०७७", isBonus: false },
  { id: "set-32", title: "बागमती प्रदेश क.अ.", year: "२०७७", isBonus: false },
  { id: "set-33", title: "KUKL क.अ.", year: "२०७७", isBonus: false },
  
  // २०७८
  { id: "set-34", title: "नेपाल आयल निगम कम्प्युटर अपरेटर", year: "२०७८", isBonus: false },
  { id: "set-35", title: "प्रदेश नं. १ कम्प्युटर अपरेटर", year: "२०७८", isBonus: false },
  { id: "set-36", title: "कम्प्युटर अपरेटर संसद", year: "२०७८", isBonus: false },
  { id: "set-37", title: "बागमती प्रदेश क.अ.", year: "२०७८", isBonus: false },
  { id: "set-38", title: "लोक सेवा स.क.अ", year: "२०७८", isBonus: false },
  { id: "set-39", title: "लोक सेवा क.अ.", year: "२०७८", isBonus: false },
  { id: "set-40", title: "नेपाली सेना प्रा. अ.म.", year: "२०७८", isBonus: false },
  { id: "set-41", title: "नेपाल प्रहरी प्र.स. नि", year: "२०७८", isBonus: false },
  { id: "set-42", title: "चिया कफी विकास बोर्ड क.अ.", year: "२०७८", isBonus: false },
  { id: "set-43", title: "KUKL क.अ.", year: "२०७८", isBonus: false },
  
  // २०७९
  { id: "set-44", title: "कर्णाली कम्प्युटर अपरेटर", year: "२०७९-०२-१५", isBonus: false },
  { id: "set-45", title: "कर्णाली सहायक कम्प्युटर अपरेटर", year: "२०७९-०३-२९", isBonus: false },
  { id: "set-46", title: "साझा यातायात कम्प्युटर अपरेटर", year: "२०७९", isBonus: false },
  { id: "set-47", title: "नेपाल पारवहन तथा गोदाम व्यवस्था क. लि. कम्प्युटर अपरेटर", year: "२०७९", isBonus: false },
  { id: "set-48", title: "लोक सेवा कम्प्युटर अपरेटर", year: "२०७९।११।२९", isBonus: false },
  { id: "set-49", title: "कोसी प्रदेश कम्प्युटर अपरेटर", year: "२०७९-८०", isBonus: false },
  { id: "set-50", title: "साझा यातायात स.क.अ.", year: "२०७९", isBonus: false },
  { id: "set-51", title: "कर्णाली प्रदेश क.अ.", year: "२०७९-१२-१९", isBonus: false },
  
  // २०८०
  { id: "set-52", title: "लुम्बिनी प्रदेश पाँचौं तह क.अ.", year: "२०८०", isBonus: false },
  { id: "set-53", title: "कोसी प्रदेश चौथो तह क.अ.", year: "२०८०", isBonus: false },
  { id: "set-54", title: "सुदूरपश्चिम प्रदेश क.अ.", year: "२०८०", isBonus: false },
  { id: "set-55", title: "कर्णाली प्रदेश स. क.अ.", year: "२०८०-०२-०८", isBonus: false },
  
  // २०८१
  { id: "set-56", title: "कर्णाली प्रदेश क.अ.", year: "२०८१-०१-०८", isBonus: false },
  { id: "set-57", title: "लुम्बिनी प्रदेश क.अ.", year: "२०८१-०१-१९", isBonus: false },
  { id: "set-58", title: "सामाजिक सुरक्षा कोष स. क.अ.", year: "२०८१-०२-०२", isBonus: false },
  { id: "set-59", title: "संघीय लोक सेवा क.अ.", year: "२०८१-०२-०४", isBonus: false },
  { id: "set-60", title: "संघीय लोक सेवा कम्प्युटर टेक्निसियन", year: "२०८१-०२-०७", isBonus: false },
  { id: "set-61", title: "कर्णाली प्रदेश स. क.अ.", year: "२०८१-०२-१२", isBonus: false },
  { id: "set-62", title: "संघीय लोक सेवा स. क.अ.", year: "२०८१-०३-०८", isBonus: false },
  { id: "set-63", title: "लुम्बिनी प्रदेश स. क.अ.", year: "२०८१-०३-१५", isBonus: false },
  { id: "set-64", title: "KUKL कम्प्युटर अपरेटर", year: "२०८१-०७-३०", isBonus: false },
  { id: "set-65", title: "प्रज्ञा प्रतिष्ठान कम्प्युटर अपरेटर", year: "२०८१-०८-१८", isBonus: false },
  { id: "set-66", title: "पारवहन तथा गोदाम कम्पनी कम्प्युटर अपरेटर", year: "२०८१-०९-२२", isBonus: false },
  { id: "set-67", title: "आयल निगम कम्प्युटर अपरेटर", year: "२०८१-०९-२९", isBonus: false },
  { id: "set-68", title: "कृषि सामग्री कम्पनी लिमिटेड कम्प्युटर अपरेटर", year: "२०८१-१०-२०", isBonus: false },
  
  // २०८२
  { id: "set-69", title: "कम्प्युटर अपरेटर सामाजिक सुरक्षा कोष", year: "२०८२-०१-०३", isBonus: false },
  { id: "set-70", title: "कम्प्युटर अपरेटर लोक सेवा", year: "२०८२-०२-०३", isBonus: false },
  { id: "set-71", title: "कम्प्युटर अपरेटर नेपाल सेना प्रा.अ.म.", year: "२०८२-०२-०४", isBonus: false },
  { id: "set-72", title: "कम्प्युटर टेक्निसियन", year: "२०८२-०२-०७", isBonus: false },
  { id: "set-73", title: "कम्प्युटर अपरेटर संसद सेवा", year: "२०८२-०२-०९", isBonus: false },
  { id: "set-74", title: "कम्प्युटर अपरेटर राष्ट्रिय परीक्षा बोर्ड", year: "२०८२-०७-३०", isBonus: false },
  { id: "set-75", title: "कम्प्युटर अपरेटर आयल निगम", year: "२०८२-०९-१९", isBonus: false },
  
  // Bonus Sets (Reference)
  { id: "set-76", title: "⭐ Important Abbreviations (महत्त्वपूर्ण संक्षिप्त रुप)", year: "Reference", isBonus: true },
  { id: "set-77", title: "⭐ Important Keyboard Shortcuts (महत्त्वपूर्ण किबोर्ड सर्टकट)", year: "Reference", isBonus: true },
  { id: "set-78", title: "⭐ Some Excel Functions (एक्सेल प्रकार्यहरू)", year: "Reference", isBonus: true },
];

// Generate sample questions for old is gold (reuse from different subjects)
export function getOldIsGoldQuestions(setId: string): Question[] {
  const allQs = Object.values(practiceQuestions).flat();
  const setNumber = parseInt(setId.split("-")[1]);
  const questionCount = setNumber >= 75 ? 100 : 50;
  return shuffleArray(allQs).slice(0, questionCount).map((q, i) => ({ ...q, id: `${setId}-${i}` }));
}

// ===== WEEKLY TEST =====
export const weeklyTests: { id: string; title: string; titleNp: string; questions: number; time: number; marks: number; negativeMarking: number }[] = [
  { id: "weekly-1", title: "Weekly Test Set 1", titleNp: "साप्ताहिक परीक्षा सेट-१ (GK + Computer)", questions: 50, time: 20, marks: 100, negativeMarking: 0.4 },
  { id: "weekly-2", title: "Weekly Test Set 2", titleNp: "साप्ताहिक परीक्षा सेट-२ (Computer Only)", questions: 30, time: 15, marks: 60, negativeMarking: 0.4 },
  { id: "weekly-3", title: "Weekly Test Set 3", titleNp: "साप्ताहिक परीक्षा सेट-३ (GK + Public Mgmt)", questions: 20, time: 10, marks: 40, negativeMarking: 0.4 },
];

export function getWeeklyTestQuestions(testId: string): Question[] {
  const test = weeklyTests.find(t => t.id === testId);
  const count = test?.questions || 50;
  const allQs = Object.values(practiceQuestions).flat();
  return shuffleArray(allQs).slice(0, count).map((q, i) => ({ ...q, id: `${testId}-${i}` }));
}

// ===== MOTIVATIONAL QUOTES =====
export const motivationalQuotes = [
  "सफलता मेहनती मानिसको साथी हो। 🚀",
  "सानो प्रयासले पनि ठूलो परिवर्तन ल्याउन सक्छ। 🌱",
  "आफ्नो लक्ष्यमा केन्द्रित रहनुहोस्। 🎯",
  "नियमित पढाइ नै सफलताको चाबी हो। 🔑",
  "आत्मविश्वास सफलता तर्फको पहिलो पाइला हो। 💪",
  "कहिल्यै हार नमान्नुहोस्, प्रयास जारी राख्नुहोस्। 🔥",
  "आज पढेको कुरा भोलिको उपलब्धि बन्छ। 📘",
  "धैर्य र मेहनतले असम्भवलाई सम्भव बनाउँछ। ✨",
  "सफलता भाग्यले होइन, मेहनतले मिल्छ। 🏆",
  "समयको सही उपयोग गर्नु नै बुद्धिमानी हो। ⏰",
  "तपाईंको संघर्षले नै तपाईंलाई बलियो बनाउँछ। 🌟",
  "ठूलो सपना देख्नुहोस् र त्यसका लागि निरन्तर लाग्नुहोस्। 🚀",
  "हरेक दिन केही नयाँ सिक्नुहोस्। 📚",
  "सकारात्मक सोचले सफलता नजिक ल्याउँछ। 😊",
  "मेहनत कहिल्यै व्यर्थ जाँदैन। 💯",
  "सपना पूरा गर्न आरामभन्दा मेहनत रोज्नुहोस्। 🔥",
  "लोकसेवा तयारीमा निरन्तरता नै सफलता हो। 📝",
  "विश्वास राख्नुहोस् — तपाईं सफल हुनुहुनेछ। 🌈",
  "सफलता एक दिनमा होइन, दैनिक मेहनतबाट आउँछ। 📈",
  "जति अभ्यास, त्यति उत्कृष्ट परिणाम। 🏅",
  "आजको अनुशासन भोलिको उपलब्धि हो। ⭐",
  "डर होइन, आत्मविश्वासले अगाडि बढाउँछ। 💡",
  "सफल व्यक्तिहरू कहिल्यै प्रयास गर्न छोड्दैनन्। 🚴",
  "सुरु गर्नु नै सफलताको आधा बाटो हो। 🛤️",
  "तपाईंको मेहनतले एक दिन सबैलाई गर्व गराउनेछ। ❤️",
];
