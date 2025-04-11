import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// PDF files schema
export const pdfFiles = pgTable("pdf_files", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  grade: text("grade").notNull(),
  url: text("url").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
});

export const insertPdfFileSchema = createInsertSchema(pdfFiles).omit({
  id: true,
});

export type InsertPdfFile = z.infer<typeof insertPdfFileSchema>;
export type PdfFile = typeof pdfFiles.$inferSelect;

// Quiz schema
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  questions: text("questions").notNull(), // JSON stringified questions
  createdAt: text("created_at").notNull(),
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
});

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;
