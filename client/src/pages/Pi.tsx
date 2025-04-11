const Pi = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-primary">آشنایی با عدد π</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <div className="h-48 w-48 rounded-full bg-primary flex items-center justify-center text-white text-6xl font-bold select-none">
              π
            </div>
          </div>
          
          <div className="md:w-2/3 md:pr-6">
            <h3 className="text-xl font-bold mb-4">عدد پی (π) چیست؟</h3>
            <p className="mb-4">
              عدد پی (π) یکی از مهم‌ترین ثابت‌های ریاضی است که نسبت محیط دایره به قطر آن را نشان می‌دهد.
              این عدد تقریباً برابر با 3.14159 است، اما در واقع یک عدد گنگ و نامتناهی است.
            </p>
            
            <h4 className="font-bold mb-2">تاریخچه عدد π</h4>
            <p className="mb-4">
              بشر از هزاران سال پیش با مفهوم عدد پی آشنا بوده است. در تمدن‌های باستانی مصر، بابل و چین، 
              تلاش‌هایی برای محاسبه این عدد صورت گرفته است. ارشمیدس در قرن سوم قبل از میلاد روشی را برای 
              تقریب دقیق‌تر عدد پی با استفاده از چندضلعی‌های منتظم ارائه داد.
            </p>
            
            <h4 className="font-bold mb-2">اهمیت عدد π در ریاضیات</h4>
            <p>
              عدد π نه تنها در هندسه، بلکه در بسیاری از شاخه‌های ریاضیات از جمله آنالیز، احتمال و نظریه اعداد
              کاربرد دارد. این عدد در فرمول‌های مربوط به دایره و کره (مانند مساحت و حجم) ظاهر می‌شود، اما همچنین
              در معادلات پیچیده‌تر فیزیک، مهندسی و علوم دیگر نیز نقش مهمی دارد.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">دانستنی‌هایی جالب درباره عدد π</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">بی‌نهایت بودن ارقام</h4>
              <p>
                عدد پی دارای بی‌نهایت رقم اعشار است که هیچ الگوی تکراری ندارند. به همین دلیل، این عدد را نمی‌توان
                به صورت کسری از اعداد صحیح نمایش داد.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">رکورد محاسبه ارقام</h4>
              <p>
                در سال 2021، دانشمندان موفق شدند 50 تریلیون رقم عدد پی را محاسبه کنند. این محاسبات با استفاده از
                ابررایانه‌های پیشرفته و در طی چندین ماه انجام شد.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">روز جهانی π</h4>
              <p>
                روز 14 مارس (3/14 در فرمت تاریخ آمریکایی) به عنوان روز جهانی پی شناخته می‌شود. در این روز، 
                ریاضی‌دانان و علاقه‌مندان به ریاضی در سراسر جهان جشن می‌گیرند.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">حفظ کردن ارقام π</h4>
              <p>
                رکورد حفظ کردن ارقام عدد پی متعلق به سوهیل شارما از هند است که توانست 70,030 رقم عدد پی را 
                در سال 2015 به خاطر بسپارد و بازگو کند.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">فرمول‌های مرتبط با عدد π</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-right">نام فرمول</th>
                  <th className="py-2 px-4 border-b text-right">فرمول ریاضی</th>
                  <th className="py-2 px-4 border-b text-right">توضیحات</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">محیط دایره</td>
                  <td className="py-2 px-4 border-b">C = 2πr</td>
                  <td className="py-2 px-4 border-b">محیط دایره‌ای با شعاع r</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">مساحت دایره</td>
                  <td className="py-2 px-4 border-b">A = πr²</td>
                  <td className="py-2 px-4 border-b">مساحت دایره‌ای با شعاع r</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">حجم کره</td>
                  <td className="py-2 px-4 border-b">V = (4/3)πr³</td>
                  <td className="py-2 px-4 border-b">حجم کره‌ای با شعاع r</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">فرمول اویلر</td>
                  <td className="py-2 px-4 border-b">e^(iπ) + 1 = 0</td>
                  <td className="py-2 px-4 border-b">ارتباط 5 عدد مهم ریاضی</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pi;
