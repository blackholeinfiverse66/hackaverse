import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import FloatingChatbot from './FloatingChatbot';

const AppShell = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      {/* Sidebar */}
      <Sidebar 
        onChatbotOpen={() => setIsChatbotOpen(true)} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Top Bar */}
      <TopBar isCollapsed={isSidebarCollapsed} />

      {/* Main Content Area */}
      <main className={`pt-16 min-h-screen transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        {children}
      </main>

      {/* Chatbot (controlled by Sidebar button) */}
      {isChatbotOpen && <FloatingChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default AppShell;
