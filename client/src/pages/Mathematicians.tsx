const Mathematicians = () => {
  const mathematicians = [
    {
      id: 1,
      name: "محمد بن موسی خوارزمی",
      birthYear: "حدود 780 میلادی",
      description: "خوارزمی ریاضی‌دان، ستاره‌شناس و جغرافی‌دان ایرانی بود که به دلیل کارهایش در زمینه جبر به عنوان \"پدر جبر\" شناخته می‌شود. واژه الگوریتم از نام او گرفته شده است.",
      imagePlaceholder: "خوارزمی"
    },
    {
      id: 2,
      name: "ابن سینا",
      birthYear: "980 میلادی",
      description: "ابن سینا دانشمند، فیلسوف و پزشک ایرانی بود که در زمینه ریاضیات نیز کارهای مهمی انجام داد. او در هندسه و مثلثات سهم بزرگی داشت و در کتاب \"الشفاء\" به مباحث ریاضی پرداخته است.",
      imagePlaceholder: "ابن سینا"
    },
    {
      id: 3,
      name: "غیاث‌الدین جمشید کاشانی",
      birthYear: "حدود 1380 میلادی",
      description: "کاشانی ریاضی‌دان و ستاره‌شناس ایرانی بود که در مورد اعداد اعشاری کار کرد و عدد پی را تا 16 رقم اعشار محاسبه نمود. او همچنین روش‌های محاسباتی پیشرفته‌ای برای مثلثات ارائه داد.",
      imagePlaceholder: "کاشانی"
    },
    {
      id: 4,
      name: "لئوناردو فیبوناچی",
      birthYear: "حدود 1170 میلادی",
      description: "فیبوناچی ریاضی‌دان ایتالیایی بود که با معرفی دنباله فیبوناچی و اعداد هندی-عربی به اروپا شناخته می‌شود. کتاب او به نام \"لیبر آباچی\" (کتاب محاسبه) تأثیر بزرگی بر ریاضیات غرب داشت.",
      imagePlaceholder: "فیبوناچی"
    },
    {
      id: 5,
      name: "آیزاک نیوتن",
      birthYear: "1642 میلادی",
      description: "نیوتن ریاضی‌دان، فیزیک‌دان و ستاره‌شناس انگلیسی بود که حساب دیفرانسیل و انتگرال را همزمان با لایبنیتز توسعه داد. او همچنین قوانین حرکت و جاذبه را فرمول‌بندی کرد.",
      imagePlaceholder: "نیوتن"
    },
    {
      id: 6,
      name: "مریم میرزاخانی",
      birthYear: "1977 میلادی",
      description: "میرزاخانی ریاضی‌دان ایرانی بود که اولین زن و اولین ایرانی برنده مدال فیلدز (معتبرترین جایزه ریاضیات) شد. تحقیقات او در زمینه هندسه، سیستم‌های دینامیکی و نظریه تایکمولر بود.",
      imagePlaceholder: "میرزاخانی"
    }
  ];

  const iranianContributions = [
    "معرفی و توسعه جبر توسط خوارزمی",
    "معادلات درجه سوم و استفاده از هندسه برای حل آن‌ها توسط عمر خیام",
    "توسعه مثلثات کروی توسط ابوریحان بیرونی",
    "محاسبه دقیق عدد پی تا 16 رقم اعشار توسط کاشانی",
    "جدول سینوس با دقت بالا توسط ابوالوفا بوزجانی",
    "روش‌های عددی پیشرفته برای محاسبات ریاضی توسط کاشانی"
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-primary">معرفی ریاضی‌دانان</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">ریاضی‌دانان برجسته جهان</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {mathematicians.map((mathematician) => (
              <div key={mathematician.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{mathematician.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">سال تولد: {mathematician.birthYear}</p>
                  <p className="mb-3">{mathematician.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">سهم ایران در پیشرفت علم ریاضی</h3>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-4">
              تمدن ایران باستان و دوران اسلامی سهم بزرگی در پیشرفت علم ریاضی داشته است. 
              دانشمندان ایرانی مانند خوارزمی، خیام، ابوریحان بیرونی، و کاشانی دستاوردهای بزرگی
              در شاخه‌های مختلف ریاضیات از جمله جبر، مثلثات، هندسه و نظریه اعداد داشته‌اند.
            </p>
            
            <h4 className="font-bold mb-2">دستاوردهای مهم ریاضی‌دانان ایرانی:</h4>
            <ul className="list-disc list-inside space-y-2 mr-4">
              {iranianContributions.map((contribution, index) => (
                <li key={index}>{contribution}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mathematicians;
