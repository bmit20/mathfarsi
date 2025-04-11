import { useAppContext } from "@/context/AppContext";

const Header = () => {
  const { setShowSidebar } = useAppContext();

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">آموزش ریاضی</h1>
        <button 
          className="md:hidden p-2" 
          onClick={toggleSidebar}
          aria-label="منوی اصلی"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
