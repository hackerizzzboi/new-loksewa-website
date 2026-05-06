import { Question } from "../questions";

export const cyberSecurityQuestions: Question[] = [
  { id: "cs1", question: "A firewall is used for?", options: ["Network security", "Data storage", "Printing", "Email"], correct: 0, explanation: "Firewall provides network security." },
  { id: "cs2", question: "Phishing is a type of?", options: ["Social engineering attack", "Virus", "Malware", "Spyware"], correct: 0, explanation: "Phishing is a social engineering attack." },
  { id: "cs3", question: "Which is NOT a type of malware?", options: ["Virus", "Trojan", "Firewall", "Worm"], correct: 2, explanation: "Firewall is not malware, it's a security tool." },
  { id: "cs4", question: "SSL stands for?", options: ["Secure Socket Layer", "System Security Layer", "Secure System Link", "Standard Socket Layer"], correct: 0, explanation: "SSL = Secure Socket Layer." },
  { id: "cs5", question: "Strong password should contain?", options: ["Only numbers", "Only letters", "Mix of letters, numbers, symbols", "Only symbols"], correct: 2, explanation: "Strong passwords use mix of characters." },
  { id: "cs6", question: "DDoS stands for?", options: ["Distributed Denial of Service", "Direct Denial of Service", "Data Denial of Service", "Digital Denial of Service"], correct: 0, explanation: "DDoS = Distributed Denial of Service." },
  { id: "cs7", question: "Encryption converts data into?", options: ["Plain text", "Cipher text", "Binary", "Hexadecimal"], correct: 1, explanation: "Encryption converts to cipher text." },
  { id: "cs8", question: "Which is an antivirus software?", options: ["Kaspersky", "Photoshop", "Excel", "Chrome"], correct: 0, explanation: "Kaspersky is an antivirus." },
  { id: "cs9", question: "Two-factor authentication uses?", options: ["Two verification methods", "One verification method", "No verification", "Three methods"], correct: 0, explanation: "2FA uses two verification methods." },
  { id: "cs10", question: "Digital signature ensures?", options: ["Authenticity", "Speed", "Storage", "Printing"], correct: 0, explanation: "Digital signature ensures authenticity." },
  { id: "cs11", question: "What is ransomware?", options: ["Malware that encrypts files", "Virus that deletes files", "Trojan that steals data", "Worm that spreads"], correct: 0, explanation: "Ransomware encrypts files for ransom." },
  { id: "cs12", question: "What does VPN stand for?", options: ["Virtual Private Network", "Virtual Public Network", "Very Private Network", "None"], correct: 0, explanation: "VPN = Virtual Private Network." },
  { id: "cs13", question: "What is a brute force attack?", options: ["Trying all password combinations", "Phishing attack", "DDoS attack", "MITM attack"], correct: 0, explanation: "Brute force tries all password combinations." },
  { id: "cs14", question: "What is the purpose of CAPTCHA?", options: ["Prevent bots", "Improve security", "Verify human", "All of the above"], correct: 3, explanation: "CAPTCHA prevents bots and verifies humans." },
  { id: "cs15", question: "What is a rootkit?", options: ["Malware that hides in system", "Virus", "Worm", "Trojan"], correct: 0, explanation: "Rootkit hides in the system." },
  { id: "cs16", question: "Which port is used for HTTPS?", options: ["443", "80", "21", "22"], correct: 0, explanation: "HTTPS uses port 443." },
  { id: "cs17", question: "What is a zero-day vulnerability?", options: ["Unknown vulnerability", "Known vulnerability", "Fixed vulnerability", "Old vulnerability"], correct: 0, explanation: "Zero-day is an unknown vulnerability." },
  { id: "cs18", question: "What is the CIA triad?", options: ["Confidentiality, Integrity, Availability", "Central Intelligence Agency", "Computer Internet Access", "None"], correct: 0, explanation: "CIA triad = Confidentiality, Integrity, Availability." },
  { id: "cs19", question: "What is social engineering?", options: ["Manipulating people", "Hacking computers", "Writing codes", "Installing software"], correct: 0, explanation: "Social engineering manipulates people." },
  { id: "cs20", question: "What does IDS stand for?", options: ["Intrusion Detection System", "Internet Detection System", "Internal Detection System", "None"], correct: 0, explanation: "IDS = Intrusion Detection System." },
];
