import { Question } from "../questions";

export const operatingSystemQuestions: Question[] = [
  { id: "os1", question: "Which is not an operating system?", options: ["Windows", "Linux", "Oracle", "macOS"], correct: 2, explanation: "Oracle is a database management system, not an OS." },
  { id: "os2", question: "Linux kernel was developed by?", options: ["Linus Torvalds", "Bill Gates", "Steve Jobs", "Dennis Ritchie"], correct: 0, explanation: "Linux kernel was developed by Linus Torvalds." },
  { id: "os3", question: "Which command lists files in Linux?", options: ["ls", "dir", "list", "show"], correct: 0, explanation: "'ls' command lists files in Linux." },
  { id: "os4", question: "In Windows, Ctrl+Alt+Del is used for?", options: ["Copy", "Task Manager/Security", "Paste", "Undo"], correct: 1, explanation: "Ctrl+Alt+Del opens Task Manager/Security options." },
  { id: "os5", question: "What is the function of an OS?", options: ["Memory Management", "Process Management", "File Management", "All of the above"], correct: 3, explanation: "OS handles all these functions." },
  { id: "os6", question: "Which is a multi-user operating system?", options: ["MS-DOS", "Windows 95", "Unix", "Windows 3.1"], correct: 2, explanation: "Unix is a multi-user operating system." },
  { id: "os7", question: "File extension .exe indicates?", options: ["Executable file", "Text file", "Image file", "Audio file"], correct: 0, explanation: ".exe indicates executable file." },
  { id: "os8", question: "Which Linux command changes directory?", options: ["cd", "md", "mv", "rm"], correct: 0, explanation: "'cd' command changes directory." },
  { id: "os9", question: "Virtual memory uses?", options: ["RAM only", "Hard disk as extended RAM", "Cache only", "ROM"], correct: 1, explanation: "Virtual memory uses hard disk as extended RAM." },
  { id: "os10", question: "GUI stands for?", options: ["Graphical User Interface", "General User Interface", "Graphical Unified Interface", "General Unified Input"], correct: 0, explanation: "GUI stands for Graphical User Interface." },
  { id: "os11", question: "Which Windows version introduced Start Menu?", options: ["Windows 95", "Windows 98", "Windows XP", "Windows 7"], correct: 0, explanation: "Windows 95 introduced the Start Menu." },
  { id: "os12", question: "What is the core of Linux OS?", options: ["Kernel", "Shell", "Terminal", "GUI"], correct: 0, explanation: "Kernel is the core of Linux OS." },
  { id: "os13", question: "Which is a real-time operating system?", options: ["VxWorks", "Windows", "Linux", "macOS"], correct: 0, explanation: "VxWorks is a real-time operating system." },
  { id: "os14", question: "What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Ready Access Memory"], correct: 0, explanation: "RAM stands for Random Access Memory." },
  { id: "os15", question: "Which key is used to open Task Manager?", options: ["Ctrl+Shift+Esc", "Ctrl+Alt+Del", "Both A and B", "None"], correct: 2, explanation: "Both Ctrl+Shift+Esc and Ctrl+Alt+Del open Task Manager." },
  { id: "os16", question: "What is paging in OS?", options: ["Memory management scheme", "File management", "Process scheduling", "Security feature"], correct: 0, explanation: "Paging is a memory management scheme." },
  { id: "os17", question: "Which scheduling algorithm is non-preemptive?", options: ["FCFS", "Round Robin", "Priority", "SJF"], correct: 0, explanation: "FCFS (First Come First Serve) is non-preemptive." },
  { id: "os18", question: "What is a deadlock in OS?", options: ["Process waiting indefinitely", "Process completed", "Process terminated", "Process sleeping"], correct: 0, explanation: "Deadlock is when processes wait indefinitely for resources." },
  { id: "os19", question: "Which command is used to check disk in Windows?", options: ["chkdsk", "diskpart", "format", "fdisk"], correct: 0, explanation: "chkdsk command checks disk in Windows." },
  { id: "os20", question: "What is the default file system for Windows 10?", options: ["NTFS", "FAT32", "exFAT", "ext4"], correct: 0, explanation: "NTFS is the default file system for Windows 10." },
];
