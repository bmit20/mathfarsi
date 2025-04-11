// Quiz related types
export interface QuizOption {
  id: number;
  text: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
  correctOptionIndex: number;
}

export interface QuizAnswerResult {
  questionId: number;
  selectedOption: number | null;
  correctOption: number;
  isCorrect: boolean;
}

export interface QuizResults {
  score: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  answers: QuizAnswerResult[];
}

// PDF related types
export interface PdfFile {
  id: string;
  filename: string;
  grade: string;
  url: string;
  uploadedAt: string;
}
