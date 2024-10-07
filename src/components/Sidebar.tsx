import { Home, Terminal, Folder, Cpu, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const navItems = [
    { icon: Home, label: 'Overview', value: 'overview' },
    { icon: Terminal, label: 'Terminal', value: 'terminal' },
    { icon: Folder, label: 'File Manager', value: 'file-manager' },
    { icon: Cpu, label: 'GPU & LLaMA', value: 'gpu-management' },
    { icon: Settings, label: 'Settings', value: 'settings' },
  ];

  return (
    <aside className="w-64 bg-card text-card-foreground p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.value}
            className={cn(
              "flex items-center space-x-2 w-full p-2 rounded-lg transition-colors",
              activeSection === item.value
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
            onClick={() => setActiveSection(item.value)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}