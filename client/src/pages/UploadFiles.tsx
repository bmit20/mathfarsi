import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const UploadFiles = () => {
  const { toast } = useToast();
  const [grade, setGrade] = useState<string>("7");
  const [chapter, setChapter] = useState<string>("1");
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>("pdf");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let endpoint = '/api/direct-upload-pdf';
      if (fileType === 'quiz') {
        endpoint = '/api/parse-quiz';
        formData.set('quizFile', formData.get('pdf') as File);
        formData.delete('pdf');
      }
      
      const res = await apiRequest("POST", endpoint, formData);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "آپلود موفق",
        description: data.message || "فایل با موفقیت آپلود شد.",
      });
      
      // Reset form
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: (error: any) => {
      toast({
        title: "خطا در آپلود",
        description: error.message || "خطایی در آپلود فایل رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    }
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Validate file type
    if (fileType === 'pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      toast({
        title: "خطا در انتخاب فایل",
        description: "لطفاً یک فایل PDF انتخاب کنید.",
        variant: "destructive",
      });
      return;
    }
    
    if (fileType === 'quiz' && !selectedFile.name.toLowerCase().match(/\.(docx|xlsx)$/)) {
      toast({
        title: "خطا در انتخاب فایل",
        description: "لطفاً یک فایل Word (.docx) یا Excel (.xlsx) انتخاب کنید.",
        variant: "destructive",
      });
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleUpload = () => {
    if (!file) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا یک فایل انتخاب کنید.",
        variant: "destructive",
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('grade', grade);
    formData.append('chapter', chapter);
    
    uploadMutation.mutate(formData);
  };
  
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };
  
  const getAcceptString = () => {
    return fileType === 'pdf' ? '.pdf' : '.docx,.xlsx';
  };
  
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-primary">آپلود فایل‌ها</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">آپلود فایل‌های PDF و آزمون</h3>
        <p className="text-gray-600 mb-6">در این بخش می‌توانید فایل‌های محتوای آموزشی (PDF) و فایل‌های آزمون (Word یا Excel) را آپلود کنید.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-3">تنظیمات</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">نوع فایل:</label>
                <Select defaultValue={fileType} onValueChange={(value) => setFileType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب نوع فایل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">محتوای آموزشی (PDF)</SelectItem>
                    <SelectItem value="quiz">سؤالات آزمون (Word یا Excel)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {fileType === 'pdf' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">پایه تحصیلی:</label>
                    <Select defaultValue={grade} onValueChange={(value) => setGrade(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب پایه تحصیلی" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">پایه هفتم</SelectItem>
                        <SelectItem value="8">پایه هشتم</SelectItem>
                        <SelectItem value="9">پایه نهم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">فصل:</label>
                    <Select defaultValue={chapter} onValueChange={(value) => setChapter(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب فصل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">فصل اول</SelectItem>
                        <SelectItem value="2">فصل دوم</SelectItem>
                        <SelectItem value="3">فصل سوم</SelectItem>
                        <SelectItem value="4">فصل چهارم</SelectItem>
                        <SelectItem value="5">فصل پنجم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">آپلود فایل</h4>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              
              {fileType === 'pdf' ? (
                <p className="mb-2 text-sm text-gray-600">برای بارگذاری فایل PDF کلیک کنید</p>
              ) : (
                <p className="mb-2 text-sm text-gray-600">برای بارگذاری فایل Word یا Excel کلیک کنید</p>
              )}
              
              <input 
                type="file" 
                className="hidden" 
                accept={getAcceptString()}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              <Button
                variant="outline"
                className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={handleSelectFile}
              >
                انتخاب فایل
              </Button>
            </div>
            
            {file && (
              <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-bold ml-1">فایل انتخاب شده:</span>
                  <span className="ml-2">{file.name}</span>
                </div>
              </div>
            )}
            
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
              onClick={handleUpload}
              disabled={!file || uploadMutation.isPending}
            >
              {uploadMutation.isPending ? "در حال آپلود..." : "آپلود فایل"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h3 className="text-amber-800 font-bold mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          راهنمای آپلود فایل
        </h3>
        
        <div className="text-amber-700 text-sm">
          <p className="mb-2">• برای آپلود محتوای آموزشی، گزینه "محتوای آموزشی (PDF)" را انتخاب کنید و یک فایل PDF آپلود کنید.</p>
          <p className="mb-2">• برای آپلود سؤالات آزمون، گزینه "سؤالات آزمون (Word یا Excel)" را انتخاب کنید و یک فایل Word (.docx) یا Excel (.xlsx) آپلود کنید.</p>
          <p className="mb-2">• حداکثر حجم فایل: 10 مگابایت</p>
        </div>
      </div>
    </section>
  );
};

export default UploadFiles;