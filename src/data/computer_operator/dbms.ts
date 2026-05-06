import { Question } from "../questions";

export const dbmsQuestions: Question[] = [
  { id: "db1", question: "DBMS stands for?", options: ["Database Management System", "Data Basic Management System", "Database Maintenance System", "Data Backup Management System"], correct: 0, explanation: "DBMS stands for Database Management System." },
  { id: "db2", question: "SQL stands for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0, explanation: "SQL stands for Structured Query Language." },
  { id: "db3", question: "Which is NOT a type of database model?", options: ["Relational", "Hierarchical", "Sequential", "Network"], correct: 2, explanation: "Sequential is not a database model." },
  { id: "db4", question: "Primary key must be?", options: ["Unique", "Null", "Duplicate", "Blank"], correct: 0, explanation: "Primary key must be unique." },
  { id: "db5", question: "Which command retrieves data?", options: ["INSERT", "SELECT", "UPDATE", "DELETE"], correct: 1, explanation: "SELECT retrieves data." },
  { id: "db6", question: "Which is a RDBMS?", options: ["MS Access", "Notepad", "Paint", "Calculator"], correct: 0, explanation: "MS Access is a RDBMS." },
  { id: "db7", question: "Foreign key is used for?", options: ["Linking two tables", "Primary identification", "Indexing", "Sorting"], correct: 0, explanation: "Foreign key links two tables." },
  { id: "db8", question: "Normalization is used to?", options: ["Remove redundancy", "Add data", "Delete data", "Create tables"], correct: 0, explanation: "Normalization removes redundancy." },
  { id: "db9", question: "Which is a DML command?", options: ["CREATE", "ALTER", "INSERT", "DROP"], correct: 2, explanation: "INSERT is a DML command." },
  { id: "db10", question: "A row in a table is called?", options: ["Field", "Record/Tuple", "Column", "Key"], correct: 1, explanation: "A row is called a record or tuple." },
  { id: "db11", question: "What does DDL stand for?", options: ["Data Definition Language", "Data Description Language", "Data Display Language", "Data Detail Language"], correct: 0, explanation: "DDL stands for Data Definition Language." },
  { id: "db12", question: "Which command is used to remove a table?", options: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "TRUNCATE TABLE"], correct: 0, explanation: "DROP TABLE removes a table." },
  { id: "db13", question: "What is the purpose of JOIN?", options: ["Combine tables", "Delete data", "Update data", "Create tables"], correct: 0, explanation: "JOIN combines data from multiple tables." },
  { id: "db14", question: "Which operator is used for pattern matching?", options: ["LIKE", "IN", "BETWEEN", "IS"], correct: 0, explanation: "LIKE is used for pattern matching." },
  { id: "db15", question: "What does ACID stand for?", options: ["Atomicity, Consistency, Isolation, Durability", "Atomic, Consistent, Isolated, Durable", "All, Consistency, Isolation, Data", "None"], correct: 0, explanation: "ACID ensures database transaction reliability." },
  { id: "db16", question: "Which key is used to uniquely identify a record?", options: ["Primary Key", "Foreign Key", "Candidate Key", "Alternate Key"], correct: 0, explanation: "Primary Key uniquely identifies records." },
  { id: "db17", question: "What is a view in DBMS?", options: ["Virtual table", "Physical table", "Index", "Constraint"], correct: 0, explanation: "View is a virtual table." },
  { id: "db18", question: "Which clause is used to filter records?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], correct: 0, explanation: "WHERE clause filters records." },
  { id: "db19", question: "What is the full form of ERD?", options: ["Entity Relationship Diagram", "Entity Relation Diagram", "Entity Record Diagram", "None"], correct: 0, explanation: "ERD stands for Entity Relationship Diagram." },
  { id: "db20", question: "Which command adds a column to a table?", options: ["ALTER TABLE ADD", "UPDATE TABLE", "MODIFY TABLE", "CHANGE TABLE"], correct: 0, explanation: "ALTER TABLE ADD adds a column." },
];
