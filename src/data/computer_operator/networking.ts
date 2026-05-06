import { Question } from "../questions";

export const networkingQuestions: Question[] = [
  { id: "nw1", question: "LAN stands for?", options: ["Local Area Network", "Large Area Network", "Long Area Network", "Linked Area Network"], correct: 0, explanation: "LAN = Local Area Network." },
  { id: "nw2", question: "Which device connects different networks?", options: ["Hub", "Switch", "Router", "Repeater"], correct: 2, explanation: "Router connects different networks." },
  { id: "nw3", question: "IP address has how many octets (IPv4)?", options: ["2", "3", "4", "6"], correct: 2, explanation: "IPv4 has 4 octets." },
  { id: "nw4", question: "Which topology has a central hub?", options: ["Bus", "Star", "Ring", "Mesh"], correct: 1, explanation: "Star topology has a central hub." },
  { id: "nw5", question: "HTTP port number is?", options: ["21", "25", "80", "443"], correct: 2, explanation: "HTTP uses port 80." },
  { id: "nw6", question: "Which protocol is used for email?", options: ["HTTP", "FTP", "SMTP", "TCP"], correct: 2, explanation: "SMTP is used for email." },
  { id: "nw7", question: "OSI model has how many layers?", options: ["5", "6", "7", "8"], correct: 2, explanation: "OSI model has 7 layers." },
  { id: "nw8", question: "DNS converts?", options: ["Domain name to IP", "IP to MAC", "MAC to IP", "Domain to MAC"], correct: 0, explanation: "DNS converts domain name to IP." },
  { id: "nw9", question: "Which cable uses light signals?", options: ["Coaxial", "Twisted Pair", "Fiber Optic", "Ethernet"], correct: 2, explanation: "Fiber optic uses light signals." },
  { id: "nw10", question: "Wi-Fi standard is?", options: ["IEEE 802.3", "IEEE 802.11", "IEEE 802.5", "IEEE 802.15"], correct: 1, explanation: "Wi-Fi uses IEEE 802.11." },
  { id: "nw11", question: "What is the full form of TCP?", options: ["Transmission Control Protocol", "Transfer Control Protocol", "Transmission Communication Protocol", "None"], correct: 0, explanation: "TCP = Transmission Control Protocol." },
  { id: "nw12", question: "What is a MAC address?", options: ["Physical address", "Logical address", "IP address", "Port address"], correct: 0, explanation: "MAC address is a physical address." },
  { id: "nw13", question: "Which layer is responsible for routing?", options: ["Network Layer", "Transport Layer", "Data Link Layer", "Physical Layer"], correct: 0, explanation: "Network layer handles routing." },
  { id: "nw14", question: "What does DHCP stand for?", options: ["Dynamic Host Configuration Protocol", "Domain Host Control Protocol", "Data Host Configuration Protocol", "None"], correct: 0, explanation: "DHCP assigns IP addresses dynamically." },
  { id: "nw15", question: "What is the range of Class A IP addresses?", options: ["1-126", "128-191", "192-223", "224-239"], correct: 0, explanation: "Class A IP range is 1-126." },
  { id: "nw16", question: "Which protocol is used for secure web browsing?", options: ["HTTPS", "HTTP", "FTP", "SMTP"], correct: 0, explanation: "HTTPS provides secure web browsing." },
  { id: "nw17", question: "What is a firewall?", options: ["Security system", "Network device", "Router", "Switch"], correct: 0, explanation: "Firewall is a security system." },
  { id: "nw18", question: "Which command is used to test network connectivity?", options: ["ping", "ipconfig", "netstat", "tracert"], correct: 0, explanation: "Ping tests network connectivity." },
  { id: "nw19", question: "What is the purpose of subnet mask?", options: ["Divide network", "Assign IP", "Route packets", "Encrypt data"], correct: 0, explanation: "Subnet mask divides the network." },
  { id: "nw20", question: "Which device sends data to all ports?", options: ["Hub", "Switch", "Router", "Bridge"], correct: 0, explanation: "Hub sends data to all ports." },
];
