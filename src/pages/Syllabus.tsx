const syllabusData = [
  {
    title: "Part I: सामान्य ज्ञान र सार्वजनिक व्यवस्थापन",
    topics: [
      "1.1 भौगोलिक अवस्था र भू-संरचना",
      "1.2 प्रमुख राष्ट्रिय मुद्दाहरू (Current Affairs)",
      "1.3 नेपालको संविधान, २०७२ को सामान्य जानकारी",
      "1.4 नेपालको शासन प्रणाली (Federal, Provincial, Local)",
      "1.5 लोक सेवा आयोगको भूमिका र कार्य",
      "2.1 व्यवस्थापनका सामान्य सिद्धान्तहरू",
      "2.2 कार्यालय व्यवस्थापन र सूचना प्रविधिको महत्त्व",
      "2.3 सार्वजनिक सेवा प्रवाह र सुशासन",
      "2.4 विकेन्द्रीकरण र स्थानीय शासन",
      "2.5 जवाफदेहिता र पारदर्शिता",
      "2.6 भ्रष्टाचार नियन्त्रण",
      "2.7 लैङ्गिक समानता र सामाजिक समावेशीकरण",
      "2.8 नैतिकता र आचारसंहिता",
      "2.9 सार्वजनिक खरीद / Public Procurement",
      "2.10 मानवीय मूल्य मान्यता, नागरिक कर्तव्य र अनुशासन",
    ],
  },
  {
    title: "Part II: सेवा सम्बन्धित कार्य-ज्ञान",
    sections: [
      {
        title: "1. Computer Fundamentals",
        topics: [
          "1.1 Introduction & History of Computers",
          "1.2 Generations of Computers",
          "1.3 Types of Computers",
          "1.4 Components: CPU, Memory, I/O, Storage",
          "1.5 Number System (Binary, Octal, Decimal, Hexadecimal)",
          "1.6 Computer Software: System & Application",
          "1.7 Programming Languages: Machine, Assembly, High-Level",
        ],
      },
      {
        title: "2. Operating System",
        topics: [
          "2.1 Introduction to OS",
          "2.2 Types of OS: Single-user, Multi-user, Real-time",
          "2.3 Functions of OS",
          "2.4 Windows OS: Desktop, File Management, Control Panel",
          "2.5 Linux Basics: Commands, File System",
        ],
      },
      {
        title: "3. Word Processor (MS Word)",
        topics: [
          "3.1 Introduction & Features",
          "3.2 Creating, Opening, Saving Documents",
          "3.3 Word Processing Environment (Menu, Toolbars, Status bar)",
          "3.4 Text Formatting, Find & Replace, Page Layout",
          "3.5 Bullets, Numbering, Lists",
          "3.6 Tables, Borders, Shading",
          "3.7 Indentation, Tabs, Columns",
          "3.8 Header, Footer, Page Numbers",
          "3.9 Mail Merge",
          "3.10 Printing, Print Preview",
        ],
      },
      {
        title: "4. Electronic Spreadsheet (MS Excel)",
        topics: [
          "4.1 Introduction to Spreadsheet",
          "4.2 Workbook, Worksheet, Cell, Cell Address",
          "4.3 Entering, Editing, Formatting Data",
          "4.4 Formulas & Functions (SUM, AVERAGE, IF, VLOOKUP, etc.)",
          "4.5 Charts & Graphs",
          "4.6 Sorting, Filtering, Data Validation",
          "4.7 Conditional Formatting",
          "4.8 Page Setup & Printing",
        ],
      },
      {
        title: "5. Database Management System (DBMS)",
        topics: [
          "5.1 Introduction to DBMS",
          "5.2 Database Models (Relational, Hierarchical, Network)",
          "5.3 SQL Basics (SELECT, INSERT, UPDATE, DELETE)",
          "5.4 Primary Key, Foreign Key, Normalization",
          "5.5 MS Access Basics",
        ],
      },
      {
        title: "6. Presentation System (MS PowerPoint)",
        topics: [
          "6.1 Introduction to Presentations",
          "6.2 Creating, Opening, Saving Slides",
          "6.3 Formatting Slides",
          "6.4 Slide Show, Transitions",
          "6.5 Animation",
          "6.6 Inserting Pictures, Tables, Charts, Organization Charts",
        ],
      },
      {
        title: "7. Web Designing & Social Media",
        topics: [
          "7.1 Introduction to Web Page & CMS (WordPress)",
          "7.2 HTML Basics (Tags, Attributes, Elements)",
          "7.3 HTML Document Structure",
          "7.4 Forms, Tables, Links, Images",
          "7.5 CSS Basics",
          "7.6 Social Media (Facebook, Twitter, YouTube, Email)",
        ],
      },
      {
        title: "8. Computer Network",
        topics: [
          "8.1 Introduction to Networking",
          "8.2 Types: LAN, WAN, MAN",
          "8.3 Network Topologies (Star, Bus, Ring, Mesh)",
          "8.4 Network Devices (Hub, Switch, Router, Modem)",
          "8.5 OSI & TCP/IP Model",
          "8.6 IP Addressing, DNS, DHCP",
          "8.7 Internet, Intranet, Extranet",
          "8.8 Protocols (HTTP, FTP, SMTP, TCP, UDP)",
        ],
      },
      {
        title: "9. Cyber Security",
        topics: [
          "9.1 Introduction to Information Security",
          "9.2 Types of Threats (Virus, Worm, Trojan, Phishing, DoS)",
          "9.3 Firewall, Antivirus, Encryption",
          "9.4 Digital Signature, SSL/TLS",
          "9.5 Password Policy, Authentication",
          "9.6 Backup & Recovery",
        ],
      },
      {
        title: "10. Hardware Maintenance & Troubleshooting",
        topics: [
          "10.1 Computer Hardware Components",
          "10.2 Assembling & Disassembling PC",
          "10.3 Preventive Maintenance",
          "10.4 Troubleshooting Peripherals (Keyboard, Mouse, Printer, Scanner)",
          "10.5 Troubleshooting Connectivity",
          "10.6 OS Installation & Troubleshooting",
          "10.7 Device Drivers, Application Installation, System Restore",
          "10.8 Data Backup: Concept & Methods",
        ],
      },
      {
        title: "11. Related Legislations & Institutions",
        topics: [
          "11.1 ICT Policy, 2072",
          "11.2 Electronic Transaction Act, 2063",
          "11.3 National IT Center (NITC)",
          "11.4 Nepal Telecommunications Authority (NTA)",
          "11.5 Department of IT (DoIT)",
          "11.6 E-Governance Master Plan",
          "11.7 Digital Nepal Framework",
          "11.8 Broadband Policy",
        ],
      },
    ],
  },
];

const Syllabus = () => (
  <div className="container mx-auto px-4 py-8 animate-fade-in">
    <h1 className="text-2xl font-heading font-bold mb-2">📋 Full PSC Syllabus</h1>
    <p className="text-muted-foreground mb-6">Computer Operator / Data Entry Supervisor — लोक सेवा आयोग</p>

    <div className="space-y-6">
      {syllabusData.map((part, pi) => (
        <div key={pi} className="bg-card rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-heading font-bold mb-4 text-primary">{part.title}</h2>
          {part.topics && (
            <ul className="space-y-1 text-sm">
              {part.topics.map((t, i) => (
                <li key={i} className="flex items-start gap-2 py-1">
                  <span className="text-primary">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
          {part.sections && (
            <div className="space-y-4">
              {part.sections.map((sec, si) => (
                <div key={si} className="border-l-2 border-primary/30 pl-4">
                  <h3 className="font-semibold text-sm mb-2">{sec.title}</h3>
                  <ul className="space-y-0.5 text-sm text-muted-foreground">
                    {sec.topics.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Syllabus;
