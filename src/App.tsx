import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ModeToggle } from '@/components/ModeToggle';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { FileManager } from '@/components/FileManager';
import { Terminal } from '@/components/Terminal';
import { GPUManagement } from '@/components/GPUManagement';
import { Settings } from '@/components/Settings';
import { Overview } from '@/components/Overview';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [activeSection, setActiveSection] = useState('overview');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'terminal':
        return <Terminal currentPath={currentPath} />;
      case 'file-manager':
        return <FileManager currentPath={currentPath} setCurrentPath={setCurrentPath} />;
      case 'gpu-management':
        return <GPUManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen bg-background">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;