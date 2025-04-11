import { Link, useLocation } from "wouter";
import { useAppContext } from "@/context/AppContext";

const Sidebar = () => {
  const [location] = useLocation();
  const { showSidebar } = useAppContext();

  const menuItems = [
    { title: "صفحه اصلی", path: "/", section: "home" },
    { title: "آموزش ریاضی", path: "/math-education", section: "math-education" },
    { title: "سؤالات آزمون", path: "/quiz", section: "quiz" },
    { title: "آشنایی با عدد π", path: "/pi", section: "pi" },
    { title: "معرفی ریاضی‌دانان", path: "/mathematicians", section: "mathematicians" },
    { title: "ارتباط قرآن و ریاضی", path: "/quran-math", section: "quran-math" },
    { title: "آپلود فایل‌ها", path: "/upload-files", section: "upload-files" },
    { title: "تهیه‌کنندگان", path: "/creators", section: "creators" },
  ];

  return (
    <aside 
      className={`bg-white shadow-lg w-64 fixed h-full transition-transform duration-300 ease-in-out z-10 ${
        showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <nav className="py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.section} className="mb-1">
              <Link href={item.path}>
                <a 
                  className={`menu-item text-right w-full py-3 px-4 hover:bg-gray-100 border-r-4 block ${
                    location === item.path ? "border-primary" : "border-transparent"
                  }`}
                >
                  <span className="ml-2">{item.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
