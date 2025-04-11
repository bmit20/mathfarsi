const Creators = () => {
  const collaborators = [
    { name: "فاطمه محمدی", role: "طراح آموزشی" },
    { name: "علی رضایی", role: "توسعه‌دهنده" },
    { name: "زهرا کریمی", role: "تولید محتوا" }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-primary">تهیه‌کنندگان</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-8">
          <div className="w-32 h-32 rounded-full bg-primary mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mt-4">نام تهیه‌کننده</h3>
          <p className="text-gray-600">دبیر ریاضی - مدرسه نمونه</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">درباره این پروژه</h3>
            <p className="mb-4">
              این اپلیکیشن آموزشی با هدف ارائه محتوای آموزشی ریاضی به دانش‌آموزان دوره متوسطه اول طراحی شده است.
              این پروژه در راستای تسهیل آموزش و یادگیری ریاضی و ایجاد انگیزه در دانش‌آموزان برای مطالعه این علم
              پایه‌گذاری شده است.
            </p>
            <p>
              محتوای آموزشی این برنامه منطبق با سرفصل‌های آموزشی وزارت آموزش و پرورش بوده و به صورت مداوم به‌روزرسانی می‌شود.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>example@school.edu</span>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>021-12345678</span>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>تهران، خیابان آزادی، پلاک 123</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">سایر همکاران</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {collaborators.map((collaborator, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">{collaborator.name}</h4>
                    <p className="text-sm text-gray-600">{collaborator.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600">نسخه 1.0 - آخرین بروزرسانی: {new Date().toLocaleDateString('fa-IR')}</p>
          <div className="mt-4">
            <p>این نرم‌افزار به صورت رایگان و برای اهداف آموزشی ارائه شده است.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creators;
