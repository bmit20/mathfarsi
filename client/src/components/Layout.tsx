import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAppContext } from "@/context/AppContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { showSidebar, setShowSidebar } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        
        {/* Overlay for mobile menu */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden" 
            onClick={() => setShowSidebar(false)}
          />
        )}
        
        <main className="flex-grow md:mr-64 p-4">
          <div className="container mx-auto bg-white rounded-lg shadow-md p-6">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
