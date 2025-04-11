import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import * as XLSX from "xlsx";
import mammoth from "mammoth";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
// Ensure upload directory exists
(async () => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error("Error creating upload directory:", error);
  }
})();

const storage2 = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage2,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('فرمت فایل پشتیبانی نمی‌شود. لطفاً فایل PDF، Word یا Excel آپلود کنید.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create upload directory if it doesn't exist
  try {
    await fs.access(uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  // Serve uploads folder
  app.use('/uploads', (req, res, next) => {
    // Set correct content types for different file types
    const ext = path.extname(req.path).toLowerCase();
    if (ext === '.pdf') {
      res.setHeader('Content-Type', 'application/pdf');
    }
    next();
  }, express.static(uploadDir));

  // Upload PDF file
  app.post('/api/upload-pdf', upload.single('pdf'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'فایلی آپلود نشده است.' });
      }

      const grade = req.body.grade || 'unknown';
      const url = `/uploads/${req.file.filename}`;
      
      // Save file info to storage
      const pdfFile = await storage.createPdfFile({
        filename: req.file.originalname,
        grade,
        url,
        uploadedAt: new Date().toISOString()
      });

      res.json({
        message: 'فایل با موفقیت آپلود شد.',
        ...pdfFile
      });
    } catch (error) {
      console.error('Error uploading PDF:', error);
      res.status(500).json({ message: 'خطا در آپلود فایل.' });
    }
  });

  // Get PDF files by grade
  app.get('/api/pdf-files/:grade', async (req, res) => {
    try {
      const grade = req.params.grade;
      
      // Default PDF files for each grade
      const defaultFiles = {
        "7": [
          {
            id: 7001,
            filename: "ریاضی هفتم - فصل اول.pdf",
            grade: "7",
            url: "/assets/pdfs/grade7-chapter1.pdf",
            uploadedAt: new Date().toISOString()
          },
          {
            id: 7002,
            filename: "ریاضی هفتم - فصل دوم.pdf",
            grade: "7",
            url: "/assets/pdfs/grade7-chapter2.pdf",
            uploadedAt: new Date().toISOString()
          },
          {
            id: 7003,
            filename: "ریاضی هفتم - فصل سوم.pdf",
            grade: "7",
            url: "/assets/pdfs/grade7-chapter3.pdf",
            uploadedAt: new Date().toISOString()
          }
        ],
        "8": [
          {
            id: 8001,
            filename: "ریاضی هشتم - فصل اول.pdf",
            grade: "8",
            url: "/assets/pdfs/grade8-chapter1.pdf",
            uploadedAt: new Date().toISOString()
          },
          {
            id: 8002,
            filename: "ریاضی هشتم - فصل دوم.pdf",
            grade: "8",
            url: "/assets/pdfs/grade8-chapter2.pdf",
            uploadedAt: new Date().toISOString()
          },
          {
            id: 8003,
            filename: "ریاضی هشتم - فصل سوم.pdf",
            grade: "8",
            url: "/assets/pdfs/grade8-chapter3.pdf",
            uploadedAt: new Date().toISOString()
          }
        ],
        "9": [
          {
            id: 9001,
            filename: "ریاضی نهم - فصل اول.pdf",
            grade: "9",
            url: "/assets/pdfs/grade9-chapter1.pdf",
            uploadedAt: new Date().toISOString()
          },
          {
            id: 9002,
            filename: "ریاضی نهم - فصل دوم.pdf",
            grade: "9",
            url: "/assets/pdfs/grade9-chapter2.pdf",
            uploadedAt: new Date().toISOString()
          },
          {
            id: 9003,
            filename: "ریاضی نهم - فصل سوم.pdf",
            grade: "9",
            url: "/assets/pdfs/grade9-chapter3.pdf",
            uploadedAt: new Date().toISOString()
          }
        ]
      };
      
      // Get pre-defined files for this grade
      const gradeFiles = defaultFiles[grade as "7" | "8" | "9"] || [];
      
      // Also try to get any uploaded files
      const storedFiles = await storage.getPdfFilesByGrade(grade);
      
      // Combine default and stored files
      res.json([...gradeFiles, ...storedFiles]);
    } catch (error) {
      console.error('Error getting PDF files:', error);
      res.status(500).json({ message: 'خطا در دریافت فایل‌ها.' });
    }
  });

  // Get default quiz questions
  app.get('/api/default-quiz', (req, res) => {
    // Default quiz questions
    const defaultQuestions = [
      {
        id: 1,
        text: "اگر ٣ - س = ٥، مقدار س کدام است؟",
        options: [
          { id: 0, text: "٨" },
          { id: 1, text: "-٨" },
          { id: 2, text: "-٢" },
          { id: 3, text: "٢" }
        ],
        correctOptionIndex: 3
      },
      {
        id: 2,
        text: "حاصل عبارت ٢^٣ × ٣^٢ کدام است؟",
        options: [
          { id: 0, text: "٧٢" },
          { id: 1, text: "٣٦" },
          { id: 2, text: "١٨" },
          { id: 3, text: "١٠٨" }
        ],
        correctOptionIndex: 0
      },
      {
        id: 3,
        text: "اگر محیط مربعی ٢٠ سانتی‌متر باشد، مساحت آن چند سانتی‌متر مربع است؟",
        options: [
          { id: 0, text: "٢٥" },
          { id: 1, text: "١٠٠" },
          { id: 2, text: "٤٠٠" },
          { id: 3, text: "٢٠" }
        ],
        correctOptionIndex: 0
      },
      {
        id: 4,
        text: "کدام گزینه مضرب ٧ است؟",
        options: [
          { id: 0, text: "٢١" },
          { id: 1, text: "١٦" },
          { id: 2, text: "٢٥" },
          { id: 3, text: "٣٢" }
        ],
        correctOptionIndex: 0
      },
      {
        id: 5,
        text: "اگر ٥ = ٢x - ٣، مقدار x کدام است؟",
        options: [
          { id: 0, text: "١" },
          { id: 1, text: "٤" },
          { id: 2, text: "٨" },
          { id: 3, text: "-١" }
        ],
        correctOptionIndex: 1
      }
    ];
    
    res.json({
      message: 'آزمون با موفقیت بارگذاری شد.',
      quizId: 'default',
      questions: defaultQuestions
    });
  });

  // Parse quiz file (DOCX or XLSX)
  app.post('/api/parse-quiz', upload.single('quizFile'), async (req, res) => {
    try {
      if (!req.file) {
        // Return default quiz questions
        return res.redirect('/api/default-quiz');
      }

      const filePath = req.file.path;
      const fileExt = path.extname(filePath).toLowerCase();
      let questions = [];

      if (fileExt === '.docx') {
        // Parse DOCX file
        const result = await mammoth.extractRawText({ path: filePath });
        const text = result.value;
        questions = parseDocxQuestions(text);
      } else if (fileExt === '.xlsx') {
        // Parse XLSX file
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);
        questions = parseExcelQuestions(data);
      } else {
        return res.status(400).json({ message: 'فرمت فایل پشتیبانی نمی‌شود.' });
      }

      if (!questions.length) {
        return res.status(400).json({ message: 'هیچ سؤالی در فایل یافت نشد.' });
      }

      // Save quiz to storage
      const quiz = await storage.createQuiz({
        title: req.file.originalname,
        questions: JSON.stringify(questions),
        createdAt: new Date().toISOString()
      });

      res.json({
        message: 'فایل آزمون با موفقیت پردازش شد.',
        quizId: quiz.id,
        questions
      });
    } catch (error) {
      console.error('Error processing quiz file:', error);
      res.status(500).json({ message: 'خطا در پردازش فایل آزمون.' });
    }
  });

  // Submit quiz answers
  app.post('/api/submit-quiz', async (req, res) => {
    try {
      const { questions, answers } = req.body;
      
      if (!questions || !answers || !Array.isArray(questions) || !Array.isArray(answers)) {
        return res.status(400).json({ message: 'داده‌های نامعتبر.' });
      }

      const results = evaluateQuiz(questions, answers);
      res.json(results);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ message: 'خطا در ثبت پاسخ‌های آزمون.' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to parse DOCX questions
function parseDocxQuestions(text: string) {
  const questions = [];
  const questionRegex = /(\d+)[.:]?\s+(.+?)(?=\n[الف-ی][).]\s+|\n\d+[.:]|$)/gs;
  const optionRegex = /([الف-ی])[).]\s+(.+?)(?=\n[الف-ی][).]\s+|\n\d+[.:]|\npasokh:|\n#{3,}|\nپاسخ:|\n\*{3,}|$)/gs;
  const answerRegex = /(?:pasokh:|پاسخ:)\s*([الف-ی])/gi;
  
  let questionMatch;
  let questionIndex = 0;
  
  while ((questionMatch = questionRegex.exec(text)) !== null) {
    questionIndex++;
    const questionText = questionMatch[2].trim();
    const questionStart = questionMatch.index;
    const questionEnd = questionRegex.lastIndex;
    
    // Extract options for this question
    const optionsText = text.slice(questionEnd, text.indexOf('\n', questionEnd + 100) || undefined);
    const options = [];
    let optionMatch;
    let optionIndex = 0;
    
    // Reset optionRegex to start from the beginning of the options text
    optionRegex.lastIndex = 0;
    
    while ((optionMatch = optionRegex.exec(optionsText)) !== null) {
      options.push({
        id: optionIndex,
        text: optionMatch[2].trim()
      });
      optionIndex++;
    }
    
    // Find the correct answer
    answerRegex.lastIndex = 0;
    const answerText = text.slice(questionEnd);
    const answerMatch = answerRegex.exec(answerText);
    
    let correctOptionIndex = 0; // Default to the first option
    if (answerMatch) {
      const correctOption = answerMatch[1];
      const optionMap = { 'الف': 0, 'ب': 1, 'ج': 2, 'د': 3 };
      correctOptionIndex = optionMap[correctOption] || 0;
    }
    
    // Add the question if it has options
    if (options.length > 0) {
      questions.push({
        id: questionIndex,
        text: questionText,
        options,
        correctOptionIndex
      });
    }
  }
  
  return questions;
}

// Helper function to parse Excel questions
function parseExcelQuestions(data: any[]) {
  const questions = [];
  
  data.forEach((row, index) => {
    // Assuming Excel has columns: Question, Option A, Option B, Option C, Option D, Correct Answer
    const questionText = row.Question || row.question || row['سوال'] || '';
    if (!questionText) return;
    
    const options = [];
    // Look for option columns with different possible names
    const optionKeys = [
      ['OptionA', 'optiona', 'option_a', 'option a', 'گزینه الف', 'گزینه ۱'],
      ['OptionB', 'optionb', 'option_b', 'option b', 'گزینه ب', 'گزینه ۲'],
      ['OptionC', 'optionc', 'option_c', 'option c', 'گزینه ج', 'گزینه ۳'],
      ['OptionD', 'optiond', 'option_d', 'option d', 'گزینه د', 'گزینه ۴']
    ];
    
    optionKeys.forEach((keys, optIndex) => {
      let optionText = '';
      for (const key of keys) {
        if (row[key] !== undefined) {
          optionText = row[key];
          break;
        }
      }
      
      if (optionText) {
        options.push({
          id: optIndex,
          text: optionText.toString().trim()
        });
      }
    });
    
    // Find correct answer
    let correctOptionIndex = 0;
    const answerKeys = ['CorrectAnswer', 'correctanswer', 'correct_answer', 'correct answer', 'پاسخ صحیح', 'پاسخ درست'];
    let correctAnswer = '';
    
    for (const key of answerKeys) {
      if (row[key] !== undefined) {
        correctAnswer = row[key].toString().trim();
        break;
      }
    }
    
    if (correctAnswer) {
      // Handle different formats of correct answers
      if (/^[0-9]$/.test(correctAnswer)) {
        correctOptionIndex = parseInt(correctAnswer) - 1;
      } else if (/^[الف-ی]$/.test(correctAnswer)) {
        const optionMap = { 'الف': 0, 'ب': 1, 'ج': 2, 'د': 3 };
        correctOptionIndex = optionMap[correctAnswer] || 0;
      } else if (/^[a-dA-D]$/.test(correctAnswer)) {
        correctOptionIndex = correctAnswer.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
      }
    }
    
    // Add the question if it has options
    if (options.length > 0) {
      questions.push({
        id: index + 1,
        text: questionText,
        options,
        correctOptionIndex: Math.min(correctOptionIndex, options.length - 1) // Ensure within bounds
      });
    }
  });
  
  return questions;
}

// Helper function to evaluate quiz answers
function evaluateQuiz(questions: any[], answers: (number | null)[]) {
  const results = {
    score: 0,
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 0,
    answers: [] as any[]
  };
  
  questions.forEach((question, index) => {
    const userAnswer = answers[index];
    const correctOption = question.correctOptionIndex;
    const isCorrect = userAnswer === correctOption;
    const isAnswered = userAnswer !== null;
    
    results.answers.push({
      questionId: question.id,
      selectedOption: userAnswer,
      correctOption,
      isCorrect: isCorrect
    });
    
    if (isCorrect) {
      results.correctCount++;
    } else if (isAnswered) {
      results.incorrectCount++;
    } else {
      results.unansweredCount++;
    }
  });
  
  // Calculate score as percentage
  results.score = Math.round((results.correctCount / questions.length) * 100);
  
  return results;
}
