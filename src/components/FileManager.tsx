import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Folder, File, ArrowUp, Plus, Pencil, Trash } from 'lucide-react';

interface FileManagerProps {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

interface FileItem {
  name: string;
  type: 'file' | 'directory';
  size: number;
  lastModified: string;
}

export function FileManager({ currentPath, setCurrentPath }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([
    { name: 'Documents', type: 'directory', size: 0, lastModified: '2023-05-01' },
    { name: 'Images', type: 'directory', size: 0, lastModified: '2023-05-02' },
    { name: 'report.pdf', type: 'file', size: 1024, lastModified: '2023-05-03' },
    { name: 'data.csv', type: 'file', size: 2048, lastModified: '2023-05-04' },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  const handleNavigate = (item: FileItem) => {
    if (item.type === 'directory') {
      setCurrentPath(`${currentPath}${item.name}/`);
    }
  };

  const handleNavigateUp = () => {
    const newPath = currentPath.split('/').slice(0, -2).join('/') + '/';
    setCurrentPath(newPath);
  };

  const handleCreateItem = () => {
    if (newItemName) {
      const newItem: FileItem = {
        name: newItemName,
        type: isCreatingFile ? 'file' : 'directory',
        size: 0,
        lastModified: new Date().toISOString().split('T')[0],
      };
      setFiles([...files, newItem]);
      setNewItemName('');
    }
  };

  const handleDeleteItem = (item: FileItem) => {
    setFiles(files.filter((f) => f.name !== item.name));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Current Path: {currentPath}</h2>
        <div>
          <Button variant="outline" onClick={handleNavigateUp} className="mr-2">
            <ArrowUp className="mr-2 h-4 w-4" /> Up
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Item</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Input
                    id="name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="col-span-3"
                  />
                  <Button onClick={() => setIsCreatingFile(false)}>Folder</Button>
                  <Button onClick={() => setIsCreatingFile(true)}>File</Button>
                </div>
              </div>
              <Button onClick={handleCreateItem}>Create</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableCell className="font-medium">
                {file.type === 'directory' ? (
                  <Button variant="ghost" className="p-0" onClick={() => handleNavigate(file)}>
                    <Folder className="mr-2 h-4 w-4" />
                    {file.name}
                  </Button>
                ) : (
                  <span>
                    <File className="mr-2 h-4 w-4 inline" />
                    {file.name}
                  </span>
                )}
              </TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell>{file.size} bytes</TableCell>
              <TableCell>{file.lastModified}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="mr-2">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(file)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}