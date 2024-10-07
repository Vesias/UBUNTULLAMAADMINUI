import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TerminalProps {
  currentPath: string;
}

export function Terminal({ currentPath }: TerminalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the command to your server and get the response
    // For this example, we'll just echo the command
    setOutput([...output, `${currentPath}$ ${input}`, `Command executed: ${input}`]);
    setInput('');
  };

  return (
    <div className="border rounded-lg p-4 bg-black text-green-400 font-mono">
      <ScrollArea className="h-[400px]" ref={scrollAreaRef}>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </ScrollArea>
      <form onSubmit={handleInputSubmit} className="mt-4">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="bg-transparent border-none text-green-400 focus:ring-0"
          placeholder="Enter command..."
        />
      </form>
    </div>
  );
}