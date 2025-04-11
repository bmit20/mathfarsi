import { users, type User, type InsertUser, type InsertPdfFile, type PdfFile, type InsertQuiz, type Quiz } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // PDF file methods
  getPdfFilesByGrade(grade: string): Promise<PdfFile[]>;
  createPdfFile(pdfFile: InsertPdfFile): Promise<PdfFile>;
  
  // Quiz methods
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuiz(id: number): Promise<Quiz | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pdfFiles: Map<number, PdfFile>;
  private quizzes: Map<number, Quiz>;
  
  private userId: number;
  private pdfFileId: number;
  private quizId: number;

  constructor() {
    this.users = new Map();
    this.pdfFiles = new Map();
    this.quizzes = new Map();
    
    this.userId = 1;
    this.pdfFileId = 1;
    this.quizId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // PDF file methods
  async getPdfFilesByGrade(grade: string): Promise<PdfFile[]> {
    return Array.from(this.pdfFiles.values()).filter(
      (file) => file.grade === grade
    );
  }
  
  async createPdfFile(insertPdfFile: InsertPdfFile): Promise<PdfFile> {
    const id = this.pdfFileId++;
    const pdfFile: PdfFile = { ...insertPdfFile, id };
    this.pdfFiles.set(id, pdfFile);
    return pdfFile;
  }
  
  // Quiz methods
  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.quizId++;
    
    // Convert questions to string if it's an object
    let questionsStr = insertQuiz.questions;
    if (typeof questionsStr !== 'string') {
      questionsStr = JSON.stringify(questionsStr);
    }
    
    const quiz: Quiz = { 
      ...insertQuiz, 
      id,
      questions: questionsStr
    };
    
    this.quizzes.set(id, quiz);
    return quiz;
  }
  
  async getQuiz(id: number): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }
}

export const storage = new MemStorage();
