import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { QuizQuestion, QuizOption, QuizResults } from "@/types";

enum QuizState {
  UPLOAD,
  QUIZ,
  RESULTS
}

const Quiz = () => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.UPLOAD);
  const [fileName, setFileName] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await apiRequest("POST", "/api/parse-quiz", formData);
      return await res.json();
    },
    onSuccess: (data) => {
      setQuestions(data.questions);
      // Initialize user answers array with nulls (no answers selected)
      setUserAnswers(new Array(data.questions.length).fill(null));
      setQuizState(QuizState.QUIZ);
    },
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (payload: { questions: QuizQuestion[], answers: (number | null)[] }) => {
      const res = await apiRequest("POST", "/api/submit-quiz", payload);
      return await res.json();
    },
    onSuccess: (data) => {
      setQuizResults(data);
      setQuizState(QuizState.RESULTS);
    },
  });

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'docx' && extension !== 'xlsx') {
      alert("لطفاً فقط فایل Word (.docx) یا Excel (.xlsx) انتخاب کنید.");
      return;
    }

    setFileName(file.name);
    
    const formData = new FormData();
    formData.append('quizFile', file);
    uploadMutation.mutate(formData);
  };

  const handleOptionClick = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    submitQuizMutation.mutate({ 
      questions, 
      answers: userAnswers 
    });
  };

  const handleTakeNewQuiz = () => {
    setQuizState(QuizState.UPLOAD);
    setFileName(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResults(null);
  };

  const handleDownloadResults = () => {
    if (!quizResults) return;
    
    // Format results as CSV
    let csv = "سوال,گزینه انتخاب شده,پاسخ صحیح,نتیجه\n";
    quizResults.answers.forEach((answer, index) => {
      const question = questions[index];
      const selected = answer.selectedOption !== null ? String.fromCharCode(97 + answer.selectedOption) : 'بدون پاسخ';
      const correct = String.fromCharCode(97 + answer.correctOption);
      const result = answer.isCorrect ? 'صحیح' : 'غلط';
      
      csv += `"${question.text}","${selected}","${correct}","${result}"\n`;
    });
    
    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'نتایج_آزمون.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getOptionLabel = (index: number): string => {
    const labels = ['الف', 'ب', 'ج', 'د'];
    return labels[index] || `گزینه ${index + 1}`;
  };

  const getCurrentQuestion = (): QuizQuestion | null => {
    return questions.length > 0 ? questions[currentQuestionIndex] : null;
  };

  const renderUploadSection = () => (
    <div id="quiz-upload" className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">بارگذاری سؤالات آزمون</h3>
      <p className="text-gray-600 mb-6">لطفاً فایل Word (.docx) یا Excel (.xlsx) حاوی سؤالات آزمون را بارگذاری کنید.</p>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <p className="mb-2 text-sm text-gray-600">برای بارگذاری فایل کلیک کنید یا فایل را به اینجا بکشید</p>
        <p className="mb-4 text-xs text-gray-500">پشتیبانی از فرمت‌های Word (.docx) و Excel (.xlsx)</p>
        <input 
          type="file" 
          className="hidden" 
          accept=".docx,.xlsx" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700"
          onClick={handleFileClick}
          disabled={uploadMutation.isPending}
        >
          {uploadMutation.isPending ? "در حال بارگذاری..." : "انتخاب فایل"}
        </Button>
      </div>
      
      {fileName && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{fileName}</span>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-left">
        <Button
          className="bg-secondary hover:bg-secondary-dark text-white"
          onClick={() => setQuizState(QuizState.QUIZ)}
          disabled={!questions.length || uploadMutation.isPending}
        >
          شروع آزمون
        </Button>
      </div>
    </div>
  );

  const renderQuizSection = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;

    return (
      <div id="quiz-container">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">آزمون ریاضی</h3>
            <div>
              <span className="bg-primary text-white text-sm py-1 px-3 rounded-full">
                سؤال <span id="current-question">{currentQuestionIndex + 1}</span> از <span id="total-questions">{questions.length}</span>
              </span>
            </div>
          </div>
          
          <div id="question-container" className="mb-6">
            <p className="font-bold mb-4 text-lg">سؤال: <span id="question-text">{currentQuestion.text}</span></p>
            
            <div className="space-y-3 mt-4">
              {currentQuestion.options.map((option, idx) => (
                <div 
                  key={idx}
                  className={`quiz-option p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 ${
                    userAnswers[currentQuestionIndex] === idx ? 'selected bg-blue-100' : ''
                  }`}
                  onClick={() => handleOptionClick(idx)}
                >
                  <div className="flex items-start">
                    <span className="ml-2 font-bold">{getOptionLabel(idx)})</span>
                    <span>{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              سؤال قبلی
            </Button>
            <Button
              className="bg-primary hover:bg-primary-dark text-white"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              سؤال بعدی
            </Button>
          </div>
        </div>
        
        <div className="text-left mt-4 mb-8">
          <Button
            className="bg-accent hover:bg-accent-dark text-white"
            onClick={handleFinishQuiz}
            disabled={submitQuizMutation.isPending}
          >
            {submitQuizMutation.isPending ? "در حال پردازش..." : "پایان آزمون و مشاهده نتایج"}
          </Button>
        </div>
      </div>
    );
  };

  const renderResultsSection = () => {
    if (!quizResults) return null;

    return (
      <div id="quiz-results">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-6 text-primary">نتایج آزمون</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
              <div className="text-6xl font-bold text-primary mb-2">{quizResults.score}%</div>
              <div className="text-gray-600">نمره کل</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <div className="text-3xl font-bold text-green-600">{quizResults.correctCount}</div>
                <div className="text-gray-600">پاسخ صحیح</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <div className="text-3xl font-bold text-red-500">{quizResults.incorrectCount}</div>
                <div className="text-gray-600">پاسخ غلط</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <div className="text-3xl font-bold text-gray-700">{questions.length}</div>
                <div className="text-gray-600">تعداد کل سؤالات</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <div className="text-3xl font-bold text-orange-500">{quizResults.unansweredCount}</div>
                <div className="text-gray-600">بدون پاسخ</div>
              </div>
            </div>
          </div>
          
          <h4 className="font-bold text-lg mb-4">مرور سؤالات:</h4>
          
          <div className="space-y-6 mb-8">
            {quizResults.answers.map((answer, index) => {
              const question = questions[index];
              const isAnswered = answer.selectedOption !== null;
              const resultClass = answer.isCorrect 
                ? "bg-green-100 text-green-800" 
                : isAnswered 
                  ? "bg-red-100 text-red-800" 
                  : "bg-orange-100 text-orange-800";
              const resultText = answer.isCorrect 
                ? "صحیح" 
                : isAnswered 
                  ? "غلط" 
                  : "بدون پاسخ";

              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold ml-2">سؤال {index + 1}:</span>
                      <span>{question.text}</span>
                    </div>
                    <div className={`text-sm py-1 px-3 rounded-full ${resultClass}`}>
                      {resultText}
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option, optIdx) => {
                      let bgClass = '';
                      if (optIdx === answer.correctOption) {
                        bgClass = 'bg-green-100';
                      } else if (isAnswered && optIdx === answer.selectedOption && !answer.isCorrect) {
                        bgClass = 'bg-red-100';
                      }
                      
                      return (
                        <div key={optIdx} className={`p-2 border border-gray-200 rounded-lg ${bgClass}`}>
                          <div className="flex items-start">
                            <span className="ml-2 font-bold">{getOptionLabel(optIdx)})</span>
                            <span>{option.text}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-600">
                    <span className="font-bold ml-1">پاسخ صحیح:</span>
                    <span>{getOptionLabel(answer.correctOption)} {question.options[answer.correctOption].text}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              className="bg-primary hover:bg-primary-dark text-white"
              onClick={handleTakeNewQuiz}
            >
              آزمون جدید
            </Button>
            <Button
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={handleDownloadResults}
            >
              دانلود نتایج
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-primary">سؤالات آزمون</h2>
      
      {quizState === QuizState.UPLOAD && renderUploadSection()}
      {quizState === QuizState.QUIZ && renderQuizSection()}
      {quizState === QuizState.RESULTS && renderResultsSection()}
    </section>
  );
};

export default Quiz;
