import { Link } from "wouter";

const Home = () => {
  return (
    <section className="py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">به برنامه آموزش ریاضی خوش آمدید</h1>
        <p className="text-lg mb-8">با این برنامه می‌توانید مفاهیم ریاضی را به صورت تعاملی یاد بگیرید و دانش خود را آزمایش کنید.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Feature Cards */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-primary text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">آموزش ریاضی</h3>
            <p>دسترسی به منابع آموزشی پایه‌های هفتم، هشتم و نهم</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-primary text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">سؤالات آزمون</h3>
            <p>تمرین با آزمون‌های تستی و دریافت بازخورد آنی</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-primary text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">آشنایی با ریاضیات</h3>
            <p>اطلاعات جذاب درباره عدد π، ریاضی‌دانان و ارتباط ریاضی با قرآن</p>
          </div>
        </div>
        
        <div className="mt-12">
          <Link href="/math-education">
            <a className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors inline-block">
              شروع یادگیری
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
