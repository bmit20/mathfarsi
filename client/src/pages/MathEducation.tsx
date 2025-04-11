import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { usePdfViewer } from "@/lib/fileHandlers";

type Grade = "7" | "8" | "9";

const MathEducation = () => {
  const [activeGrade, setActiveGrade] = useState<Grade | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  
  const fileInputRefs = {
    "7": useRef<HTMLInputElement>(null),
    "8": useRef<HTMLInputElement>(null),
    "9": useRef<HTMLInputElement>(null),
  };

  const { renderPdf } = usePdfViewer({
    onDocumentLoaded: (numPages) => {
      setTotalPages(numPages);
      setCurrentPage(1);
    },
    canvasContainerId: "pdf-canvas-container",
    currentPage,
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await apiRequest("POST", "/api/upload-pdf", formData);
      return await res.json();
    },
    onSuccess: (data) => {
      setPdfUrl(data.url);
      setPdfName(data.filename);
      renderPdf(data.url);
      setShowPdfViewer(true);
    },
  });

  const handleGradeClick = (grade: Grade) => {
    setActiveGrade(grade);
    setShowPdfViewer(false);
  };

  const handleFileSelect = (grade: Grade) => {
    if (fileInputRefs[grade].current) {
      fileInputRefs[grade].current?.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, grade: Grade) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("لطفا فقط فایل PDF انتخاب کنید.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("grade", grade);
    
    uploadMutation.mutate(formData);
  };

  const handleViewContent = (subject: string) => {
    // Determine which PDF to show based on subject ID
    let pdfUrl = '';
    let pdfName = '';
    
    if (subject.startsWith('7-')) {
      const chapter = subject.split('-')[1];
      pdfUrl = `/assets/pdfs/grade7-chapter${chapter}.pdf`;
      pdfName = `ریاضی هفتم - فصل ${chapter}`;
    } else if (subject.startsWith('8-')) {
      const chapter = subject.split('-')[1];
      pdfUrl = `/assets/pdfs/grade8-chapter${chapter}.pdf`;
      pdfName = `ریاضی هشتم - فصل ${chapter}`;
    } else if (subject.startsWith('9-')) {
      const chapter = subject.split('-')[1];
      pdfUrl = `/assets/pdfs/grade9-chapter${chapter}.pdf`;
      pdfName = `ریاضی نهم - فصل ${chapter}`;
    }
    
    if (pdfUrl) {
      setPdfUrl(pdfUrl);
      setPdfName(pdfName);
      setShowPdfViewer(true);
      renderPdf(pdfUrl);
    }
    
    console.log(`Viewing content for: ${subject}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const closePdfViewer = () => {
    setShowPdfViewer(false);
  };

  const renderGradeContent = (grade: Grade) => {
    const subjects = {
      "7": [
        { id: "7-1", title: "فصل اول: راهبردهای حل مسئله", desc: "توضیحات مختصر در مورد محتوای این فصل" },
        { id: "7-2", title: "فصل دوم: عددهای صحیح", desc: "توضیحات مختصر در مورد محتوای این فصل" },
        { id: "7-3", title: "فصل سوم: جبر و معادله", desc: "توضیحات مختصر در مورد محتوای این فصل" },
      ],
      "8": [
        { id: "8-1", title: "فصل اول: عددهای صحیح و گویا", desc: "توضیحات مختصر در مورد محتوای این فصل" },
        { id: "8-2", title: "فصل دوم: عبارت‌های جبری", desc: "توضیحات مختصر در مورد محتوای این فصل" },
        { id: "8-3", title: "فصل سوم: معادلات خطی", desc: "توضیحات مختصر در مورد محتوای این فصل" },
      ],
      "9": [
        { id: "9-1", title: "فصل اول: مجموعه‌ها", desc: "توضیحات مختصر در مورد محتوای این فصل" },
        { id: "9-2", title: "فصل دوم: عبارت‌های گویا", desc: "توضیحات مختصر در مورد محتوای این فصل" },
        { id: "9-3", title: "فصل سوم: استدلال و اثبات در هندسه", desc: "توضیحات مختصر در مورد محتوای این فصل" },
      ],
    };

    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">محتوای آموزشی پایه {{"7": "هفتم", "8": "هشتم", "9": "نهم"}[grade]}</h3>
        <div className="mb-4">
          {subjects[grade].map((subject) => (
            <div key={subject.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
              <div>
                <h4 className="font-bold">{subject.title}</h4>
                <p className="text-sm text-gray-600">{subject.desc}</p>
              </div>
              <Button
                className="bg-primary text-white hover:bg-primary-dark"
                onClick={() => handleViewContent(subject.id)}
              >
                مشاهده محتوا
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="font-bold mb-3">بارگذاری محتوای جدید:</h4>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="mb-2 text-sm text-gray-600">برای بارگذاری فایل PDF کلیک کنید یا فایل را به اینجا بکشید</p>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf" 
              ref={fileInputRefs[grade]} 
              onChange={(e) => handleFileChange(e, grade)}
            />
            <Button
              variant="outline"
              className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={() => handleFileSelect(grade)}
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? "در حال بارگذاری..." : "انتخاب فایل"}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-primary">آموزش ریاضی</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <p className="mb-4">لطفاً پایه تحصیلی مورد نظر خود را انتخاب کنید تا محتوای مرتبط نمایش داده شود:</p>
        
        {/* Grade Selection Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="ml-4">
              <button 
                className={`inline-block py-2 px-4 font-medium text-gray-500 hover:text-primary hover:border-primary border-b-2 ${activeGrade === "7" ? 'border-primary text-primary' : 'border-transparent'}`}
                onClick={() => handleGradeClick("7")}
              >
                پایه هفتم
              </button>
            </li>
            <li className="ml-4">
              <button 
                className={`inline-block py-2 px-4 font-medium text-gray-500 hover:text-primary hover:border-primary border-b-2 ${activeGrade === "8" ? 'border-primary text-primary' : 'border-transparent'}`}
                onClick={() => handleGradeClick("8")}
              >
                پایه هشتم
              </button>
            </li>
            <li className="ml-4">
              <button 
                className={`inline-block py-2 px-4 font-medium text-gray-500 hover:text-primary hover:border-primary border-b-2 ${activeGrade === "9" ? 'border-primary text-primary' : 'border-transparent'}`}
                onClick={() => handleGradeClick("9")}
              >
                پایه نهم
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Grade Content Sections */}
      {activeGrade && !showPdfViewer && renderGradeContent(activeGrade)}
      
      {/* PDF Viewer */}
      {showPdfViewer && (
        <div className="pdf-viewer bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">{pdfName ? `مشاهده: ${pdfName}` : "مشاهده PDF"}</h3>
            <button className="text-gray-500 hover:text-gray-700" onClick={closePdfViewer}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div id="pdf-canvas-container" className="border border-gray-200 rounded-lg min-h-[500px] flex items-center justify-center">
            {/* PDF.js will render the PDF here */}
            {!pdfUrl && <p className="text-gray-500">فایل PDF اینجا نمایش داده خواهد شد</p>}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
            >
              صفحه قبل
            </Button>
            <span className="py-2">صفحه <span className="font-bold">{currentPage}</span> از <span className="font-bold">{totalPages}</span></span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              صفحه بعد
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MathEducation;
