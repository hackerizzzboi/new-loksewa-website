// src/data/computer_operator/index.ts

import { Question } from "../questions";

// Import all question banks
import { generalAwarenessQuestions } from "./generalAwareness";
import { publicManagementQuestions } from "./publicManagement";
import { computerFundamentalsQuestions } from "./computerFundamentals";
import { operatingSystemQuestions } from "./operatingSystem";
import { wordProcessorQuestions } from "./wordProcessor";
import { spreadsheetQuestions } from "./spreadsheet";
import { dbmsQuestions } from "./dbms";
import { presentationQuestions } from "./presentation";
import { webDesignQuestions } from "./webDesign";
import { networkingQuestions } from "./networking";
import { cyberSecurityQuestions } from "./cyberSecurity";
import { hardwareQuestions } from "./hardware";
import { legislationQuestions } from "./legislation";

// Export all question banks
export {
  generalAwarenessQuestions,
  publicManagementQuestions,
  computerFundamentalsQuestions,
  operatingSystemQuestions,
  wordProcessorQuestions,
  spreadsheetQuestions,
  dbmsQuestions,
  presentationQuestions,
  webDesignQuestions,
  networkingQuestions,
  cyberSecurityQuestions,
  hardwareQuestions,
  legislationQuestions,
};

// Map for easy lookup
export const computerOperatorQuestions: Record<string, Question[]> = {
  "general-awareness": generalAwarenessQuestions,
  "public-management": publicManagementQuestions,
  "computer-fundamentals": computerFundamentalsQuestions,
  "operating-system": operatingSystemQuestions,
  "word-processor": wordProcessorQuestions,
  "spreadsheet": spreadsheetQuestions,
  "dbms": dbmsQuestions,
  "presentation": presentationQuestions,
  "web-design": webDesignQuestions,
  "networking": networkingQuestions,
  "cyber-security": cyberSecurityQuestions,
  "hardware": hardwareQuestions,
  "legislation": legislationQuestions,
};

// Helper function to shuffle array
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
