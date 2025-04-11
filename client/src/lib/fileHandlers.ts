import { useState, useEffect } from 'react';

// PDF.js library type declarations
declare global {
  interface Window {
    pdfjsLib: {
      getDocument: (source: string | URL | ArrayBuffer) => {
        promise: Promise<{
          numPages: number;
          getPage: (pageNum: number) => Promise<{
            render: (options: any) => { promise: Promise<void> };
            getViewport: (options: { scale: number }) => { width: number; height: number };
          }>;
        }>;
      };
    };
  }
}

// Hook for handling PDF viewing
export const usePdfViewer = ({
  onDocumentLoaded,
  canvasContainerId,
  currentPage
}: {
  onDocumentLoaded: (numPages: number) => void;
  canvasContainerId: string;
  currentPage: number;
}) => {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  
  useEffect(() => {
    // Load PDF.js script dynamically if not already loaded
    if (!window.pdfjsLib) {
      const pdfjsScript = document.createElement('script');
      pdfjsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.min.js';
      pdfjsScript.async = true;
      pdfjsScript.onload = () => {
        window.pdfjsLib.getDocument = window.pdfjsLib.getDocument;
      };
      document.body.appendChild(pdfjsScript);
    }
  }, []);

  useEffect(() => {
    if (pdfDoc && currentPage) {
      renderPage(currentPage);
    }
  }, [currentPage, pdfDoc]);

  const renderPdf = async (pdfUrl: string) => {
    try {
      if (!window.pdfjsLib) {
        throw new Error('PDF.js library is not loaded');
      }

      const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      
      setPdfDoc(pdf);
      onDocumentLoaded(pdf.numPages);
      renderPage(1);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setPdfError('خطا در بارگذاری فایل PDF. لطفاً دوباره تلاش کنید.');
    }
  };

  const renderPage = async (pageNum: number) => {
    if (!pdfDoc) return;

    try {
      const container = document.getElementById(canvasContainerId);
      if (!container) return;

      // Clear previous content
      container.innerHTML = '';
      
      // Create canvas for PDF rendering
      const canvas = document.createElement('canvas');
      canvas.className = 'pdf-canvas';
      container.appendChild(canvas);
      
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      
      // Set canvas dimensions to match the PDF page
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
      
      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error rendering PDF page:', error);
      setPdfError('خطا در نمایش صفحه PDF. لطفاً دوباره تلاش کنید.');
    }
  };

  return {
    renderPdf,
    pdfError
  };
};
