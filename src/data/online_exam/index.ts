// src/data/online_exam/index.ts

import { Question } from "../questions";

// Import all exam files
import { exam1Questions } from "./exam1";
import { exam2Questions } from "./exam2";
import { exam3Questions } from "./exam3";
import { exam4Questions } from "./exam4";
import { exam5Questions } from "./exam5";
import { exam6Questions } from "./exam6";
import { exam7Questions } from "./exam7";
import { exam8Questions } from "./exam8";
import { exam9Questions } from "./exam9";
import { exam10Questions } from "./exam10";
import { exam11Questions } from "./exam11";
import { exam12Questions } from "./exam12";
import { exam13Questions } from "./exam13";
import { exam14Questions } from "./exam14";
import { exam15Questions } from "./exam15";

// Import quiz files
import { quiz1Questions } from "./quiz1";
import { quiz2Questions } from "./quiz2";
import { quiz3Questions } from "./quiz3";
import { quiz4Questions } from "./quiz4";

// Export all exam question banks
export {
  exam1Questions,
  exam2Questions,
  exam3Questions,
  exam4Questions,
  exam5Questions,
  exam6Questions,
  exam7Questions,
  exam8Questions,
  exam9Questions,
  exam10Questions,
  exam11Questions,
  exam12Questions,
  exam13Questions,
  exam14Questions,
  exam15Questions,
  quiz1Questions,
  quiz2Questions,
  quiz3Questions,
  quiz4Questions,
};

// Map for easy lookup by exam ID
export const onlineExamQuestions: Record<string, Question[]> = {
  "exam-1": exam1Questions,
  "exam-2": exam2Questions,
  "exam-3": exam3Questions,
  "exam-4": exam4Questions,
  "exam-5": exam5Questions,
  "exam-6": exam6Questions,
  "exam-7": exam7Questions,
  "exam-8": exam8Questions,
  "exam-9": exam9Questions,
  "exam-10": exam10Questions,
  "exam-11": exam11Questions,
  "exam-12": exam12Questions,
  "exam-13": exam13Questions,
  "exam-14": exam14Questions,
  "exam-15": exam15Questions,
  "quiz-1": quiz1Questions,
  "quiz-2": quiz2Questions,
  "quiz-3": quiz3Questions,
  "quiz-4": quiz4Questions,
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

// Helper function to get random questions from a pool
export function getRandomQuestions(questions: Question[], count: number): Question[] {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
}

// Helper function to get exam questions by ID
export function getExamQuestions(examId: string): Question[] {
  return onlineExamQuestions[examId] || [];
}
